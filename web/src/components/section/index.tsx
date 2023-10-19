import React, { useState } from 'react'

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

interface SectionProps {
  section: SectionI;
  openModal: (card: CardI) => void; // Define openModal prop
  onCardSubmit: Function;
}


const Section: React.FC<SectionProps>= ({
  section: { id, title, cards },
  openModal,
  onCardSubmit
}: {
  section: SectionI,
  openModal: any,
  onCardSubmit: Function
}) => {
  const [isTempCardActive, setIsTempCardActive] = useState(false)
  const [cardText, setCardText] = useState('')
  const [cardDescription, setcardDescription] = useState('')
  


  return (
    <Wrapper>
      <WrappedSection>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
        </SectionHeader>
        <CardsContainer>
          {cards.length &&
            cards.map((card: CardI) => {
              return <Card key={card.id} card={card} onEditClick={() => {
                openModal(card);
                console.log("Edit button clicked", card);
              }}></Card>
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
                <ListCardTextArea
                placeholder='Enter a Description for the new card'
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    setcardDescription(e.target.value)
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
                    onCardSubmit(id, cardText, cardDescription)
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
