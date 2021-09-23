import { useState } from 'react'
import styled from 'styled-components'
import { CardModal } from './modal'

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

function Card({ card: { title, id } }: { card: { title: string, id: number } }): JSX.Element {
    
    const [modal, setModal] = useState<boolean>(false)

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    return (
        <CardContainer className='card' onClick={openModal}>
            <CardTitle>{title}</CardTitle>
            { modal && <CardModal id={id} open={modal} handleModal={closeModal}/> }
        </CardContainer>
    )
}


export default Card
