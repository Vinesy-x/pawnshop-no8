// 故事1：童养媳的眼泪
// 时代：清末
// 核心物品：红嫁衣、绣花鞋、铜镜

import type { LevelConfig } from '../../types/game'

export interface StoryDialog {
  id: string
  speaker?: string
  speakerImage?: string
  text: string
  choices?: { text: string; nextId: string }[]
  next?: string
  trigger?: 'start_level' | 'show_order' | 'end_story'
}

export interface StoryData {
  id: string
  title: string
  era: string
  description: string
  dialogs: Record<string, StoryDialog>
  levels: LevelConfig[]
  startDialog: string
}

// 故事对话
const dialogs: Record<string, StoryDialog> = {
  // 开场
  'intro-1': {
    id: 'intro-1',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '深夜了，这当铺本该打烊……',
    next: 'intro-2'
  },
  'intro-2': {
    id: 'intro-2',
    text: '「吱呀——」门被推开，一阵阴风卷着纸钱飘进来。',
    next: 'intro-3'
  },
  'intro-3': {
    id: 'intro-3',
    speaker: '少女',
    speakerImage: '👰',
    text: '掌柜的……我想当一样东西。',
    next: 'intro-4'
  },
  'intro-4': {
    id: 'intro-4',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '姑娘，你这身嫁衣……',
    next: 'intro-5'
  },
  'intro-5': {
    id: 'intro-5',
    speaker: '少女',
    speakerImage: '👰',
    text: '是啊，我还没过门，就死了。',
    next: 'intro-6'
  },
  'intro-6': {
    id: 'intro-6',
    speaker: '少女',
    speakerImage: '👰',
    text: '我想当掉这身嫁衣，换一个……公道。',
    next: 'intro-choice'
  },
  'intro-choice': {
    id: 'intro-choice',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '公道？这可不便宜。你确定要用嫁衣来换？',
    choices: [
      { text: '接受典当', nextId: 'accept-1' },
      { text: '询问缘由', nextId: 'ask-1' }
    ]
  },
  
  // 询问支线
  'ask-1': {
    id: 'ask-1',
    speaker: '少女',
    speakerImage: '👰',
    text: '我本是王家的童养媳，五岁就被卖到他家……',
    next: 'ask-2'
  },
  'ask-2': {
    id: 'ask-2',
    speaker: '少女',
    speakerImage: '👰',
    text: '伺候了他们十三年，好不容易等到成亲的日子……',
    next: 'ask-3'
  },
  'ask-3': {
    id: 'ask-3',
    speaker: '少女',
    speakerImage: '👰',
    text: '婆婆却说，少爷看上了城里的小姐，不要我了。',
    next: 'ask-4'
  },
  'ask-4': {
    id: 'ask-4',
    speaker: '少女',
    speakerImage: '👰',
    text: '她把我推进了井里……穿着这身她亲手做的嫁衣。',
    next: 'accept-1'
  },
  
  // 接受典当
  'accept-1': {
    id: 'accept-1',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '好，这笔买卖我接了。',
    next: 'accept-2'
  },
  'accept-2': {
    id: 'accept-2',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '不过，光一身嫁衣还不够。你还需要准备一些东西……',
    next: 'accept-3'
  },
  'accept-3': {
    id: 'accept-3',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '我需要一盏长明灯、一封血书、还有一面照妖镜。',
    trigger: 'start_level',
    next: 'level-start'
  },
  'level-start': {
    id: 'level-start',
    text: '为少女的冤魂准备法器吧……',
    trigger: 'show_order'
  },
  
  // 完成后
  'complete-1': {
    id: 'complete-1',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '东西齐了。今夜子时，王家大院，自有公道。',
    next: 'complete-2'
  },
  'complete-2': {
    id: 'complete-2',
    speaker: '少女',
    speakerImage: '👰',
    text: '多谢掌柜……',
    next: 'complete-3'
  },
  'complete-3': {
    id: 'complete-3',
    text: '少女的身影渐渐淡去，只留下一缕幽香。',
    next: 'complete-4'
  },
  'complete-4': {
    id: 'complete-4',
    text: '第二天，王家大院走水，烧了个干净。只有那口枯井边，开满了白色的曼珠沙华。',
    next: 'ending'
  },
  'ending': {
    id: 'ending',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '「任何的换取都是有代价的」……这是当铺的规矩。',
    trigger: 'end_story'
  }
}

// 关卡配置
const levels: LevelConfig[] = [
  {
    id: 'story1-level1',
    storyId: 'bride-tears',
    name: '准备法器',
    boardWidth: 6,
    boardHeight: 8,
    initialItems: [],
    generators: [
      { x: 0, y: 0, defId: 'gen-candle' },
      { x: 1, y: 0, defId: 'gen-paper' },
      { x: 2, y: 0, defId: 'gen-wood' }
    ],
    blockedCells: [
      { x: 4, y: 2, blockType: 'seal' },
      { x: 5, y: 2, blockType: 'seal' },
      { x: 4, y: 3, blockType: 'seal' },
      { x: 5, y: 3, blockType: 'seal' }
    ],
    orders: [
      {
        id: 'order-lamp',
        targetItemId: 'lamp-2',  // 长明灯
        count: 1,
        completed: 0,
        reward: { coins: 50, stars: 1 }
      },
      {
        id: 'order-letter',
        targetItemId: 'letter-2', // 血书
        count: 1,
        completed: 0,
        reward: { coins: 50, stars: 1 }
      },
      {
        id: 'order-mirror',
        targetItemId: 'tool-2',   // 照妖镜
        count: 1,
        completed: 0,
        reward: { coins: 100, stars: 2 }
      }
    ],
    energyLimit: 100,
    initialEnergy: 50
  }
]

export const story1: StoryData = {
  id: 'bride-tears',
  title: '童养媳的眼泪',
  era: '清末',
  description: '一个穿着嫁衣的少女，深夜来到当铺，想用一身红妆换一个公道……',
  dialogs,
  levels,
  startDialog: 'intro-1'
}
