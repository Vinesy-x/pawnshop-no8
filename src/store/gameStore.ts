import { create } from 'zustand'
import { GameState, Piece, PieceType } from '../types'

interface GameStore extends GameState {
  // Actions
  initBoard: (width: number, height: number) => void
  selectPiece: (piece: Piece) => void
  deselectPiece: (piece: Piece) => void
  clearSelection: () => void
  mergePieces: () => void
  setCurrentStory: (storyId: string | null) => void
  setCurrentLevel: (levelId: string | null) => void
  setCurrentDialog: (dialogId: string | null) => void
  addToInventory: (itemId: string) => void
  addCollectible: (collectibleId: string) => void
  completeStory: (storyId: string) => void
  addRenovationPoints: (points: number) => void
}

const PIECE_TYPES: PieceType[] = [
  'candle', 'incense', 'paper', 'ink', 'herb', 'water',
  'wood', 'metal', 'cloth', 'thread', 'bone', 'blood'
]

// 生成随机棋子类型
function randomPieceType(): PieceType {
  return PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)]
}

// 生成唯一ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

// 创建棋盘
function createBoard(width: number, height: number): Piece[][] {
  const board: Piece[][] = []
  for (let y = 0; y < height; y++) {
    const row: Piece[] = []
    for (let x = 0; x < width; x++) {
      row.push({
        id: generateId(),
        type: randomPieceType(),
        x,
        y,
        selected: false
      })
    }
    board.push(row)
  }
  return board
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  currentStory: null,
  currentLevel: null,
  currentDialog: null,
  board: [],
  selectedPieces: [],
  inventory: [],
  collectibles: [],
  completedStories: [],
  renovationPoints: 0,

  // Actions
  initBoard: (width: number, height: number) => {
    set({ board: createBoard(width, height), selectedPieces: [] })
  },

  selectPiece: (piece: Piece) => {
    const { selectedPieces, board } = get()
    
    // 检查是否已选中
    if (selectedPieces.some(p => p.id === piece.id)) {
      return
    }

    // 检查是否可以选择（相邻或同类型）
    if (selectedPieces.length > 0) {
      const lastSelected = selectedPieces[selectedPieces.length - 1]
      const isAdjacent = Math.abs(piece.x - lastSelected.x) <= 1 && 
                         Math.abs(piece.y - lastSelected.y) <= 1
      if (!isAdjacent) {
        return
      }
    }

    // 更新棋盘状态
    const newBoard = board.map(row =>
      row.map(p => p.id === piece.id ? { ...p, selected: true } : p)
    )

    set({
      board: newBoard,
      selectedPieces: [...selectedPieces, { ...piece, selected: true }]
    })
  },

  deselectPiece: (piece: Piece) => {
    const { selectedPieces, board } = get()
    
    const newBoard = board.map(row =>
      row.map(p => p.id === piece.id ? { ...p, selected: false } : p)
    )

    set({
      board: newBoard,
      selectedPieces: selectedPieces.filter(p => p.id !== piece.id)
    })
  },

  clearSelection: () => {
    const { board } = get()
    const newBoard = board.map(row =>
      row.map(p => ({ ...p, selected: false }))
    )
    set({ board: newBoard, selectedPieces: [] })
  },

  mergePieces: () => {
    const { selectedPieces, board, inventory } = get()
    
    if (selectedPieces.length < 2) {
      return
    }

    // 移除已合成的棋子，生成新棋子填充
    const selectedIds = new Set(selectedPieces.map(p => p.id))
    const newBoard = board.map(row =>
      row.map(p => {
        if (selectedIds.has(p.id)) {
          return {
            ...p,
            id: generateId(),
            type: randomPieceType(),
            selected: false
          }
        }
        return { ...p, selected: false }
      })
    )

    // TODO: 检查配方，添加合成物品到inventory

    set({
      board: newBoard,
      selectedPieces: []
    })
  },

  setCurrentStory: (storyId) => set({ currentStory: storyId }),
  setCurrentLevel: (levelId) => set({ currentLevel: levelId }),
  setCurrentDialog: (dialogId) => set({ currentDialog: dialogId }),

  addToInventory: (itemId) => {
    const { inventory } = get()
    if (!inventory.includes(itemId)) {
      set({ inventory: [...inventory, itemId] })
    }
  },

  addCollectible: (collectibleId) => {
    const { collectibles } = get()
    if (!collectibles.includes(collectibleId)) {
      set({ collectibles: [...collectibles, collectibleId] })
    }
  },

  completeStory: (storyId) => {
    const { completedStories } = get()
    if (!completedStories.includes(storyId)) {
      set({ completedStories: [...completedStories, storyId] })
    }
  },

  addRenovationPoints: (points) => {
    const { renovationPoints } = get()
    set({ renovationPoints: renovationPoints + points })
  }
}))
