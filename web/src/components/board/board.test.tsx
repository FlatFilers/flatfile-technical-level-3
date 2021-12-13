import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'

import Board from './index'

describe('<Board />', () => {
  afterEach(cleanup)

  it('renders boards successfully', async () => {
    render(
      <Board
        onBoardClick={() => jest.fn()}
        onBoardSubmit={() => jest.fn()}
        boards={[
          {
            id: 1,
            title: 'Board 1',
            section: []
          }
        ]}
      />
    )

    const boardText = await screen.findByText('Board 1')

    expect(boardText.nodeName).toBe('DIV')
  })
})
