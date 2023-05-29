import { render, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import axios from 'axios'

import Spotlight from '@/components/job-search/Spotlight.vue'

vi.mock('axios')

describe('Spotlight', () => {
  const mockSpotlightResponse = (spotlight = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Some img',
          title: 'title',
          description: 'desc',
          ...spotlight
        }
      ]
    })
  }
  it('prodives an image to parent component', async () => {
    mockSpotlightResponse({ img: 'someImg' })
    render(Spotlight, {
      slots: {
        // There's only 1 slot without name, so Vue automatically assigns default as name
        default: `<template #slotdefault="slotProps">
        <h1>{{ slotProps.img }}</h1>
        </template>`
      }
    })
    const text = await screen.findByText('someImg')
    expect(text).toBeInTheDocument()
  })

  it('prodives a title to parent component', async () => {
    mockSpotlightResponse({ title: 'someTitle' })
    render(Spotlight, {
      slots: {
        // There's only 1 slot without name, so Vue automatically assigns default as name
        default: `<template #slotdefault="slotProps">
        <h1>{{ slotProps.title }}</h1>
        </template>`
      }
    })
    const text = await screen.findByText('someTitle')
    expect(text).toBeInTheDocument()
  })

  it('prodives a description to parent component', async () => {
    mockSpotlightResponse()
    render(Spotlight, {
      slots: {
        // There's only 1 slot without name, so Vue automatically assigns default as name
        default: `<template #slotdefault="slotProps">
        <h1>{{ slotProps.description }}</h1>
        </template>`
      }
    })
    const text = await screen.findByText('desc')
    expect(text).toBeInTheDocument()
  })
})
