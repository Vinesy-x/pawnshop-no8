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
  // ========== 开场 ==========
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
    text: '一个穿红嫁衣的女子站在门口，裙摆湿漉漉的，滴着水。',
    next: 'intro-4'
  },
  'intro-4': {
    id: 'intro-4',
    speaker: '少女',
    speakerImage: '👰',
    text: '掌柜的……我想当一样东西。',
    next: 'intro-5'
  },
  'intro-5': {
    id: 'intro-5',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '姑娘，你这身嫁衣……湿成这样，怕是刚从水里出来的吧？',
    next: 'intro-6'
  },
  'intro-6': {
    id: 'intro-6',
    speaker: '少女',
    speakerImage: '👰',
    text: '是啊……我还没过门，就死了。',
    next: 'intro-7'
  },
  'intro-7': {
    id: 'intro-7',
    speaker: '少女',
    speakerImage: '👰',
    text: '我想当掉这身嫁衣，换一个……公道。',
    next: 'intro-choice'
  },
  'intro-choice': {
    id: 'intro-choice',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '公道？这世道，公道可不便宜。你确定要用嫁衣来换？',
    choices: [
      { text: '接受典当', nextId: 'accept-1' },
      { text: '询问缘由', nextId: 'ask-1' }
    ]
  },
  
  // ========== 询问支线 ==========
  'ask-1': {
    id: 'ask-1',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '姑娘，说说你的事吧。能来这当铺的，怕是都有些故事。',
    next: 'ask-2'
  },
  'ask-2': {
    id: 'ask-2',
    speaker: '少女',
    speakerImage: '👰',
    text: '我叫秀娘，五岁那年，爹娘把我卖给了王家做童养媳……',
    next: 'ask-3'
  },
  'ask-3': {
    id: 'ask-3',
    speaker: '少女',
    speakerImage: '👰',
    text: '王家是镇上的大户，婆婆说，等少爷长大，就让我做他的正房。',
    next: 'ask-4'
  },
  'ask-4': {
    id: 'ask-4',
    speaker: '少女',
    speakerImage: '👰',
    text: '我伺候了他们十三年。挑水、劈柴、洗衣、做饭……什么苦活都干。',
    next: 'ask-5'
  },
  'ask-5': {
    id: 'ask-5',
    speaker: '少女',
    speakerImage: '👰',
    text: '婆婆打我骂我，我忍着。少爷嫌我土气，我也忍着。',
    next: 'ask-6'
  },
  'ask-6': {
    id: 'ask-6',
    speaker: '少女',
    speakerImage: '👰',
    text: '我想，等成了亲，日子总会好的……',
    next: 'ask-7'
  },
  'ask-7': {
    id: 'ask-7',
    text: '少女低下头，水从她的发梢滴落，在地上汇成一小摊。',
    next: 'ask-8'
  },
  'ask-8': {
    id: 'ask-8',
    speaker: '少女',
    speakerImage: '👰',
    text: '成亲的前一天，婆婆把我叫到后院。',
    next: 'ask-9'
  },
  'ask-9': {
    id: 'ask-9',
    speaker: '少女',
    speakerImage: '👰',
    text: '她说，少爷看上了城里刘员外的女儿，要娶她做正房。',
    next: 'ask-10'
  },
  'ask-10': {
    id: 'ask-10',
    speaker: '少女',
    speakerImage: '👰',
    text: '我说，那我呢？十三年了，我什么都给了王家……',
    next: 'ask-11'
  },
  'ask-11': {
    id: 'ask-11',
    speaker: '少女',
    speakerImage: '👰',
    text: '婆婆笑了。她说，你不过是个买来的丫头，还想当少奶奶？',
    next: 'ask-12'
  },
  'ask-12': {
    id: 'ask-12',
    text: '少女的声音开始颤抖。',
    next: 'ask-13'
  },
  'ask-13': {
    id: 'ask-13',
    speaker: '少女',
    speakerImage: '👰',
    text: '她让我穿上嫁衣，说是给我办婚事。',
    next: 'ask-14'
  },
  'ask-14': {
    id: 'ask-14',
    speaker: '少女',
    speakerImage: '👰',
    text: '我高兴得直哭……可她把我带到后院那口枯井边。',
    next: 'ask-15'
  },
  'ask-15': {
    id: 'ask-15',
    speaker: '少女',
    speakerImage: '👰',
    text: '然后，她推了我一把。',
    next: 'ask-16'
  },
  'ask-16': {
    id: 'ask-16',
    text: '「扑通——」',
    next: 'ask-17'
  },
  'ask-17': {
    id: 'ask-17',
    speaker: '少女',
    speakerImage: '👰',
    text: '井里都是水……我挣扎了很久，喊了很久，没人来救我。',
    next: 'ask-18'
  },
  'ask-18': {
    id: 'ask-18',
    speaker: '少女',
    speakerImage: '👰',
    text: '这身嫁衣……是她亲手给我穿上的。',
    next: 'ask-19'
  },
  'ask-19': {
    id: 'ask-19',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '……',
    next: 'ask-20'
  },
  'ask-20': {
    id: 'ask-20',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '这笔买卖，老夫接了。',
    next: 'accept-2'
  },
  
  // ========== 接受典当 ==========
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
    text: '不过，光一身嫁衣还不够。公道这东西，需要准备一些法器……',
    next: 'accept-3'
  },
  'accept-3': {
    id: 'accept-3',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '长明灯，照亮冤魂的路。',
    next: 'accept-4'
  },
  'accept-4': {
    id: 'accept-4',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '血书，记录不平的事。',
    next: 'accept-5'
  },
  'accept-5': {
    id: 'accept-5',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '照妖镜，照出恶人的真面目。',
    next: 'accept-6'
  },
  'accept-6': {
    id: 'accept-6',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '三样法器齐了，公道自然就来了。',
    trigger: 'start_level',
    next: 'level-start'
  },
  'level-start': {
    id: 'level-start',
    text: '为秀娘的冤魂准备法器吧……',
    trigger: 'show_order'
  },
  
  // ========== 结局 ==========
  'complete-1': {
    id: 'complete-1',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '东西齐了。',
    next: 'complete-2'
  },
  'complete-2': {
    id: 'complete-2',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '今夜子时，王家大院，自有公道。',
    next: 'complete-3'
  },
  'complete-3': {
    id: 'complete-3',
    speaker: '少女',
    speakerImage: '👰',
    text: '多谢掌柜……秀娘来世，定当结草衔环。',
    next: 'complete-4'
  },
  'complete-4': {
    id: 'complete-4',
    text: '少女深深一拜，身影渐渐淡去，只留下一缕幽香和几滴井水。',
    next: 'complete-5'
  },
  'complete-5': {
    id: 'complete-5',
    text: '——',
    next: 'complete-6'
  },
  'complete-6': {
    id: 'complete-6',
    text: '那一夜，子时刚过，王家大院突然起了大火。',
    next: 'complete-7'
  },
  'complete-7': {
    id: 'complete-7',
    text: '火势蔓延极快，仿佛有人在引路。',
    next: 'complete-8'
  },
  'complete-8': {
    id: 'complete-8',
    text: '有人看见，一个穿红嫁衣的女子，提着一盏灯，站在火海中央笑。',
    next: 'complete-9'
  },
  'complete-9': {
    id: 'complete-9',
    text: '第二天，人们在废墟中发现了王家母子的尸体。',
    next: 'complete-10'
  },
  'complete-10': {
    id: 'complete-10',
    text: '奇怪的是，两人脸上都带着恐惧的表情，像是看见了什么不该看的东西。',
    next: 'complete-11'
  },
  'complete-11': {
    id: 'complete-11',
    text: '而那口枯井边，开满了一片红色的曼珠沙华。',
    next: 'complete-12'
  },
  'complete-12': {
    id: 'complete-12',
    text: '此后每逢清明，总有人看见一个穿红衣的女子，坐在井边梳头，对着月亮微笑。',
    next: 'ending'
  },
  'ending': {
    id: 'ending',
    speaker: '掌柜',
    speakerImage: '👴',
    text: '「任何的换取，都是有代价的」……这是无名当铺的规矩。',
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
  description: '一个穿着嫁衣的少女，深夜来到当铺，想用一身红妆换一个公道……',
  dialogs,
  levels,
  startDialog: 'intro-1'
}
