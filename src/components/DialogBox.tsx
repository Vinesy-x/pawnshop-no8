import React, { useState, useEffect } from 'react'
import './DialogBox.css'

export interface DialogLine {
  speaker?: string
  speakerImage?: string
  text: string
  choices?: { text: string; nextId: string }[]
}

interface DialogBoxProps {
  dialog: DialogLine
  onNext: () => void
  onChoice?: (nextId: string) => void
  speakerPosition?: 'left' | 'right'
}

export const DialogBox: React.FC<DialogBoxProps> = ({ 
  dialog, 
  onNext, 
  onChoice,
  speakerPosition = 'left'
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  
  // 打字机效果
  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)
    
    let index = 0
    const timer = setInterval(() => {
      if (index < dialog.text.length) {
        setDisplayedText(dialog.text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 30)
    
    return () => clearInterval(timer)
  }, [dialog.text])
  
  // 点击跳过打字效果或进入下一句
  const handleClick = () => {
    if (isTyping) {
      setDisplayedText(dialog.text)
      setIsTyping(false)
    } else if (!dialog.choices) {
      onNext()
    }
  }
  
  return (
    <div className="dialog-overlay" onClick={handleClick}>
      <div className={`dialog-box ${speakerPosition}`}>
        {dialog.speaker && (
          <div className="dialog-speaker">
            {dialog.speakerImage && (
              <div className="speaker-avatar">
                <span>{dialog.speakerImage}</span>
              </div>
            )}
            <span className="speaker-name">{dialog.speaker}</span>
          </div>
        )}
        
        <div className="dialog-content">
          <p className="dialog-text">{displayedText}</p>
          {!isTyping && !dialog.choices && (
            <span className="dialog-continue">▼</span>
          )}
        </div>
        
        {!isTyping && dialog.choices && (
          <div className="dialog-choices" onClick={e => e.stopPropagation()}>
            {dialog.choices.map((choice, i) => (
              <button 
                key={i} 
                className="dialog-choice"
                onClick={() => onChoice?.(choice.nextId)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
