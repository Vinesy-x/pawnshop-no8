# 技术实现

---

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | React 18 + TypeScript | 主框架 |
| 构建 | Vite | 快速开发 |
| 状态 | Zustand | 轻量状态管理 |
| 动画 | Framer Motion | 流畅动画 |
| 音效 | Howler.js | 音频控制 |
| 样式 | Tailwind CSS | 快速样式 |
| 部署 | Vercel | 自动部署 |

---

## 项目结构

```
pawnshop-no8/
├── docs/                    # 设计文档
├── public/
│   ├── assets/
│   │   ├── items/          # 合成物品图片
│   │   ├── characters/     # 角色立绘
│   │   ├── backgrounds/    # 背景图
│   │   └── audio/          # 音效/BGM
│   └── fonts/              # 字体
├── src/
│   ├── components/
│   │   ├── board/          # 棋盘相关
│   │   ├── dialog/         # 对话系统
│   │   ├── renovation/     # 修缮系统
│   │   └── ui/             # 通用UI
│   ├── data/
│   │   ├── items.ts        # 物品定义
│   │   ├── chains.ts       # 合成链
│   │   ├── stories/        # 故事剧本
│   │   └── renovation.ts   # 修缮配置
│   ├── hooks/
│   │   ├── useBoard.ts     # 棋盘逻辑
│   │   ├── useMerge.ts     # 合成逻辑
│   │   └── useAudio.ts     # 音效控制
│   ├── stores/
│   │   ├── gameStore.ts    # 游戏状态
│   │   ├── storyStore.ts   # 剧情状态
│   │   └── settingsStore.ts# 设置
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

---

## 核心模块

### 1. 棋盘系统 (Board)
```typescript
interface BoardState {
  grid: (Item | null)[][];  // 4x4 或 5x5
  size: number;
  obstacles: Position[];    // 障碍物位置
}

interface Item {
  id: string;
  chainId: string;         // 所属合成链
  level: number;           // 1-5
  position: Position;
}
```

### 2. 合成系统 (Merge)
```typescript
interface MergeChain {
  id: string;
  name: string;
  era?: 'qing' | 'minguo' | 'modern';  // 时代专属
  items: ChainItem[];
}

interface ChainItem {
  level: number;
  name: string;
  icon: string;
  flavorText: string;      // 微恐文案
}
```

### 3. 订单系统 (Order)
```typescript
interface Order {
  id: string;
  storyId: string;
  clientName: string;
  request: string;
  requirements: OrderRequirement[];
  rewards: OrderReward;
}

interface OrderRequirement {
  chainId: string;
  level: number;
  count: number;
}
```

### 4. 剧情系统 (Story)
```typescript
interface Story {
  id: string;
  era: Era;
  title: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  dialogues: Dialogue[];
  levelId: string;
  choices?: Choice[];
  outcome: Outcome;
}
```

### 5. 修缮系统 (Renovation)
```typescript
interface RenovationArea {
  id: string;
  era: Era;
  name: string;
  cost: number;            // 所需修缮点
  beforeImage: string;
  afterImage: string;
  creepyDetail?: string;   // 恐怖细节描述
  unlockCondition: string; // 解锁条件
}
```

---

## 开发路线图

### Phase 1：核心原型 (2周)
- [ ] 项目初始化 (Vite + React + TS)
- [ ] 4×4 棋盘组件
- [ ] 拖拽合成逻辑
- [ ] 供奉链数据 + 图片占位
- [ ] 基础 UI 框架

### Phase 2：订单与剧情 (2周)
- [ ] 订单系统
- [ ] 对话组件
- [ ] 第一个完整故事（长明灯）
- [ ] 抉择分支逻辑
- [ ] 剧情存档

### Phase 3：修缮系统 (2周)
- [ ] 当铺场景组件
- [ ] 修缮点计算
- [ ] 修缮动画
- [ ] 时代切换

### Phase 4：打磨 (2周)
- [ ] 音效集成
- [ ] 恐怖氛围效果
- [ ] 性能优化
- [ ] 商业化接入（体力、广告）

### Phase 5：内容扩展
- [ ] 民国时代内容
- [ ] 现代时代内容
- [ ] 隐藏结局
- [ ] 收集系统

---

## 存档设计

```typescript
interface SaveData {
  version: string;
  currentEra: Era;
  completedStories: string[];
  renovationProgress: Record<string, boolean>;
  collectedItems: string[];
  choices: Record<string, string>;  // 剧情选择记录
  resources: {
    energy: number;
    renovationPoints: number;
  };
  statistics: {
    totalMerges: number;
    playTime: number;
  };
}
```

使用 localStorage 存储，支持云存档扩展。
