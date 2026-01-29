import { useState, useEffect } from 'react'
import { Board } from './components/Board'
import { DialogBox } from './components/DialogBox'
import type { DialogLine } from './components/DialogBox'
import { OrderPanel } from './components/OrderPanel'
import { story1 } from './data/stories/story1'
import type { StoryDialog } from './data/stories/story1'
import { useGameStore } from './store/gameStore'
import './App.css'

type GamePhase = 'title' | 'story-select' | 'dialog' | 'playing' | 'complete'

function App() {
  const [phase, setPhase] = useState<GamePhase>('title')
  const [currentDialogId, setCurrentDialogId] = useState<string | null>(null)
  const { orders, setOrders, initBoard, placeItem } = useGameStore()
  
  // 获取当前对话
  const currentDialog: StoryDialog | null = currentDialogId 
    ? story1.dialogs[currentDialogId] 
    : null
  
  // 开始游戏
  const startGame = () => {
    setPhase('dialog')
    setCurrentDialogId(story1.startDialog)
  }
  
  // 处理对话下一步
  const handleDialogNext = () => {
    if (!currentDialog) return
    
    // 检查触发器
    if (currentDialog.trigger === 'start_level') {
      // 初始化关卡
      const level = story1.levels[0]
      initBoard(level.boardWidth, level.boardHeight)
      
      // 延迟放置生成器
      setTimeout(() => {
        level.generators.forEach((gen: { x: number; y: number; defId: string }) => {
          placeItem(gen.x, gen.y, gen.defId, true)
        })
      }, 100)
    }
    
    if (currentDialog.trigger === 'show_order') {
      // 设置订单并进入游戏
      const level = story1.levels[0]
      setOrders(level.orders)
      setPhase('playing')
      return
    }
    
    if (currentDialog.trigger === 'end_story') {
      setPhase('complete')
      return
    }
    
    // 进入下一个对话
    if (currentDialog.next) {
      setCurrentDialogId(currentDialog.next)
    }
  }
  
  // 处理对话选择
  const handleDialogChoice = (nextId: string) => {
    setCurrentDialogId(nextId)
  }
  
  // 检查订单是否全部完成
  const allOrdersComplete = orders.length > 0 && orders.every(o => o.completed >= o.count)
  
  useEffect(() => {
    if (allOrdersComplete && phase === 'playing') {
      // 延迟一下再播放结局对话
      setTimeout(() => {
        setPhase('dialog')
        setCurrentDialogId('complete-1')
      }, 1000)
    }
  }, [allOrdersComplete, phase])
  
  // 转换对话格式
  const dialogLine: DialogLine | null = currentDialog ? {
    speaker: currentDialog.speaker,
    speakerImage: currentDialog.speakerImage,
    text: currentDialog.text,
    choices: currentDialog.choices
  } : null

  return (
    <div className="app">
      {/* 标题画面 */}
      {phase === 'title' && (
        <div className="title-screen">
          <div className="title-content">
            <h1 className="game-title">无名当铺</h1>
            <p className="game-subtitle">第八号当铺</p>
            <p className="game-tagline">「任何的换取都是有代价的」</p>
            <button className="start-button" onClick={startGame}>
              开始游戏
            </button>
          </div>
        </div>
      )}
      
      {/* 游戏主界面 */}
      {(phase === 'playing' || phase === 'dialog') && (
        <>
          <header className="app-header">
            <h1>无名当铺</h1>
            <p className="subtitle">{story1.title}</p>
          </header>
          
          <main className="app-main">
            <div className="game-layout">
              <Board />
              {orders.length > 0 && <OrderPanel />}
            </div>
          </main>
        </>
      )}
      
      {/* 对话框 */}
      {phase === 'dialog' && dialogLine && (
        <DialogBox
          dialog={dialogLine}
          onNext={handleDialogNext}
          onChoice={handleDialogChoice}
        />
      )}
      
      {/* 完成画面 */}
      {phase === 'complete' && (
        <div className="complete-screen">
          <div className="complete-content">
            <h2>故事完成</h2>
            <p className="story-title">{story1.title}</p>
            <div className="rewards">
              <p>🌟 获得修缮点 x3</p>
              <p>📖 解锁收藏：红嫁衣</p>
            </div>
            <button className="back-button" onClick={() => setPhase('title')}>
              返回主菜单
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
