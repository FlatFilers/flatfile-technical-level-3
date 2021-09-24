import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Uploader } from './image'
import CardDetailsI from '../../types/card-details'

const CardModal = ({
  id,
  open,
  handleModal,
  handleTitle
}: {
  id: number
  open: boolean
  handleModal: any
  handleTitle: any
}): JSX.Element => {
  const [details, setDetails] = useState<CardDetailsI>()
  const [images, setImages] = useState<string[]>()

  const [modal, setModal] = useState<boolean>(open)
  const [editTitle, setEditTitle] = useState<boolean>(false)
  const [editDescription, setEditDescription] = useState<boolean>(false)

  useEffect(() => {
    axios.get(`http://localhost:3001/cards/${id}`).then((response) => {
      const prepDetail: CardDetailsI = {
        id: response.data.id,
        title: response.data?.title ?? '',
        description: response.data?.description ?? ''
      }
      setDetails(prepDetail)
      handleTitle(prepDetail.title)
    })

    axios.get(`http://localhost:3001/images/${id}`).then((response) => {
      if (response.data && response.data.length) {
        setImages(response.data.map((item: any) => item.name))
      }
    })
  }, [id, handleTitle])

  useEffect(() => {
    if (!modal) {
      handleModal()
    }
  }, [modal, handleModal])

  const closeModal = () => {
    setModal(false)
  }

  const handleEditTitle = (val: React.ChangeEvent<HTMLInputElement>) => {
    val.preventDefault()

    if (details) {
      const tempDetails: CardDetailsI = {
        id: details.id,
        title: val.currentTarget.value,
        description: details.description
      }

      setDetails(tempDetails)
    }
  }

  const handleEditDescription = (val: React.ChangeEvent<HTMLTextAreaElement>) => {
    val.preventDefault()

    if (details) {
      const tempDetails: CardDetailsI = {
        id: details.id,
        title: details.title,
        description: val.currentTarget.value
      }

      setDetails(tempDetails)
    }
  }

  const handleUpdate = () => {
    if (details) {
      axios
        .post(`http://localhost:3001/cards/${id}`, {
          card: details
        })
        .then((response) => {
          handleTitle(response.data.title)
        })
    }

    closeModal()
  }

  return details && modal ? (
    <Modal
      show={modal}
      onHide={closeModal}
      animation={true}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter' onClick={() => setEditTitle(true)}>
          {editTitle ? (
            <input value={details.title} onChange={(e) => handleEditTitle(e)} />
          ) : (
            <>{details.title}</>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body onClick={() => setEditDescription(true)}>
        <label> Description: </label>
        <br />
        {editDescription ? (
          <textarea
            value={details.description}
            style={{ height: '100px', width: '100%' }}
            onChange={(e) => handleEditDescription(e)}
          />
        ) : (
          <>{details.description}</>
        )}

        <br />
        {images &&
          images.map((image) => (
            <img
              key={image}
              src={`http://localhost:3001/images/path/${image}`}
              alt=''
              width='120'
              height='120'
              style={{ padding: '2px' }}
            />
          ))}
        <Uploader id={id} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Close
        </Button>
        {(editTitle || editDescription) && (
          <Button variant='primary' onClick={handleUpdate}>
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  ) : (
    <></>
  )
}

export { CardModal }
