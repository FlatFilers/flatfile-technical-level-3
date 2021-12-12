import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Section from './components/section'
import SectionI from './types/section'

import Board from './components/board'
import BoardI from './types/board'

import './App.css'

export const Wrapper = styled.div``

export const BoardContainer = styled.div`
  background-color: rgb(49, 121, 186);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #393939;
  overflow-y: hidden;
  overflow-x: auto;
  position: absolute;
  padding: 5px;
  align-items: flex-start;
`

function App() {
  const [sections, setSections] = useState<SectionI[]>([])
  const [boards, setBoards] = useState<BoardI[]>([])
  const [boardId, setBoardId] = useState<Number>(0)

  useEffect(() => {
    ;(async () => {
      const [sections, boards] = await Promise.all([
        axios.get('http://localhost:3001/sections'),
        axios.get('http://localhost:3001/boards')
      ])
      setSections(sections.data)
      setBoards(boards.data)
    })()
  }, [])

  const onCardSubmit = (boardId: number, sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { boardId, sectionId, title }
    }).then((response) => {
      let sectionsClone: SectionI[] = [...sections]
      for (let i = 0; i < sectionsClone.length; i++) {
        let section: SectionI = sectionsClone[i]
        if (section.id === sectionId) {
          section.cards.push({
            id: response.data.id,
            title: response.data.title,
            section_id: sectionId,
            board_id: boardId
          })
        }
      }
      setSections(sectionsClone)
    })
  }

  const onBoardClick = async (id: number) => {
    // Ideally, here I would retrieve from the server the cards
    // that correspond with the board the user clicked on
    // const { data } = await axios(`http://localhost:3001/cards/${id}`)
    setBoardId(id)
  }

  const onBoardSubmit = async (title: string) => {
    const { data } = await axios({
      method: 'post',
      url: 'http://localhost:3001/boards',
      data: { title }
    })

    let boardsClone: BoardI[] = [...boards]
    boardsClone.push(data)
    setBoards(boardsClone)
  }

  return (
    <Wrapper>
      <Board onBoardClick={onBoardClick} onBoardSubmit={onBoardSubmit} boards={boards}></Board>
      <BoardContainer>
        {sections.map((section: SectionI) => {
          return (
            <Section
              key={section.id}
              boardId={boardId}
              section={section}
              onCardSubmit={onCardSubmit}
            ></Section>
          )
        })}
      </BoardContainer>
    </Wrapper>
  )
}

export default App
