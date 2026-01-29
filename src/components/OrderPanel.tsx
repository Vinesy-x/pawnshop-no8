import React from 'react'
import { useGameStore } from '../store/gameStore'
import { getItemDef } from '../data/items'
import './OrderPanel.css'

interface OrderPanelProps {
  onDropItem?: (orderId: string) => void
}

export const OrderPanel: React.FC<OrderPanelProps> = ({ onDropItem }) => {
  const { orders } = useGameStore()
  
  if (orders.length === 0) return null
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }
  
  const handleDrop = (e: React.DragEvent, orderId: string) => {
    e.preventDefault()
    onDropItem?.(orderId)
  }
  
  return (
    <div className="order-panel">
      <h3 className="order-title">📋 当铺订单</h3>
      <div className="order-list">
        {orders.map(order => {
          const itemDef = getItemDef(order.targetItemId)
          const isComplete = order.completed >= order.count
          
          return (
            <div 
              key={order.id} 
              className={`order-item ${isComplete ? 'complete' : ''}`}
              onDragOver={!isComplete ? handleDragOver : undefined}
              onDrop={!isComplete ? (e) => handleDrop(e, order.id) : undefined}
            >
              <div className="order-icon">{itemDef?.icon || '❓'}</div>
              <div className="order-info">
                <div className="order-name">{itemDef?.name || '未知物品'}</div>
                <div className="order-progress">
                  {order.completed}/{order.count}
                </div>
              </div>
              <div className="order-reward">
                {order.reward.coins && <span>🪙{order.reward.coins}</span>}
                {order.reward.stars && <span>⭐{order.reward.stars}</span>}
              </div>
              {isComplete && <div className="order-check">✓</div>}
            </div>
          )
        })}
      </div>
      <p className="order-tip">💡 双击物品提交订单</p>
    </div>
  )
}
