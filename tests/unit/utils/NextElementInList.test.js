import nextElementInList from '@/utils/NextElementInList'

describe('NextElementInList', () => {
  it('Locates element in the list and returns next element', () => {
    const list = ['A', 'B', 'C', 'D', 'E']
    const value = 'C'
    const result = nextElementInList(list, value)
    expect(result).toBe('D')
  })

  describe('When elemnt is at the end of list', () => {
    it('locates first element of list', () => {
      const list = ['A', 'B', 'C', 'D', 'E']
      const value = 'E'
      const result = nextElementInList(list, value)
      expect(result).toBe('A')
    })
  })
})
