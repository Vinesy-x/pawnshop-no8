import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { Cell } from './Cell'
import './Board.css'

export const Board: React.FC = () => {
  const { 
    board,
    boardWidth,
    boardHeight,
    energy,
    maxEnergy,
    coins,
    stars,
    draggingItem,
    clickGenerator,
    startDrag,
    endDrag,
    cancelDrag,
    submitItemToOrder
  } = useGameStore()
  
  const [dragOverCell, setDragOverCell] = useState<{x: number, y: number} | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // ESC 取消拖拽
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cancelDrag()
        setDragOverCell(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cancelDrag])
  
  // 消息自动消失
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [message])
  
  // 双击提交物品
  const handleDoubleClick = (x: number, y: number) => {
    const success = submitItemToOrder(x, y)
    if (success) {
      setMessage('✅ 物品已提交!')
    } else {
      setMessage('❌ 没有匹配的订单')
    }
  }
  
  // 如果棋盘未初始化，显示空
  if (board.length === 0) {
    return <div className="board-container">加载中...</div>
  }

  return (
    <div className="board-container">
      {/* 资源栏 */}
      <div className="resource-bar">
        <div className="resource energy">
          <span className="resource-icon">⚡</span>
          <span className="resource-value">{energy}/{maxEnergy}</span>
        </div>
        <div className="resource coins">
          <span className="resource-icon">🪙</span>
          <span className="resource-value">{coins}</span>
        </div>
        <div className="resource stars">
          <span className="resource-icon">⭐</span>
          <span className="resource-value">{stars}</span>
        </div>
      </div>
      
      {/* 消息提示 */}
      {message && (
        <div className="board-message">{message}</div>
      )}
      
      {/* 棋盘 */}
      <div 
        className="board" 
        style={{ 
          gridTemplateColumns: `repeat(${boardWidth}, 1fr)`,
          gridTemplateRows: `repeat(${boardHeight}, 1fr)`
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              cell={cell}
              isDragging={draggingItem?.x === x && draggingItem?.y === y}
              isDragOver={dragOverCell?.x === x && dragOverCell?.y === y}
              onClickGenerator={() => clickGenerator(x, y)}
              onDragStart={() => startDrag(x, y)}
              onDragEnd={() => {
                if (dragOverCell) {
                  endDrag(dragOverCell.x, dragOverCell.y)
                } else {
                  cancelDrag()
                }
                setDragOverCell(null)
              }}
              onDrop={() => {
                if (draggingItem) {
                  endDrag(x, y)
                  setDragOverCell(null)
                }
              }}
              onDoubleClick={() => handleDoubleClick(x, y)}
            />
          ))
        )}
      </div>
      
      {/* 提示 */}
      <div className="board-tips">
        <p>💡 点击生成器产出物品，拖拽相同物品合成升级，双击提交订单</p>
      </div>
    </div>
  )
}
