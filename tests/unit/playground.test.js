import { describe, it, expect } from 'vitest'
import { evenOrOdd } from '@/playground.js'

describe('basic math', () => {
  it('adds two numbers', () => {
    expect(1 + 1).toBe(2)
  })

  describe('Even or odd', () => {
    describe('When numner is even', () => {
      it('indicates if the numnber is even', () => {
        expect(evenOrOdd(4)).toBe('Even')
      })
    })
  })
  describe('Even or odd', () => {
    it('indicates if the numnber is odd', () => {
      expect(evenOrOdd(3)).toBe('Odd')
    })
  })
})
