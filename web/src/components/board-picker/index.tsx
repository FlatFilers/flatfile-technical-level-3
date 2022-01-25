import React, { useState } from 'react'
import BoardI from '../../types/board'
import { BoardContainer, BoardName, SubmitBoardButton, TextInputDiv } from './styled-components'
import axios from 'axios'
import {
  AddCardButtonDiv,
  AddCardButtonSpan,
  ListCardTextArea
} from '../section/styled-components'

const BoardPicker = ({ boards, onBoardSubmit }: { boards: BoardI[]; onBoardSubmit: Function }) => {
  const [isAddBoardActive, setIsAddBoardActive] = useState(false)
  const [boardTitle, setBoardTitle] = useState('')

  const createNewBoard = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/boards',
      data: { boardTitle }
    }).then((response) => {})
  }

  return (
    <BoardContainer key={boards.toString()}>
      {boards &&
        boards.length &&
        boards.map((board: BoardI) => {
          return (
            <BoardName
              key={board.id}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault()
                onBoardSubmit(board)
              }}
            >
              {board.title}
            </BoardName>
          )
        })}
      {isAddBoardActive ? (
        <TextInputDiv>
          <ListCardTextArea
            placeholder='Enter a title for the new board'
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              setBoardTitle(e.target.value)
            }
          />
          <SubmitBoardButton
            type='button'
            value='Add board'
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault()
              setIsAddBoardActive(false)
              createNewBoard()
            }}
          />
        </TextInputDiv>
      ) : (
        <BoardName onClick={() => setIsAddBoardActive(true)}>
          Create New Board
          <AddCardButtonDiv onClick={() => setIsAddBoardActive(true)}>
            <AddCardButtonSpan>Add another board</AddCardButtonSpan>
          </AddCardButtonDiv>
        </BoardName>
      )}
    </BoardContainer>
  )
}

export default BoardPicker
