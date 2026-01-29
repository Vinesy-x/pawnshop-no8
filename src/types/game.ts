// 游戏核心类型定义

// ========== 物品系统 ==========

// 物品ID（每种物品有唯一ID，包含等级信息）
export type ItemId = string

// 物品定义
export interface ItemDef {
  id: ItemId
  name: string
  icon: string           // emoji 或图片路径
  level: number          // 物品等级 1-5
  chain: ChainType       // 所属合成链
  mergeResult?: ItemId   // 2合1的结果，undefined表示最高级
  description: string
}

// 合成链类型
export type ChainType = 
  | 'worship'        // 供奉链
  | 'keepsake'       // 信物链  
  | 'medicine'       // 药理链
  | 'tool'           // 工具链
  | 'ghost-wedding'  // 冥婚链
  | 'witchcraft'     // 巫蛊链

// ========== 生成器系统 ==========

// 生成器定义
export interface GeneratorDef {
  id: string
  name: string
  icon: string
  produces: ItemId[]     // 可产出的物品ID列表（随机选一个）
  cooldown: number       // 冷却时间（秒），0表示消耗体力
  energyCost: number     // 体力消耗
}

// ========== 棋盘系统 ==========

// 格子状态
export type CellState = 
  | 'empty'          // 空格子
  | 'blocked'        // 被障碍物阻挡（封条、蛛网等）
  | 'locked'         // 未解锁区域

// 棋盘格子
export interface Cell {
  x: number
  y: number
  state: CellState
  item: BoardItem | null
  blockType?: 'seal' | 'web' | 'curse'  // 障碍类型
}

// 棋盘上的物品（包括普通物品和生成器）
export interface BoardItem {
  id: string           // 实例唯一ID
  defId: ItemId        // 物品定义ID
  isGenerator: boolean // 是否是生成器
}

// ========== 订单/任务系统 ==========

// 订单
export interface Order {
  id: string
  targetItemId: ItemId  // 需要合成的目标物品
  count: number         // 需要的数量
  completed: number     // 已完成数量
  reward: OrderReward
}

// 订单奖励
export interface OrderReward {
  coins?: number
  energy?: number
  stars?: number
  unlockArea?: string   // 解锁区域ID
}

// ========== 关卡系统 ==========

// 关卡配置
export interface LevelConfig {
  id: string
  storyId: string
  name: string
  boardWidth: number
  boardHeight: number
  initialItems: { x: number; y: number; defId: string }[]
  generators: { x: number; y: number; defId: string }[]
  blockedCells: { x: number; y: number; blockType: string }[]
  orders: Order[]
  energyLimit: number    // 体力上限
  initialEnergy: number  // 初始体力
}

// ========== 游戏状态 ==========

export interface GameState {
  // 当前进度
  currentStory: string | null
  currentLevel: string | null
  currentDialog: string | null
  
  // 棋盘
  board: Cell[][]
  boardWidth: number
  boardHeight: number
  
  // 资源
  energy: number
  maxEnergy: number
  coins: number
  stars: number
  
  // 订单
  orders: Order[]
  
  // 拖拽状态
  draggingItem: { x: number; y: number } | null
  
  // 收藏
  inventory: string[]
  collectibles: string[]
  completedStories: string[]
  renovationPoints: number
}

// ========== 对话系统 ==========

export interface DialogNode {
  id: string
  speaker?: string
  speakerImage?: string
  text: string
  choices?: DialogChoice[]
  next?: string
  trigger?: string
}

export interface DialogChoice {
  text: string
  nextId: string
  requires?: string
  consequence?: string
}

// ========== 故事系统 ==========

export interface Story {
  id: string
  era: 'qing' | 'republic' | 'modern'
  title: string
  description: string
  levels: LevelConfig[]
  dialogs: Record<string, DialogNode>
  endings: StoryEnding[]
}

export interface StoryEnding {
  id: string
  name: string
  description: string
  condition: string
  stars: number
  collectibles: string[]
}

export interface Collectible {
  id: string
  name: string
  description: string
  storyId: string
  image?: string
}
