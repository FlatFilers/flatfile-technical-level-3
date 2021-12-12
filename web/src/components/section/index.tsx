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

const Section = ({
  section: { id, title, cards },
  onCardSubmit,
  boardId
}: {
  section: SectionI
  onCardSubmit: Function
  boardId: Number
}) => {
  const [isTempCardActive, setIsTempCardActive] = useState(false)
  const [cardText, setCardText] = useState('')

  return (
    <Wrapper>
      <WrappedSection>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
        </SectionHeader>
        <CardsContainer>
          {cards.length &&
            cards.map((card: CardI) => {
              if (card.board_id === boardId) {
                return <Card key={card.id} card={card}></Card>
              }
              return null
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
                    onCardSubmit(boardId, id, cardText)
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
