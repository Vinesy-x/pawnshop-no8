import { create } from 'zustand'
import type { GameState, Cell } from '../types/game'
import { getItemDef, generatorMap } from '../data/items'

// 生成唯一ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

// 创建空棋盘
function createEmptyBoard(width: number, height: number): Cell[][] {
  const board: Cell[][] = []
  for (let y = 0; y < height; y++) {
    const row: Cell[] = []
    for (let x = 0; x < width; x++) {
      row.push({
        x,
        y,
        state: 'empty',
        item: null
      })
    }
    board.push(row)
  }
  return board
}

interface GameStore extends GameState {
  // 初始化
  initBoard: (width: number, height: number) => void
  
  // 放置物品
  placeItem: (x: number, y: number, defId: string, isGenerator?: boolean) => void
  
  // 点击生成器
  clickGenerator: (x: number, y: number) => void
  
  // 拖拽相关
  startDrag: (x: number, y: number) => void
  endDrag: (targetX: number, targetY: number) => void
  cancelDrag: () => void
  
  // 合成
  tryMerge: (x1: number, y1: number, x2: number, y2: number) => boolean
  
  // 移动物品
  moveItem: (fromX: number, fromY: number, toX: number, toY: number) => void
  
  // 提交订单
  submitOrder: (orderId: string, itemId: string) => void
  setOrders: (orders: any[]) => void
  
  // 资源
  addEnergy: (amount: number) => void
  useEnergy: (amount: number) => boolean
  addCoins: (amount: number) => void
  addStars: (amount: number) => void
  
  // 找空格子
  findEmptyCell: () => { x: number; y: number } | null
}

