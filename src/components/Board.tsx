import React, { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { Cell } from './Cell'
import './Board.css'

interface BoardProps {
  width?: number
  height?: number
}

export const Board: React.FC<BoardProps> = ({ width = 6, height = 8 }) => {
  const { 
    board,
    boardWidth,
    boardHeight,
    energy,
    maxEnergy,
    coins,
    stars,
    draggingItem,
    initBoard,
    placeItem,
    clickGenerator,
    startDrag,
    endDrag,
    cancelDrag
  } = useGameStore()
  
  const [dragOverCell, setDragOverCell] = useState<{x: number, y: number} | null>(null)

  // 初始化棋盘和放置初始生成器
  useEffect(() => {
    initBoard(width, height)
    
    // 延迟放置初始生成器（等棋盘初始化完成）
    setTimeout(() => {
      // 放置几个生成器
      placeItem(0, 0, 'gen-candle', true)
      placeItem(1, 0, 'gen-paper', true)
      placeItem(2, 0, 'gen-herb', true)
      placeItem(3, 0, 'gen-wood', true)
      placeItem(4, 0, 'gen-cloth', true)
      placeItem(5, 0, 'gen-bone', true)
    }, 100)
  }, [width, height])

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
            />
          ))
        )}
      </div>
      
      {/* 提示 */}
      <div className="board-tips">
        <p>💡 点击生成器产出物品，拖拽相同物品合成升级</p>
      </div>
    </div>
  )
}
