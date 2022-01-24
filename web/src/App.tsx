import './App.css'
import Board from './components/board'
import BoardPicker from './components/board-picker'
import { useEffect, useState } from 'react'
import BoardI from './types/board'
import axios from 'axios'
import SectionI from './types/section'

function App() {
  // const [boardUpdated] = useState<boolean>(false)
  const [selectedBoard, setSelectedBoard] = useState<BoardI>()
  const [boards, setBoards] = useState<BoardI[]>([])

  useEffect(() => {
    axios.get('http://localhost:3001/boards').then((response) => {
      let displayedSections = response.data[0].sections
      // Section order is determined by ID so sort by ID
      const sortedSections = displayedSections.sort((a: SectionI, b: SectionI) => a.id - b.id)
      response.data[0].sections = sortedSections
      setBoards(response.data)
    })
  }, [selectedBoard])

  const onBoardSubmit = (board: BoardI) => {
    setSelectedBoard(board)
  }

  if (selectedBoard != null) {
    return <Board board={selectedBoard} />
  } else {
    return <BoardPicker onBoardSubmit={onBoardSubmit} boards={boards} />
  }
}

export default App
