import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'

const Uploader = ({ id }: { id: number }): JSX.Element => {
  const [images, setImages] = useState<FileList>()

  const handleImageInput = (val: ChangeEvent<HTMLInputElement>) => {
    if (val.target.files && val.target.files.length < 4) {
      setImages(val.target.files)
    }
  }

  const handleSubmit = (val: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (images) {
      const formData = new FormData()

      for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i])
      }

      axios.post(`http://localhost:3001/images/${id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }

  return (
    <form>
      <label>
        Upload Image: &nbsp;
        <input
          type='file'
          id={`file-${id}`}
          accept='image/png, image/jpeg'
          multiple
          onChange={(event) => handleImageInput(event)}
        />
      </label>
      <button type='button' onClick={(event) => handleSubmit(event)}>
        Upload
      </button>
    </form>
  )
}

export { Uploader }
