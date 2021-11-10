import styled from 'styled-components'

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

const CardTitle = styled.p``
// TODO: pass children into data transfer so subtasks transferred
const Card = ({ card: { id, title, section_id, childCards } }: any) => (
  <CardContainer draggable onDragOver={(e) => { e.preventDefault() }} onDragStart={(e) => { e.dataTransfer.setData("text/plain", JSON.stringify({ id, title, section_id })) }} className='card'>
    <CardTitle>{title}</CardTitle>
    {childCards?.length && <span>[icon here]</span>}
  </CardContainer>
)

export default Card
