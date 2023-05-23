import nextElementInList from '@/utils/NextElementInList'
import Headline from '@/components/Headline.vue'

describe('Headline', () => {
  describe('Vitest playground', () => {
    it('Tracks whether it has been called', () => {
      const mockFunc = vi.fn()
      mockFunc(1, 2)
      expect(mockFunc).toHaveBeenCalledWith(1, 2)
    })
  })
})
