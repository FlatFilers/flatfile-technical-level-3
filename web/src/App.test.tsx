import React from 'react'
import axios from 'axios'
import { render, cleanup, screen, act, waitFor } from '@testing-library/react'

import App from './App'
import userEvent from '@testing-library/user-event'

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

    await screen.findByText('Backlog')

    expect(asFragment).toMatchSnapshot()
  })

  it('renders sections successfully', async () => {
    render(<App />)

    const backlogText = await screen.findByText('Backlog')
    const readyForDevelopmentText = await screen.findByText('Ready for Development')

    expect(backlogText.nodeName).toBe('SPAN')
    expect(readyForDevelopmentText.nodeName).toBe('SPAN')
  })

  it('renders cards successfully', async () => {
    render(<App />)

    const cardText = await screen.findByText('Test 1')

    expect(cardText.nodeName).toBe('DIV')
  })

  it('renders modal successfully', async () => {
    render(<App />)

    const cardText = await screen.findByText('Test 1')

    act(() => {
      cardText.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    })

    const modalText = await screen.findByText('Description:')

    expect(modalText.nodeName).toBe('LABEL');
  })

  it('closes rendered modal successfully', async () => {
    render(<App />)

    const cardText = await screen.findByText('Test 1')

    act(() => {
      cardText.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    })

    const closeText = await screen.findByText('Close')

    expect(closeText.nodeName).toBe('BUTTON');

    act(() => {
      closeText.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    })

    const modalText = await screen.queryAllByText('Description:')

    expect(modalText).toHaveLength(0)
    expect(cardText.nodeName).toBe('DIV')
  })

  it('mock uploading image files successfully', async () => {

    const files = [
      new File(['flat'], 'flat.png', {type: 'image/png'}),
      new File(['file'], 'file.png', {type: 'image/png'}),
    ]

    render(<App />)

    const cardText = await screen.findByText('Test 1')

    await act(async () => {
      cardText.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement

    await act((async () => {
      userEvent.upload(input, files)
    }))

    await waitFor(() => {
      expect(input.files).not.toBeNull()
      expect(input.files).toHaveLength(2)
      if (input.files){
        expect(input.files[0]).toStrictEqual(files[0])
        expect(input.files[1]).toStrictEqual(files[1])
      }
    })      
  })  
})
