import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Section from './components/section'
import SectionI from './types/section'

import './App.css'
import Card from './components/card'
import CardI from './types/card'

import CardModal from './components/CardModal'


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
  const [selectedCard, setSelectedCard] = useState<CardI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (card: CardI) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/sections').then((response) => {
      // Section order is determined by ID so sort by ID
      const sortedSections = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
      setSections(sortedSections)
    })
  })

  const onCardSubmit = (sectionId: number, title: string, description: string, image1:string, image2:string, image3:string) => {
    console.log('submit new card', title)
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title, description, image1, image2, image3 }
    }).then((response) => {
      let sectionsClone: SectionI[] = [...sections]
      for (let i = 0; i < sectionsClone.length; i++) {
        let section: SectionI = sectionsClone[i]
        if (section.id === sectionId) {
          section.cards.push({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            section_id: sectionId, 
            image1: response.data.image1,
            image2: response.data.image2,
            image3: response.data.image3

          })
          setSections(sectionsClone)
        }
      }
    })
  }

  const saveCardChanges = (card:CardI) => {
    const id = card.id
    const sectionId = card.section_id
    const title = card.title
    const description = card.description
    const image1 = card.image1
    const image2 = card.image2
    const image3 = card.image3
    console.log('save card', card)
    //update the card
    axios({
      method: 'put',
      url: 'http://localhost:3001/cards',
      data: { id, title, description, sectionId, image1,image2, image3 }
    }).then((response) => {
      console.log("response", response)
      
    })
  }


  return (
    <BoardContainer>
       {isModalOpen && (
        <CardModal card={selectedCard as CardI} onSave={saveCardChanges} onClose={closeModal} />
      )} 
      {sections.map((section: SectionI) => {
        return <Section section={section}  openModal={openModal} onCardSubmit={onCardSubmit} ></Section>
      })} 
      
 
    </BoardContainer>
    
    
  )
}

export default App
