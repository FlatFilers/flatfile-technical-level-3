import { useState, useEffect } from 'react'
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd'
import styled from 'styled-components'
import axios from 'axios'

import Section from './components/section'
import SectionI from './types/section'

import './App.css'

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

  useEffect(() => {
    axios.get('http://localhost:3001/sections').then((response) => {
      // Section order is determined by ID so sort by ID
      const sortedSections = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
      setSections(sortedSections)
    })
  })

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null

    if (source.droppableId === destination.droppableId && destination.index === source.index)
      return null

      const start = sections[Number(source.droppableId)]
      const end = sections[Number(destination.droppableId)]

      if (start === end){
        const newCards= start.cards.filter((_: any, idx: number) => idx !== source.index)

        newCards.splice(destination.index, 0, start.cards[source.index])

        const newSection = {
          id: start.id,
          cards: newCards
        }

        setSections(state => ({...state, [newSection.id]: newSection}))
        return null 
      } else {
        const newStartCards = start.cards.filter(
          (_: any, idx: number) => idx !== source.index
        )
        const newStartSection = {
          id: start.id,
          cards: newStartCards
        }

        const newEndCards = end.cards
        newEndCards.splice(destination.index, 0, start.cards[source.index])

        const newEndSection = {
          id: end.id,
          cards: newEndCards
        }

        setSections(state => ({
          ...state,
          [newStartSection.id]: newStartSection,
          [newEndSection.id]: newEndSection
        }))
return null
        
      }
    }


  const onCardSubmit = (sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title }
    }).then((response) => {
      let sectionsClone: SectionI[] = [...sections]
      for (let i = 0; i < sectionsClone.length; i++) {
        let section: SectionI = sectionsClone[i]
        if (section.id == sectionId) {
          section.cards.push({
            id: response.data.id,
            title: response.data.title,
            section_id: sectionId
          })
          setSections(sectionsClone)
        }
      }
    })
  }

  return (
    <BoardContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        {sections.map((section: SectionI) => {
          return <Section section={section} onCardSubmit={onCardSubmit}></Section>
        })}
      </DragDropContext>
    </BoardContainer>
  )
}

export default App
