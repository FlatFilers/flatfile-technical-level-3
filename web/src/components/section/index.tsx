import React, { useState } from 'react'
import axios from 'axios'

import Card from '../card'
import SectionI from '../../types/section'

import {
  AddCardButtonDiv,
  AddCardButtonSpan,
  CardComposerDiv,
  CardsContainer,
  ListCardComponent,
  ListCardDetails,
  ListCardTextArea,
  SectionHeader,
  SectionTitle,
  SubmitCardButton,
  SubmitCardButtonDiv,
  WrappedSection,
  Wrapper
} from './styled-components'
import CardI from '../../types/card'


const Section = ({
  section: { id, title, cards },
  onCardSubmit, 
  setSections
}: {
  setSections: React.Dispatch<React.SetStateAction<any>>
  section: SectionI
  onCardSubmit: Function
}) => {
  const [isTempCardActive, setIsTempCardActive] = useState(false)
  const [cardText, setCardText] = useState('')
  // TODO: update to specific type
  function handleDrop(e:any) {
    const droppedIntoCard = e.target.closest('div').classList.contains("card")
    const card = JSON.parse(e.dataTransfer.getData("text"))
    const title = card.title
    const cardId = card.id
    const newSectionId = id
    const prevSectionId = card.section_id
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { section_id:newSectionId, title, id:cardId }
    }).then((response) => {
      // TODO: check for error and inform user if thrown
      // This function is going to end up doing too much, break into smaller chunks
      setSections((prevSections: SectionI[]) => {
        let sectionsClone: SectionI[] = [...prevSections]
        return sectionsClone.reduce((acc:any, section:any) => {
          if(section.id === newSectionId) {
            section.cards.push({id: cardId, title: card.title, section_id: newSectionId})
          }
          if (section.id === prevSectionId) {
            section.cards = section.cards.filter((card:any) => card.id !== cardId)
          }
          acc.push(section)
          return acc
        }, [])
      })
  })
}

function outputCards(cards:any) {
  const uniques = Array.from(new Set(cards));
  console.log("uniques: ", uniques)
  return null
}
outputCards(cards)

  return (
    <Wrapper>
      <WrappedSection>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
        </SectionHeader>
        <CardsContainer onDragOver={(e) => { e.preventDefault() }} onDrop={handleDrop}>
          {cards.length &&
            cards.map((card: CardI) => {
              return <Card key={card.id} card={card}></Card>
            })}
        </CardsContainer>
        {isTempCardActive ? (
          <CardComposerDiv>
            <ListCardComponent>
              <ListCardDetails>
                <ListCardTextArea
                  placeholder='Enter a title for the new card'
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    setCardText(e.target.value)
                  }
                />
              </ListCardDetails>
            </ListCardComponent>
            <SubmitCardButtonDiv>
              <SubmitCardButton
                type='button'
                value='Add card'
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault()

                  if (cardText) {
                    onCardSubmit(id, cardText)
                  }

                  setIsTempCardActive(false)
                }}
              />
            </SubmitCardButtonDiv>
          </CardComposerDiv>
        ) : (
          <AddCardButtonDiv onClick={() => setIsTempCardActive(true)}>
            <AddCardButtonSpan>Add another card</AddCardButtonSpan>
          </AddCardButtonDiv>
        )}
      </WrappedSection>
    </Wrapper>
  )
}

export default Section
