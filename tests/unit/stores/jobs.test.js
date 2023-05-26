import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'
import { vi } from 'vitest'

// Setup
vi.mock('axios')

describe('state', () => {
  beforeEach(() => {
    // Creates single global instance of pinia,
    // setActivePinia registers it in our environment
    setActivePinia(createPinia())
  })
  it('stores job listings', () => {
    const store = useJobsStore()
    console.log(store)
    expect(store.jobs).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    // Creates single global instance of pinia,
    // setActivePinia registers it in our environment
    setActivePinia(createPinia())
  })
  describe('FETCH_JOBS', () => {
    it('make API requests and stores received jobs', async () => {
      axios.get.mockResolvedValue({ data: ['job1', 'job2'] })
      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['job1', 'job2'])
    })
  })
})