export const useGameStore = create<GameStore>((set, get) => ({
  // 初始状态
  currentStory: null,
  currentLevel: null,
  currentDialog: null,
  board: [],
  boardWidth: 6,
  boardHeight: 8,
  energy: 50,
  maxEnergy: 100,
  coins: 0,
  stars: 0,
  orders: [],
  draggingItem: null,
  inventory: [],
  collectibles: [],
  completedStories: [],
  renovationPoints: 0,

  // 初始化棋盘
  initBoard: (width: number, height: number) => {
    set({
      board: createEmptyBoard(width, height),
      boardWidth: width,
      boardHeight: height,
      draggingItem: null
    })
  },

  // 放置物品
  placeItem: (x: number, y: number, defId: string, isGenerator = false) => {
    const { board } = get()
    if (y < 0 || y >= board.length || x < 0 || x >= board[0].length) return
    
    const cell = board[y][x]
    if (cell.state !== 'empty' || cell.item !== null) return
    
    const newBoard = board.map(row => row.map(c => ({ ...c })))
    newBoard[y][x].item = {
      id: generateId(),
      defId,
      isGenerator
    }
    
    set({ board: newBoard })
  },

  // 点击生成器产出物品
  clickGenerator: (x: number, y: number) => {
    const { board, energy } = get()
    const cell = board[y]?.[x]
    if (!cell?.item?.isGenerator) return
    
    const genDef = generatorMap[cell.item.defId]
    if (!genDef) return
    
    // 检查体力
    if (genDef.energyCost > 0 && energy < genDef.energyCost) {
      console.log('体力不足')
      return
    }
    
    // 找空格子
    const emptyCell = get().findEmptyCell()
    if (!emptyCell) {
      console.log('没有空格子')
      return
    }
    
    // 消耗体力
    if (genDef.energyCost > 0) {
      set({ energy: energy - genDef.energyCost })
    }
    
    // 随机选择产出物品
    const produceId = genDef.produces[Math.floor(Math.random() * genDef.produces.length)]
    
    // 放置物品
    get().placeItem(emptyCell.x, emptyCell.y, produceId)
    
    console.log(`生成了 ${produceId} 在 (${emptyCell.x}, ${emptyCell.y})`)
  },

  // 找空格子
  findEmptyCell: () => {
    const { board } = get()
    const emptyCells: { x: number; y: number }[] = []
    
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const cell = board[y][x]
        if (cell.state === 'empty' && cell.item === null) {
          emptyCells.push({ x, y })
        }
      }
    }
    
    if (emptyCells.length === 0) return null
    return emptyCells[Math.floor(Math.random() * emptyCells.length)]
  },

  // 开始拖拽
  startDrag: (x: number, y: number) => {
    const { board } = get()
    const cell = board[y]?.[x]
    if (!cell?.item || cell.item.isGenerator) return
    
    set({ draggingItem: { x, y } })
  },

  // 结束拖拽
  endDrag: (targetX: number, targetY: number) => {
    const { draggingItem, board } = get()
    if (!draggingItem) return
    
    const { x: fromX, y: fromY } = draggingItem
    
    // 如果放在同一个位置，取消拖拽
    if (fromX === targetX && fromY === targetY) {
      set({ draggingItem: null })
      return
    }
    
    const targetCell = board[targetY]?.[targetX]
    if (!targetCell) {
      set({ draggingItem: null })
      return
    }
    
    // 如果目标是空格子，移动物品
    if (targetCell.state === 'empty' && targetCell.item === null) {
      get().moveItem(fromX, fromY, targetX, targetY)
    }
    // 如果目标有物品，尝试合成
    else if (targetCell.item && !targetCell.item.isGenerator) {
      get().tryMerge(fromX, fromY, targetX, targetY)
    }
    
    set({ draggingItem: null })
  },

  // 取消拖拽
  cancelDrag: () => {
    set({ draggingItem: null })
  },

  // 移动物品
  moveItem: (fromX: number, fromY: number, toX: number, toY: number) => {
    const { board } = get()
    const fromCell = board[fromY]?.[fromX]
    const toCell = board[toY]?.[toX]
    
    if (!fromCell?.item || toCell?.item || toCell?.state !== 'empty') return
    
    const newBoard = board.map(row => row.map(c => ({ ...c })))
    newBoard[toY][toX].item = fromCell.item
    newBoard[fromY][fromX].item = null
    
    set({ board: newBoard })
  },

  // 尝试合成
  tryMerge: (x1: number, y1: number, x2: number, y2: number) => {
    const { board } = get()
    const cell1 = board[y1]?.[x1]
    const cell2 = board[y2]?.[x2]
    
    if (!cell1?.item || !cell2?.item) return false
    if (cell1.item.isGenerator || cell2.item.isGenerator) return false
    
    // 检查是否同类型
    if (cell1.item.defId !== cell2.item.defId) {
      console.log('物品类型不同，无法合成')
      return false
    }
    
    // 获取物品定义
    const itemDef = getItemDef(cell1.item.defId)
    if (!itemDef) return false
    
    // 检查是否有合成结果
    if (!itemDef.mergeResult) {
      console.log('已是最高级，无法继续合成')
      return false
    }
    
    // 执行合成
    const newBoard = board.map(row => row.map(c => ({ ...c })))
    newBoard[y1][x1].item = null
    newBoard[y2][x2].item = {
      id: generateId(),
      defId: itemDef.mergeResult,
      isGenerator: false
    }
    
    const resultDef = getItemDef(itemDef.mergeResult)
    console.log(`合成成功: ${itemDef.name} + ${itemDef.name} = ${resultDef?.name}`)
    
    set({ board: newBoard })
    return true
  },

  // 提交订单
  submitOrder: (orderId: string, itemId: string) => {
    const { orders } = get()
    const orderIndex = orders.findIndex(o => o.id === orderId)
    if (orderIndex === -1) return
    
    const order = orders[orderIndex]
    if (order.targetItemId !== itemId) return
    if (order.completed >= order.count) return
    
    const newOrders = [...orders]
    newOrders[orderIndex] = {
      ...order,
      completed: order.completed + 1
    }
    
    // 检查是否完成
    if (newOrders[orderIndex].completed >= order.count) {
      console.log(`订单完成! 奖励:`, order.reward)
      // 发放奖励
      if (order.reward.coins) get().addCoins(order.reward.coins)
      if (order.reward.energy) get().addEnergy(order.reward.energy)
      if (order.reward.stars) get().addStars(order.reward.stars)
    }
    
    set({ orders: newOrders })
  },

  // 设置订单
  setOrders: (orders: any[]) => {
    set({ orders })
  },

  // 资源操作
  addEnergy: (amount: number) => {
    const { energy, maxEnergy } = get()
    set({ energy: Math.min(energy + amount, maxEnergy) })
  },

  useEnergy: (amount: number) => {
    const { energy } = get()
    if (energy < amount) return false
    set({ energy: energy - amount })
    return true
  },

  addCoins: (amount: number) => {
    const { coins } = get()
    set({ coins: coins + amount })
  },

  addStars: (amount: number) => {
    const { stars } = get()
    set({ stars: stars + amount })
  }
}))
