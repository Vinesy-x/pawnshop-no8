// 故事1：童养媳的眼泪
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

const dialogs: Record<string, StoryDialog> = {
  // 开场
  'intro-1': {
    id: 'intro-1',
    text: '「吱呀——」深夜，一个穿红嫁衣的女子推门而入，裙摆湿漉漉的。',
    next: 'intro-2'
  },
  'intro-2': {
    id: 'intro-2',
    speaker: '少女',
    speakerImage: '👰',
    text: '掌柜的，我想当掉这身嫁衣，换一个公道。',
    next: 'intro-3'
  },
  'intro-3': {
    id: 'intro-3',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '公道？这可不便宜。说说你的事吧。',
    choices: [
      { text: '听她讲述', nextId: 'story-1' },
      { text: '直接接单', nextId: 'accept-1' }
    ]
  },
  
  // 身世
  'story-1': {
    id: 'story-1',
    speaker: '少女',
    speakerImage: '👰',
    text: '我叫秀娘，五岁被卖到王家做童养媳，伺候了他们十三年……',
    next: 'story-2'
  },
  'story-2': {
    id: 'story-2',
    speaker: '少女',
    speakerImage: '👰',
    text: '成亲前一天，婆婆说少爷看上了城里小姐，把我推进了后院的枯井。',
    next: 'story-3'
  },
  'story-3': {
    id: 'story-3',
    speaker: '少女',
    speakerImage: '👰',
    text: '这身嫁衣，是她亲手给我穿上的。',
    next: 'accept-1'
  },
  
  // 接单
  'accept-1': {
    id: 'accept-1',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '这笔买卖我接了。给我备齐三样法器：长明灯、血书、照妖镜。',
    trigger: 'start_level',
    next: 'level-start'
  },
  'level-start': {
    id: 'level-start',
    text: '为冤魂准备法器……',
    trigger: 'show_order'
  },
  
  // 结局
  'complete-1': {
    id: 'complete-1',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '东西齐了。今夜子时，王家大院，自有公道。',
    next: 'complete-2'
  },
  'complete-2': {
    id: 'complete-2',
    text: '那一夜，王家大院起了大火。有人看见一个红衣女子，提着灯，站在火海中央笑。',
    next: 'complete-3'
  },
  'complete-3': {
    id: 'complete-3',
    text: '此后每逢清明，那口枯井边总开满红色的曼珠沙华。',
    next: 'ending'
  },
  'ending': {
    id: 'ending',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '「任何的换取，都是有代价的」',
    trigger: 'end_story'
  }
}

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
    blockedCells: [],
    orders: [
      { id: 'order-lamp', targetItemId: 'lamp-2', count: 1, completed: 0, reward: { coins: 50, stars: 1 } },
      { id: 'order-letter', targetItemId: 'letter-2', count: 1, completed: 0, reward: { coins: 50, stars: 1 } },
      { id: 'order-mirror', targetItemId: 'tool-2', count: 1, completed: 0, reward: { coins: 100, stars: 2 } }
    ],
    energyLimit: 100,
    initialEnergy: 50
  }
]

export const story1: StoryData = {
  id: 'bride-tears',
  title: '童养媳的眼泪',
  era: '清末',
  description: '一个穿嫁衣的少女，想用红妆换一个公道……',
  dialogs,
  levels,
  startDialog: 'intro-1'
}
