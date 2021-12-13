import React from 'react'
import axios from 'axios'
import { render, cleanup, screen } from '@testing-library/react'

import App from './App'

jest.mock('axios')

describe('<App />', () => {
  var mockedJest: jest.Mocked<typeof axios>

  beforeEach(() => {
    mockedJest = axios as jest.Mocked<typeof axios>
    mockedJest.get.mockResolvedValue({
      data: [
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
    })
  })

  afterEach(cleanup)

  it('matches snapshot', async () => {
    const { asFragment } = render(<App />)

    await screen.findAllByText('Backlog')

    expect(asFragment).toMatchSnapshot()
  })

  it('renders sections successfully', async () => {
    render(<App />)

    const backlogText = await screen.findAllByText('Backlog')
    const readyForDevelopmentText = await screen.findAllByText('Ready for Development')

    expect(backlogText[0].nodeName).toBe('DIV')
    expect(readyForDevelopmentText[0].nodeName).toBe('DIV')
  })
})
