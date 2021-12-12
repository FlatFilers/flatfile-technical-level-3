import styled from 'styled-components'

export const Wrapper = styled.div`
  display: inline-block;
  overflow-x: scroll;
  height: 100%;
  width: 100%;
  vertical-align: top;
  white-space: normal;
  background-color: #e3e3e3;
`

export const WrappedSection = styled.section`
  width: 100%;
  border-radius: 3px;
  margin: 5px;
  padding: 10px 0;
  position: relative;
  height: auto;
  max-height: 90%;
`

export const SectionHeader = styled.header`
  display: flex;
  flex-direction: row;
`

export const SectionTitle = styled.span`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  cursor: grab;
  width: 70%;
`

export const BoardsContainer = styled.div`
  display: flex;
  margin-top: 10px;
`

export const BoardDiv = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  min-width: 280px;
  min-height: 50px;
  padding: 10px;
  margin: 5px;
  :hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
`

export const AddBoardButtonDiv = styled.div`
  padding: 10px;
  min-height: 24px;
  max-height: 24px;
  cursor: pointer;
  :hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
`

export const AddBoardButtonSpan = styled.span`
  color: #5e6c84;
`

export const BoardComposerDiv = styled.div``

export const ListBoardComponent = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
`

export const ListBoardDetails = styled.div`
  overflow: hidden;
  padding: 6px 8px 2px;
  position: relative;
`

export const ListBoardTextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 54px;
  background: none;
  border: none;
  box-shadow: none;
  margin-bottom: 4px;
  max-height: 162px;
  min-height: 54px;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  outline: none;
`

export const SubmitBoardButtonDiv = styled.div`
  height: 32px;
`

export const SubmitBoardButton = styled.input`
  background-color: #5aac44;
  box-shadow: none;
  border: none;
  color: #fff;
  height: 100%;
  cursor: pointer;
`
