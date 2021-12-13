import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'

import Card from './index'

jest.mock('axios')

describe('<Card />', () => {
  afterEach(cleanup)

  it('renders cards successfully', async () => {
    render(<Card card={{ title: 'Write tests' }} />)

    const cardText = await screen.findByText('Write tests')

    expect(cardText.nodeName).toBe('DIV')
  })
})
