import React, { useState } from 'react'

import {
  AddBoardButtonDiv,
  AddBoardButtonSpan,
  BoardComposerDiv,
  ListBoardComponent,
  ListBoardDetails,
  ListBoardTextArea,
  SubmitBoardButton,
  SubmitBoardButtonDiv,
  WrappedSection,
  Wrapper,
  BoardDiv,
  BoardsContainer
} from './styled-components'

import BoardI from '../../types/board'

const Board = ({
  onBoardClick,
  onBoardSubmit,
  boards
}: {
  onBoardClick: Function
  onBoardSubmit: Function
  boards: BoardI[]
}) => {
  const [isTempBoardActive, setIsTempBoardActive] = useState(false)
  const [boardText, setBoardText] = useState('')

  return (
    <Wrapper>
      <WrappedSection>
        <BoardsContainer>
          {boards.map((board: BoardI) => (
            <BoardDiv key={board.id} onClick={() => onBoardClick(board.id)}>
              {board.title}
            </BoardDiv>
          ))}
        </BoardsContainer>
        {isTempBoardActive ? (
          <BoardComposerDiv>
            <ListBoardComponent>
              <ListBoardDetails>
                <ListBoardTextArea
                  placeholder='Enter a title for the new Board'
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    setBoardText(e.target.value)
                  }
                />
              </ListBoardDetails>
            </ListBoardComponent>
            <SubmitBoardButtonDiv>
              <SubmitBoardButton
                type='button'
                value='Add Board'
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault()

                  if (boardText) {
                    onBoardSubmit(boardText)
                  }

                  setIsTempBoardActive(false)
                }}
              />
            </SubmitBoardButtonDiv>
          </BoardComposerDiv>
        ) : (
          <AddBoardButtonDiv onClick={() => setIsTempBoardActive(true)}>
            <AddBoardButtonSpan>Add another Board</AddBoardButtonSpan>
          </AddBoardButtonDiv>
        )}
      </WrappedSection>
    </Wrapper>
  )
}

export default Board
