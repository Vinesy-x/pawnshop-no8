import type { ItemDef, GeneratorDef } from '../types/game'

// ========== 供奉链 ==========
// 蜡烛 → 油灯 → 长明灯 → 神灯 → 天灯

export const worshipItems: ItemDef[] = [
  {
    id: 'candle-1',
    name: '蜡烛',
    icon: '🕯️',
    level: 1,
    chain: 'worship',
    mergeResult: 'candle-2',
    description: '普通的蜡烛'
  },
  {
    id: 'candle-2',
    name: '红烛',
    icon: '🕯️',
    level: 2,
    chain: 'worship',
    mergeResult: 'lamp-1',
    description: '红色的蜡烛，喜庆又庄重'
  },
  {
    id: 'lamp-1',
    name: '油灯',
    icon: '🪔',
    level: 3,
    chain: 'worship',
    mergeResult: 'lamp-2',
    description: '古朴的油灯'
  },
  {
    id: 'lamp-2',
    name: '长明灯',
    icon: '🏮',
    level: 4,
    chain: 'worship',
    mergeResult: 'lamp-3',
    description: '永不熄灭的灯火'
  },
  {
    id: 'lamp-3',
    name: '天灯',
    icon: '✨',
    level: 5,
    chain: 'worship',
    description: '可照亮幽冥之路'
  },
  // 香的分支
  {
    id: 'incense-1',
    name: '线香',
    icon: '🧧',
    level: 1,
    chain: 'worship',
    mergeResult: 'incense-2',
    description: '普通的香'
  },
  {
    id: 'incense-2',
    name: '檀香',
    icon: '🪷',
    level: 2,
    chain: 'worship',
    mergeResult: 'incense-3',
    description: '檀香木制成'
  },
  {
    id: 'incense-3',
    name: '还魂香',
    icon: '💫',
    level: 3,
    chain: 'worship',
    description: '能让魂魄短暂回归'
  }
]

// ========== 信物链 ==========
// 纸 → 信纸 → 家书 → 血书 → 绝命书

export const keepsakeItems: ItemDef[] = [
  {
    id: 'paper-1',
    name: '草纸',
    icon: '📃',
    level: 1,
    chain: 'keepsake',
    mergeResult: 'paper-2',
    description: '粗糙的纸张'
  },
  {
    id: 'paper-2',
    name: '宣纸',
    icon: '📜',
    level: 2,
    chain: 'keepsake',
    mergeResult: 'letter-1',
    description: '上好的宣纸'
  },
  {
    id: 'letter-1',
    name: '家书',
    icon: '💌',
    level: 3,
    chain: 'keepsake',
    mergeResult: 'letter-2',
    description: '寄托思念的书信'
  },
  {
    id: 'letter-2',
    name: '血书',
    icon: '📕',
    level: 4,
    chain: 'keepsake',
    mergeResult: 'letter-3',
    description: '以血为墨写成'
  },
  {
    id: 'letter-3',
    name: '绝命书',
    icon: '📖',
    level: 5,
    chain: 'keepsake',
    description: '承载最后的执念'
  },
  // 墨的分支
  {
    id: 'ink-1',
    name: '墨块',
    icon: '⬛',
    level: 1,
    chain: 'keepsake',
    mergeResult: 'ink-2',
    description: '普通的墨'
  },
  {
    id: 'ink-2',
    name: '松烟墨',
    icon: '🖤',
    level: 2,
    chain: 'keepsake',
    mergeResult: 'ink-3',
    description: '上等松烟制成'
  },
  {
    id: 'ink-3',
    name: '龙涎墨',
    icon: '💜',
    level: 3,
    chain: 'keepsake',
    description: '写出的字会动'
  }
]

// ========== 药理链 ==========
// 草药 → 药包 → 药丸 → 灵丹 → 仙丹

