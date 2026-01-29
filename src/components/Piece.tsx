import React from 'react'
import { Piece as PieceType } from '../types'
import './Piece.css'

interface PieceProps {
  piece: PieceType
  onSelect: (piece: PieceType) => void
}

// 棋子图标映射（暂用emoji）
const PIECE_ICONS: Record<string, string> = {
  candle: '🕯️',
  incense: '🪔',
  paper: '📜',
  ink: '🖤',
  herb: '🌿',
  water: '💧',
  wood: '🪵',
  metal: '⚙️',
  cloth: '🧵',
  thread: '🪡',
  bone: '🦴',
  blood: '🩸'
}

// 棋子颜色映射
const PIECE_COLORS: Record<string, string> = {
  candle: '#FFA500',
  incense: '#9370DB',
  paper: '#F5F5DC',
  ink: '#2F4F4F',
  herb: '#228B22',
  water: '#4169E1',
  wood: '#8B4513',
  metal: '#708090',
  cloth: '#DC143C',
  thread: '#FFD700',
  bone: '#FFFAF0',
  blood: '#8B0000'
}

export const Piece: React.FC<PieceProps> = ({ piece, onSelect }) => {
  return (
    <div
      className={`piece ${piece.selected ? 'selected' : ''}`}
      style={{
        backgroundColor: PIECE_COLORS[piece.type] + '40',
        borderColor: piece.selected ? '#FFD700' : PIECE_COLORS[piece.type]
      }}
      onClick={() => onSelect(piece)}
    >
      <span className="piece-icon">{PIECE_ICONS[piece.type]}</span>
    </div>
  )
}
