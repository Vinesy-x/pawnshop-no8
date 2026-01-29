// 游戏核心类型定义

// 棋子类型 - 对应6条合成链的基础材料
export type PieceType = 
  | 'candle'      // 供奉链 - 蜡烛
  | 'incense'     // 供奉链 - 香
  | 'paper'       // 信物链 - 纸张
  | 'ink'         // 信物链 - 墨
  | 'herb'        // 药理链 - 草药
  | 'water'       // 药理链 - 水
  | 'wood'        // 工具链 - 木
  | 'metal'       // 工具链 - 金属
  | 'cloth'       // 冥婚链 - 布
  | 'thread'      // 冥婚链 - 线
  | 'bone'        // 巫蛊链 - 骨
  | 'blood'       // 巫蛊链 - 血

// 棋子
export interface Piece {
  id: string
  type: PieceType
  x: number
  y: number
  selected: boolean
}

// 合成配方
export interface Recipe {
  id: string
  name: string
  chain: 'worship' | 'keepsake' | 'medicine' | 'tool' | 'ghost-wedding' | 'witchcraft'
  ingredients: PieceType[]
  result: string
  description: string
}

// 关卡目标
export interface LevelGoal {
  itemId: string    // 需要合成的物品ID
  count: number     // 需要的数量
}

// 关卡配置
export interface Level {
  id: string
  storyId: string
  name: string
  goals: LevelGoal[]
  boardWidth: number
  boardHeight: number
  moves?: number           // 步数限制（可选）
  timeLimit?: number       // 时间限制（可选）
  specialMechanics?: string[]  // 特殊机制
}

// 对话节点
export interface DialogNode {
  id: string
  speaker?: string
  text: string
  choices?: DialogChoice[]
  next?: string           // 下一个节点ID
  trigger?: string        // 触发的事件
}

// 对话选择
export interface DialogChoice {
  text: string
  nextId: string
  requires?: string       // 需要的道具
  consequence?: string    // 选择后果
}

// 故事章节
export interface Story {
  id: string
  era: 'qing' | 'republic' | 'modern'
  title: string
  description: string
  levels: Level[]
  dialogs: Record<string, DialogNode>
  endings: StoryEnding[]
}

// 故事结局
export interface StoryEnding {
  id: string
  name: string
  description: string
  condition: string       // 达成条件
  stars: number           // 修缮点
  collectibles: string[]  // 获得的收藏品
}

// 收藏品
export interface Collectible {
  id: string
  name: string
  description: string
  storyId: string
  image?: string
}

// 游戏状态
export interface GameState {
  currentStory: string | null
  currentLevel: string | null
  currentDialog: string | null
  board: Piece[][]
  selectedPieces: Piece[]
  inventory: string[]           // 已合成的物品
  collectibles: string[]        // 已获得的收藏品
  completedStories: string[]
  renovationPoints: number      // 修缮点
}

// 棋盘操作
export type BoardAction = 
  | { type: 'SELECT_PIECE'; piece: Piece }
  | { type: 'DESELECT_PIECE'; piece: Piece }
  | { type: 'MERGE_PIECES'; pieces: Piece[] }
  | { type: 'REFILL_BOARD' }
  | { type: 'SHUFFLE_BOARD' }
