import React, { useEffect, useState } from 'react'
import BoardI from '../../types/board'

const BoardPicker = ({ boards, onBoardSubmit }: { boards: BoardI[]; onBoardSubmit: Function }) => {
  return (
    <div key={boards.toString()}>
      {boards &&
        boards.length &&
        boards.map((board: BoardI) => {
          return (
            <div
              key={board.id}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault()
                onBoardSubmit(board)
              }}
            >
              {board.title}
            </div>
          )
        })}
    </div>
  )
}

export default BoardPicker
