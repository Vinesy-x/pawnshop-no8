import React, { useState } from 'react'
import type { Cell as CellType } from '../types/game'
import { getItemDef, generatorMap } from '../data/items'
import './Cell.css'

interface CellProps {
  cell: CellType
  isDragging: boolean
  isDragOver: boolean
  onClickGenerator: () => void
  onDragStart: () => void
  onDragEnd: () => void
  onDrop: () => void
}

export const Cell: React.FC<CellProps> = ({
  cell,
  isDragging,
  isDragOver,
  onClickGenerator,
  onDragStart,
  onDragEnd,
  onDrop
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // 获取显示内容
  const getContent = () => {
    if (!cell.item) return null
    
    if (cell.item.isGenerator) {
      const genDef = generatorMap[cell.item.defId]
      return (
        <div className="cell-content generator" onClick={onClickGenerator}>
          <span className="cell-icon">{genDef?.icon || '❓'}</span>
          <span className="cell-label">{genDef?.name || '生成器'}</span>
        </div>
      )
    } else {
      const itemDef = getItemDef(cell.item.defId)
      return (
        <div 
          className={`cell-content item ${isDragging ? 'dragging' : ''}`}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.effectAllowed = 'move'
            onDragStart()
          }}
          onDragEnd={onDragEnd}
        >
          <span className="cell-icon">{itemDef?.icon || '❓'}</span>
          {itemDef && itemDef.level > 1 && (
            <span className="cell-level">Lv.{itemDef.level}</span>
          )}
        </div>
      )
    }
  }
  
  // 处理拖放
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    onDrop()
  }
  
  return (
    <div 
      className={`cell ${cell.state} ${isDragOver ? 'drag-over' : ''} ${isHovered ? 'hovered' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cell.state === 'blocked' && (
        <div className="cell-blocked">
          {cell.blockType === 'seal' && '🔒'}
          {cell.blockType === 'web' && '🕸️'}
          {cell.blockType === 'curse' && '💀'}
        </div>
      )}
      {cell.state === 'empty' && getContent()}
    </div>
  )
}
