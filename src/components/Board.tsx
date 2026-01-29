import React, { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { Piece } from './Piece'
import { findMatchingRecipes } from '../data/recipes'
import './Board.css'

interface BoardProps {
  width?: number
  height?: number
}

export const Board: React.FC<BoardProps> = ({ width = 6, height = 8 }) => {
  const { 
    board, 
    selectedPieces, 
    initBoard, 
    selectPiece, 
    clearSelection,
    mergePieces,
    addToInventory 
  } = useGameStore()

  useEffect(() => {
    initBoard(width, height)
  }, [width, height, initBoard])

  // 处理合成
  const handleMerge = () => {
    if (selectedPieces.length >= 2) {
      const pieceTypes = selectedPieces.map(p => p.type)
      const matchingRecipes = findMatchingRecipes(pieceTypes)
      
      if (matchingRecipes.length > 0) {
        const recipe = matchingRecipes[0]
        addToInventory(recipe.id)
        console.log(`合成成功: ${recipe.name}`)
      } else {
        console.log('没有匹配的配方')
      }
      
      mergePieces()
    }
  }

  // 获取当前可能合成的物品
  const getPotentialRecipe = () => {
    if (selectedPieces.length < 2) return null
    const pieceTypes = selectedPieces.map(p => p.type)
    const matchingRecipes = findMatchingRecipes(pieceTypes)
    return matchingRecipes[0] || null
  }

  const potentialRecipe = getPotentialRecipe()

  return (
    <div className="board-container">
      <div className="board" style={{ 
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`
      }}>
        {board.map((row, y) =>
          row.map((piece) => (
            <Piece
              key={piece.id}
              piece={piece}
              onSelect={selectPiece}
            />
          ))
        )}
      </div>
      
      <div className="board-controls">
        <div className="selection-info">
          已选择: {selectedPieces.length} 个棋子
          {potentialRecipe && (
            <span className="recipe-hint">
              → 可合成: {potentialRecipe.name}
            </span>
          )}
        </div>
        
        <div className="button-group">
          <button 
            className="btn btn-merge"
            onClick={handleMerge}
            disabled={selectedPieces.length < 2}
          >
            合成
          </button>
          <button 
            className="btn btn-clear"
            onClick={clearSelection}
            disabled={selectedPieces.length === 0}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  )
}
