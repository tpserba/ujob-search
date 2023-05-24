import { nextTick } from 'vue'
import Headline from '@/components/job-search/Headline.vue'
import { render, screen } from '@testing-library/vue'
import { vi } from 'vitest'

describe('Headline', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  describe('Vitest playground', () => {
    it('Displays introductory action verb', () => {
      render(Headline)

      const actionPhrase = screen.getByRole('heading', {
        name: /build for everyone/i
      })
      expect(actionPhrase).toBeInTheDocument()
    })
  })

  it('Changes action verb at a consistent interval', () => {
    const mockFunc = vi.fn()
    vi.stubGlobal('setInterval', mockFunc)
    render(Headline)
    expect(mockFunc).toHaveBeenCalled()
  })

  it('Swaps action verb after interval', async () => {
    render(Headline)
    vi.advanceTimersToNextTimer()
    await nextTick()
    const actionPhrase = screen.getByRole('heading', {
      name: /create for everyone/i
    })
    expect(actionPhrase).toBeInTheDocument()
  })

  it('Removes interval when component disappears', () => {
    const clearInterval = vi.fn()
    vi.stubGlobal('clearInterval', clearInterval)
    const { unmount } = render(Headline)
    unmount()
    expect(clearInterval).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