export const medicineItems: ItemDef[] = [
  {
    id: 'herb-1',
    name: '草药',
    icon: '🌿',
    level: 1,
    chain: 'medicine',
    mergeResult: 'herb-2',
    description: '普通的草药'
  },
  {
    id: 'herb-2',
    name: '药包',
    icon: '🎒',
    level: 2,
    chain: 'medicine',
    mergeResult: 'pill-1',
    description: '包好的药材'
  },
  {
    id: 'pill-1',
    name: '药丸',
    icon: '💊',
    level: 3,
    chain: 'medicine',
    mergeResult: 'pill-2',
    description: '炼制好的药丸'
  },
  {
    id: 'pill-2',
    name: '灵丹',
    icon: '🔮',
    level: 4,
    chain: 'medicine',
    mergeResult: 'pill-3',
    description: '有奇效的丹药'
  },
  {
    id: 'pill-3',
    name: '还魂丹',
    icon: '💎',
    level: 5,
    chain: 'medicine',
    description: '起死回生之药'
  }
]

// ========== 工具链 ==========
// 木 → 木板 → 木器 → 法器 → 神器

export const toolItems: ItemDef[] = [
  {
    id: 'wood-1',
    name: '木块',
    icon: '🪵',
    level: 1,
    chain: 'tool',
    mergeResult: 'wood-2',
    description: '普通的木头'
  },
  {
    id: 'wood-2',
    name: '桃木',
    icon: '🌳',
    level: 2,
    chain: 'tool',
    mergeResult: 'tool-1',
    description: '辟邪的桃木'
  },
  {
    id: 'tool-1',
    name: '桃木剑',
    icon: '🗡️',
    level: 3,
    chain: 'tool',
    mergeResult: 'tool-2',
    description: '驱邪的法器'
  },
  {
    id: 'tool-2',
    name: '照妖镜',
    icon: '🪞',
    level: 4,
    chain: 'tool',
    mergeResult: 'tool-3',
    description: '照出真相'
  },
  {
    id: 'tool-3',
    name: '判官笔',
    icon: '🖊️',
    level: 5,
    chain: 'tool',
    description: '可改生死簿'
  },
  // 金属分支
  {
    id: 'metal-1',
    name: '铁块',
    icon: '⚙️',
    level: 1,
    chain: 'tool',
    mergeResult: 'metal-2',
    description: '普通的铁'
  },
  {
    id: 'metal-2',
    name: '铜钱',
    icon: '🪙',
    level: 2,
    chain: 'tool',
    mergeResult: 'metal-3',
    description: '古铜钱'
  },
  {
    id: 'metal-3',
    name: '铜秤',
    icon: '⚖️',
    level: 3,
    chain: 'tool',
    description: '公平的称量'
  }
]

// ========== 冥婚链 ==========
// 布 → 红布 → 嫁衣 → 凤冠霞帔 → 冥婚礼服

export const ghostWeddingItems: ItemDef[] = [
  {
    id: 'cloth-1',
    name: '布料',
    icon: '🧵',
    level: 1,
    chain: 'ghost-wedding',
    mergeResult: 'cloth-2',
    description: '普通的布'
  },
  {
    id: 'cloth-2',
    name: '红绸',
    icon: '🎀',
    level: 2,
    chain: 'ghost-wedding',
    mergeResult: 'dress-1',
    description: '大红的绸缎'
  },
  {
    id: 'dress-1',
    name: '嫁衣',
    icon: '👘',
    level: 3,
    chain: 'ghost-wedding',
    mergeResult: 'dress-2',
    description: '红色的嫁衣'
  },
  {
    id: 'dress-2',
    name: '凤冠霞帔',
    icon: '👑',
    level: 4,
    chain: 'ghost-wedding',
    mergeResult: 'dress-3',
    description: '华丽的新娘装束'
  },
  {
    id: 'dress-3',
    name: '冥婚礼服',
    icon: '👻',
    level: 5,
    chain: 'ghost-wedding',
    description: '阴间的嫁衣'
  },
  // 绣花鞋分支
  {
    id: 'shoe-1',
    name: '布鞋',
    icon: '👟',
    level: 1,
    chain: 'ghost-wedding',
    mergeResult: 'shoe-2',
    description: '普通的布鞋'
  },
  {
    id: 'shoe-2',
    name: '绣花鞋',
    icon: '👠',
    level: 2,
    chain: 'ghost-wedding',
    mergeResult: 'shoe-3',
    description: '精美的绣花鞋'
  },
  {
    id: 'shoe-3',
    name: '三寸金莲',
    icon: '🥿',
    level: 3,
    chain: 'ghost-wedding',
    description: '缠足的象征'
  }
]

