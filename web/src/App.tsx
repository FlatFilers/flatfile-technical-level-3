import { useState, useEffect } from 'react'
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd'
import styled from 'styled-components'
import axios from 'axios'

import Section from './components/section'
import SectionI from './types/section'

import './App.css'
import { title } from 'process'

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

  const reorder = (list: SectionI[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }
  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items: SectionI[] = reorder(sections, result.source.index, result.destination.index)

    setSections(items)
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
