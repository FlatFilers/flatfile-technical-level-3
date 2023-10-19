import React, { useState, ChangeEvent, useRef } from 'react';

interface Card {
  id: number;
  title: string;
  description: string;
  section_id: number;
  image1: string;
  image2: string;
  image3: string
}

interface CardModalProps {
  card: Card;
  onSave: (card: Card) => void;
  onClose: () => void;
 
}

const CardModal: React.FC<CardModalProps> = ({ card, onSave, onClose }) => {
  const [editedCard, setEditedCard] = useState({ ...card });

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedCard({ ...editedCard, title: event.target.value });
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedCard({ ...editedCard, description: event.target.value });
  };
  //define images as flatfile icon
  let [ imageSrc1, setImageSrc1] = useState('https://images.ctfassets.net/hjneo4qi4goj/3W53R0jwfG2hHbOUAjEd0X/a2c5e1d755291408acb30a5a3e71f08e/flatfile-jewel.svg');
  //if there is a fle already, use it
  if (card.image1 && card.image1.length>10){
    imageSrc1 = card.image1
  }
  const handleImageChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
        const file = event.target.files[0];

        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                const base64Image = e.target.result;
                setImageSrc1(base64Image as string);
                setEditedCard({ ...editedCard, image1: base64Image as string });
            }
        };
        reader.readAsDataURL(file);
        }
    }
  };
  const imageInputRef1 = useRef<HTMLInputElement | null>(null);

  const openImageInput1 = () => {
    if (imageInputRef1.current) {
      imageInputRef1.current.click();
    }
  };

  ////
  let [ imageSrc2, setImageSrc2] = useState('https://images.ctfassets.net/hjneo4qi4goj/3W53R0jwfG2hHbOUAjEd0X/a2c5e1d755291408acb30a5a3e71f08e/flatfile-jewel.svg');
  //if there is a fle already, use it
  if (card.image2 && card.image2.length>10){
    imageSrc2 = card.image2
  }
  const handleImageChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
        const file = event.target.files[0];

        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                const base64Image = e.target.result;
                setImageSrc2(base64Image as string);
                setEditedCard({ ...editedCard, image2: base64Image as string });
            }
        };
        reader.readAsDataURL(file);
        }
    }
  };
  const imageInputRef2 = useRef<HTMLInputElement | null>(null);

  const openImageInput2 = () => {
    if (imageInputRef2.current) {
      imageInputRef2.current.click();
    }
  };
////
let [ imageSrc3, setImageSrc3] = useState('https://images.ctfassets.net/hjneo4qi4goj/3W53R0jwfG2hHbOUAjEd0X/a2c5e1d755291408acb30a5a3e71f08e/flatfile-jewel.svg');
//if there is a fle already, use it
if (card.image3 && card.image3.length>10){
  imageSrc3 = card.image3
}
const handleImageChange3 = (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target && event.target.files) {
      const file = event.target.files[0];

      if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
          if (e.target) {
              const base64Image = e.target.result;
              setImageSrc3(base64Image as string);
              setEditedCard({ ...editedCard, image3: base64Image as string });
          }
      };
      reader.readAsDataURL(file);
      }
  }
};
const imageInputRef3 = useRef<HTMLInputElement | null>(null);

const openImageInput3 = () => {
  if (imageInputRef3.current) {
    imageInputRef3.current.click();
  }
};


  const handleSave = () => {
    console.log(editedCard)
    onSave(editedCard);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Card</h2>
        <input type="text" value={editedCard.title} onChange={handleTitleChange} />
        <textarea value={editedCard.description} onChange={handleDescriptionChange} />
        image1:
        <img src={imageSrc1} width = "50" height="50" alt="image1" onClick={openImageInput1} /><br/>
        <input type="file" accept="image/*" id="imageInput1" ref={imageInputRef1} style={{ display: 'none' }} onChange={handleImageChange1}/><br/>
        image2:
        <img src={imageSrc2} width = "50" height="50" alt="image2" onClick={openImageInput2} /><br/>
        <input type="file" accept="image/*" id="imageInput2" ref={imageInputRef2} style={{ display: 'none' }} onChange={handleImageChange2}/>
        image3:
        <img src={imageSrc3} width = "50" height="50" alt="image3" onClick={openImageInput3} /><br/>
        <input type="file" accept="image/*" id="imageInput3" ref={imageInputRef3} style={{ display: 'none' }} onChange={handleImageChange3}/>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CardModal;
