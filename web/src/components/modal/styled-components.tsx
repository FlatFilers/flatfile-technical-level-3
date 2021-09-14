import styled from 'styled-components'

export const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`
export const ModalBody = styled.div`
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: absolute;
  width: 50vw;
  margin: 30vh auto;
  left: 0;
  right: 0;

  > form {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 50vw;
    padding: 1rem;

    > label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;

      > input,
      textarea {
        width: 60%;
      }
    }
  }
`
