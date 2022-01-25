import styled from 'styled-components'

export const BoardContainer = styled.div`
  background-color: rgb(49, 121, 186);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #393939;
  overflow-y: hidden;
  overflow-x: auto;
  position: absolute;
  padding: 5px;
  align-items: flex-start;
`
export const BoardName = styled.div`
  padding: 10px;
  margin: 5px;
  background-color: #e3e3e3;
`
export const SubmitBoardButton = styled.input`
  background-color: #5aac44;
  box-shadow: none;
  border: none;
  color: #fff;
  height: 100%;
  cursor: pointer;
`

export const ListCardTextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 54px;
  background-color: #e3e3e3;
  border: none;
  box-shadow: none;
  margin-bottom: 4px;
  max-height: 162px;
  min-height: 54px;
  padding: 0;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  outline: none;
`

export const TextInputDiv = styled.div`
  background-color: #e3e3e3;
`
