import SectionI from '../../types/section'
import Section from '../section'
import { BoardContainer, BoardName } from './styled-components'
import axios from 'axios'
import BoardI from '../../types/board'

const Board = ({ board }: { board: BoardI }) => {
  const onCardSubmit = (sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title }
    }).then((response) => {
      console.log('running thins')
      let sections: SectionI[] = board.sections
      for (let i = 0; i < sections.length; i++) {
        let section: SectionI = sections[i]
        if (section.id == sectionId) {
          section.cards.push({
            id: response.data.id,
            title: response.data.title,
            section_id: sectionId
          })
        }
      }
      board.sections = sections
    })
  }

  return (
    <BoardContainer>
      <BoardName>{board && board.title}</BoardName>
      {board.sections &&
        board.sections.length > 0 &&
        board.sections.map((section: SectionI) => {
          return <Section key={section.id} section={section} onCardSubmit={onCardSubmit} />
        })}
    </BoardContainer>
  )
}

export default Board
