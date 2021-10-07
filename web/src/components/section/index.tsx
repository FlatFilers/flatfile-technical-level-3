import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
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
  onCardSubmit
}: {
  section: SectionI
  onCardSubmit: Function
}) => {
  const [isTempCardActive, setIsTempCardActive] = useState(false)
  const [cardText, setCardText] = useState('')

  return (
    <Wrapper>
      <Droppable droppableId={title}>
        {(provided) => (
          <WrappedSection>
            <SectionHeader>
              <SectionTitle>{title}</SectionTitle>
            </SectionHeader>
            <CardsContainer ref={provided.innerRef} {...provided.droppableProps}>
              {cards.length &&
                cards.map((card: CardI) => {
                  return <Card key={card.id} card={card}></Card>
                })}
              {provided.placeholder}
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
        )}
      </Droppable>
    </Wrapper>
  )
}

export default Section