// ========== 巫蛊链 ==========
// 骨 → 骨片 → 骨笛 → 镇魂瓶 → 招魂幡

export const witchcraftItems: ItemDef[] = [
  {
    id: 'bone-1',
    name: '碎骨',
    icon: '🦴',
    level: 1,
    chain: 'witchcraft',
    mergeResult: 'bone-2',
    description: '不知来源的骨头'
  },
  {
    id: 'bone-2',
    name: '骨片',
    icon: '💀',
    level: 2,
    chain: 'witchcraft',
    mergeResult: 'bone-3',
    description: '打磨过的骨片'
  },
  {
    id: 'bone-3',
    name: '骨笛',
    icon: '🎺',
    level: 3,
    chain: 'witchcraft',
    mergeResult: 'artifact-1',
    description: '吹出的声音很诡异'
  },
  {
    id: 'artifact-1',
    name: '镇魂瓶',
    icon: '🏺',
    level: 4,
    chain: 'witchcraft',
    mergeResult: 'artifact-2',
    description: '封印魂魄的容器'
  },
  {
    id: 'artifact-2',
    name: '招魂幡',
    icon: '🎏',
    level: 5,
    chain: 'witchcraft',
    description: '可召唤亡魂'
  },
  // 血的分支
  {
    id: 'blood-1',
    name: '血滴',
    icon: '🩸',
    level: 1,
    chain: 'witchcraft',
    mergeResult: 'blood-2',
    description: '一滴血'
  },
  {
    id: 'blood-2',
    name: '血瓶',
    icon: '🧪',
    level: 2,
    chain: 'witchcraft',
    mergeResult: 'blood-3',
    description: '装满血的瓶子'
  },
  {
    id: 'blood-3',
    name: '天机符',
    icon: '📿',
    level: 3,
    chain: 'witchcraft',
    description: '用血画的符咒'
  }
]

// ========== 汇总所有物品 ==========

export const allItems: ItemDef[] = [
  ...worshipItems,
  ...keepsakeItems,
  ...medicineItems,
  ...toolItems,
  ...ghostWeddingItems,
  ...witchcraftItems
]

// 物品查找表
export const itemMap: Record<string, ItemDef> = {}
allItems.forEach(item => {
  itemMap[item.id] = item
})

// 根据ID获取物品定义
export function getItemDef(id: string): ItemDef | undefined {
  return itemMap[id]
}

// ========== 生成器定义 ==========

export const generators: GeneratorDef[] = [
  {
    id: 'gen-candle',
    name: '烛台',
    icon: '🕎',
    produces: ['candle-1'],
    cooldown: 0,
    energyCost: 1
  },
  {
    id: 'gen-incense',
    name: '香炉',
    icon: '🫖',
    produces: ['incense-1'],
    cooldown: 0,
    energyCost: 1
  },
  {
    id: 'gen-paper',
    name: '纸堆',
    icon: '📚',
    produces: ['paper-1'],
    cooldown: 0,
    energyCost: 1
  },
  {
    id: 'gen-herb',
    name: '药柜',
    icon: '🗄️',
    produces: ['herb-1'],
    cooldown: 0,
    energyCost: 1
  },
  {
    id: 'gen-wood',
    name: '木料堆',
    icon: '🪓',
    produces: ['wood-1'],
    cooldown: 0,
    energyCost: 1
  },
  {
    id: 'gen-cloth',
    name: '布匹架',
    icon: '🧶',
    produces: ['cloth-1'],
    cooldown: 0,
    energyCost: 1
  },
  {
    id: 'gen-bone',
    name: '骨灰坛',
    icon: '⚱️',
    produces: ['bone-1'],
    cooldown: 0,
    energyCost: 1
  }
]

// 生成器查找表
export const generatorMap: Record<string, GeneratorDef> = {}
generators.forEach(gen => {
  generatorMap[gen.id] = gen
})
