import React from 'react'
import axios from 'axios'
import { render, cleanup, screen } from '@testing-library/react'

import App from './App'

jest.mock('axios')

describe('<App />', () => {
  let mockedJest: jest.Mocked<typeof axios>
  const TEST_BOARD_TWO = '2 test board 2'
  const TEST_BOARD_ONE = '1 test board 1'

  beforeEach(() => {
    mockedJest = axios as jest.Mocked<typeof axios>
    mockedJest.get.mockResolvedValue({
      data: [
        {
          title: TEST_BOARD_ONE,
          sections: [
            {
              id: 1,
              title: 'Backlog',
              cards: [
                {
                  id: 1,
                  title: 'Test 1',
                  section_id: 1
                }
              ]
            },
            {
              id: 2,
              title: 'Ready for Development',
              cards: []
            }
          ]
        },
        {
          title: TEST_BOARD_TWO,
          sections: [
            {
              id: 1,
              title: 'Backlog',
              cards: [
                {
                  id: 1,
                  title: 'Test 1',
                  section_id: 1
                }
              ]
            },
            {
              id: 2,
              title: 'Ready for Development',
              cards: []
            }
          ]
        }
      ]
    })
  })

  afterEach(cleanup)

  it('matches snapshot', async () => {
    const { asFragment } = render(<App />)
    await screen.findByText(TEST_BOARD_ONE).then((value) => value.click())

    await screen.findByText('Backlog')

    expect(asFragment).toMatchSnapshot()
  })

  it('displays all board names', async () => {
    render(<App />)
    await screen.findByText(TEST_BOARD_ONE)
    await screen.findByText(TEST_BOARD_TWO)
  })

  it('renders sections successfully', async () => {
    render(<App />)
    await screen.findByText(TEST_BOARD_ONE).then((value) => value.click())

    const backlogText = await screen.findByText('Backlog')
    const readyForDevelopmentText = await screen.findByText('Ready for Development')

    expect(backlogText.nodeName).toBe('SPAN')
    expect(readyForDevelopmentText.nodeName).toBe('SPAN')
  })

  it('renders cards successfully', async () => {
    render(<App />)
    await screen.findByText(TEST_BOARD_ONE).then((value) => value.click())

    const cardText = await screen.findByText('Test 1')

    expect(cardText.nodeName).toBe('DIV')
  })
})
