import { render, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import axios from 'axios'

import Spotlight from '@/components/job-search/Spotlight.vue'

vi.mock('axios')

describe('Spotlight', () => {
  it('prodives an image to parent component', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Some img',
          title: 'title',
          description: 'desc'
        }
      ]
    })
    render(Spotlight, {
      slots: {
        // There's only 1 slot without name, so Vue automatically assigns default as name
        default: `<template #slotdefault="slotProps">
        <h1>{{ slotProps.img }}</h1>
        </template>`
      }
    })
    const text = await screen.findByText('Some img')
    expect(text).toBeInTheDocument()
  })

  it('prodives a title to parent component', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Some img',
          title: 'title',
          description: 'desc'
        }
      ]
    })
    render(Spotlight, {
      slots: {
        // There's only 1 slot without name, so Vue automatically assigns default as name
        default: `<template #slotdefault="slotProps">
        <h1>{{ slotProps.title }}</h1>
        </template>`
      }
    })
    const text = await screen.findByText('title')
    expect(text).toBeInTheDocument()
  })

  it('prodives a description to parent component', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Some img',
          title: 'title',
          description: 'desc'
        }
      ]
    })
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
