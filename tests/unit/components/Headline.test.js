import nextElementInList from '@/utils/NextElementInList'
import Headline from '@/components/Headline.vue'
import { render, screen } from '@testing-library/vue'
import { vi } from 'vitest'

describe('Headline', () => {
  describe('Vitest playground', () => {
    it('Displays introductory action verb', () => {
      // Replaces time related functions with mock functions
      vi.useFakeTimers()
      render(Headline)

      const actionPhrase = screen.getByRole('heading', {
        name: /build for everyone/i
      })
      expect(actionPhrase).toBeInTheDocument()
      // Reverts back to normal
      vi.useRealTimers()
    })
  })

  it('Changes action verb at a consistent interval', () => {
    vi.useFakeTimers()
    const mockFunc = vi.fn()
    vi.stubGlobal('setInterval', mockFunc)
    render(Headline)

    expect(mockFunc).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
