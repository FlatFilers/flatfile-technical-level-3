import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const CardContainer = styled.div`
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: relative;
  padding: 10px;
  cursor: pointer;
  max-width: 250px;
  margin-bottom: 7px;
  min-width: 230px;
`

const CardTitle = styled.div``

const Card = ({ card: { title, id } }: any) => (
  <Draggable draggableId={id} index={1}>
    {(provided) => (
      <CardContainer
        className='card'
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <CardTitle>{title}</CardTitle>
      </CardContainer>
    )}
  </Draggable>
)

export default Card
