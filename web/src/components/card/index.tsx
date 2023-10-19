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

const CardTitle = styled.div``
interface CardProps {
  card: { id: number, 
          section_id: number, 
          title: string, 
          description: string , 
          image1: string, 
          image2: string, 
          image3:string};
  onEditClick: (
  ) => void;
}

const Card: React.FC<CardProps> = ({ card: { id,title,description }, onEditClick }) => (
  <CardContainer className='card'>
    <CardTitle>Card: {title}</CardTitle>
    <p>Description: {description}</p>
    <button onClick={onEditClick}>Edit</button>
  </CardContainer>
  
)

export default Card
