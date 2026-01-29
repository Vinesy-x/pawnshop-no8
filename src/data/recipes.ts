import { Recipe } from '../types'

// 合成配方数据
// 每条链有多级合成，低级材料 → 中级 → 高级

export const recipes: Recipe[] = [
  // ========== 供奉链 ==========
  {
    id: 'offering-lamp',
    name: '油灯',
    chain: 'worship',
    ingredients: ['candle', 'candle'],
    result: '油灯',
    description: '简单的供奉之物'
  },
  {
    id: 'eternal-lamp',
    name: '长明灯',
    chain: 'worship',
    ingredients: ['candle', 'candle', 'incense'],
    result: '长明灯',
    description: '永不熄灭的灯火，可照亮幽冥之路'
  },
  {
    id: 'paper-child',
    name: '纸扎童子',
    chain: 'worship',
    ingredients: ['paper', 'incense', 'candle'],
    result: '纸扎童子',
    description: '引路的童子'
  },

  // ========== 信物链 ==========
  {
    id: 'letter',
    name: '家书',
    chain: 'keepsake',
    ingredients: ['paper', 'ink'],
    result: '家书',
    description: '寄托思念的书信'
  },
  {
    id: 'bloody-letter',
    name: '染血家书',
    chain: 'keepsake',
    ingredients: ['paper', 'ink', 'blood'],
    result: '染血家书',
    description: '带血的家书，承载着痛苦的记忆'
  },
  {
    id: 'pawn-ticket',
    name: '当票',
    chain: 'keepsake',
    ingredients: ['paper', 'paper', 'ink'],
    result: '当票',
    description: '当铺的凭证'
  },
  {
    id: 'rattle-drum',
    name: '拨浪鼓',
    chain: 'keepsake',
    ingredients: ['wood', 'cloth', 'thread'],
    result: '拨浪鼓',
    description: '童年的玩具'
  },
  {
    id: 'binding-cloth',
    name: '裹脚布',
    chain: 'keepsake',
    ingredients: ['cloth', 'cloth', 'thread'],
    result: '裹脚布',
    description: '缠足的刑具'
  },
  {
    id: 'merit-certificate',
    name: '功名状',
    chain: 'keepsake',
    ingredients: ['paper', 'paper', 'ink', 'ink'],
    result: '功名状',
    description: '科举的荣耀，也是枷锁'
  },
  {
    id: 'failed-paper',
    name: '落榜文书',
    chain: 'keepsake',
    ingredients: ['paper', 'ink', 'water'],
    result: '落榜文书',
    description: '泪水浸透的落榜通知'
  },

  // ========== 药理链 ==========
  {
    id: 'herbal-tea',
    name: '草药汤',
    chain: 'medicine',
    ingredients: ['herb', 'water'],
    result: '草药汤',
    description: '简单的药汤'
  },
  {
    id: 'quit-opium',
    name: '戒烟丸',
    chain: 'medicine',
    ingredients: ['herb', 'herb', 'water'],
    result: '戒烟丸',
    description: '戒除烟瘾的丹药'
  },
  {
    id: 'soul-return',
    name: '还魂香',
    chain: 'medicine',
    ingredients: ['herb', 'incense', 'candle'],
    result: '还魂香',
    description: '能让魂魄短暂回归的香'
  },
  {
    id: 'bone-connect',
    name: '接骨丹',
    chain: 'medicine',
    ingredients: ['herb', 'bone', 'water'],
    result: '接骨丹',
    description: '接续断骨的灵丹'
  },
  {
    id: 'forgetful-grass',
    name: '忘忧草',
    chain: 'medicine',
    ingredients: ['herb', 'herb', 'herb'],
    result: '忘忧草',
    description: '能让人忘却痛苦的草药'
  },

  // ========== 工具链 ==========
  {
    id: 'copper-scale',
    name: '铜秤',
    chain: 'tool',
    ingredients: ['metal', 'metal'],
    result: '铜秤',
    description: '称量物品的工具'
  },
  {
    id: 'scissors',
    name: '剪刀',
    chain: 'tool',
    ingredients: ['metal', 'metal', 'wood'],
    result: '剪刀',
    description: '锋利的剪刀，可以剪断很多东西'
  },
  {
    id: 'demon-mirror',
    name: '照妖镜',
    chain: 'tool',
    ingredients: ['metal', 'metal', 'candle', 'incense'],
    result: '照妖镜',
    description: '可以照出真相的镜子'
  },
  {
    id: 'peach-sword',
    name: '桃木剑',
    chain: 'tool',
    ingredients: ['wood', 'wood', 'incense'],
    result: '桃木剑',
    description: '驱邪的法器'
  },

  // ========== 冥婚链 ==========
  {
    id: 'wedding-dress',
    name: '嫁衣',
    chain: 'ghost-wedding',
    ingredients: ['cloth', 'cloth', 'thread', 'thread'],
    result: '嫁衣',
    description: '大红的嫁衣'
  },
  {
    id: 'embroidered-shoes',
    name: '绣花鞋',
    chain: 'ghost-wedding',
    ingredients: ['cloth', 'thread', 'thread'],
    result: '绣花鞋',
    description: '三寸金莲的容器'
  },
  {
    id: 'phoenix-crown',
    name: '凤冠霞帔',
    chain: 'ghost-wedding',
    ingredients: ['cloth', 'cloth', 'metal', 'thread'],
    result: '凤冠霞帔',
    description: '新娘的盛装'
  },
  {
    id: 'mandarin-lock',
    name: '鸳鸯锁',
    chain: 'ghost-wedding',
    ingredients: ['metal', 'metal', 'thread'],
    result: '鸳鸯锁',
    description: '锁住姻缘......或者锁住人'
  },

  // ========== 巫蛊链 ==========
  {
    id: 'soul-bottle',
    name: '镇魂瓶',
    chain: 'witchcraft',
    ingredients: ['bone', 'blood', 'incense'],
    result: '镇魂瓶',
    description: '封印魂魄的容器'
  },
  {
    id: 'curse-doll',
    name: '厌胜人偶',
    chain: 'witchcraft',
    ingredients: ['cloth', 'bone', 'blood'],
    result: '厌胜人偶',
    description: '诅咒他人的人偶'
  },
  {
    id: 'fate-talisman',
    name: '天机符',
    chain: 'witchcraft',
    ingredients: ['paper', 'blood', 'incense', 'candle'],
    result: '天机符',
    description: '能窥探天机的符咒，使用后会消耗'
  },
  {
    id: 'abolish-decree',
    name: '废除科举诏书',
    chain: 'witchcraft',
    ingredients: ['paper', 'paper', 'ink', 'blood'],
    result: '废除科举诏书',
    description: '终结一千三百年制度的诏书'
  }
]

// 根据链查找配方
export function getRecipesByChain(chain: Recipe['chain']): Recipe[] {
  return recipes.filter(r => r.chain === chain)
}

// 根据材料查找可合成的配方
export function findMatchingRecipes(pieces: string[]): Recipe[] {
  return recipes.filter(recipe => {
    if (recipe.ingredients.length !== pieces.length) return false
    const sortedIngredients = [...recipe.ingredients].sort()
    const sortedPieces = [...pieces].sort()
    return sortedIngredients.every((ing, i) => ing === sortedPieces[i])
  })
}
