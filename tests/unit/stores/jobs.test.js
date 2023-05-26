import { createPinia, setActivePinia } from 'pinia'

import { useJobsStore } from '@/stores/jobs'

describe('state', () => {
  beforeEach(() => {
    // Creates single global instance of pinia,
    // setActivePinia registers it in our environment
    setActivePinia(createPinia())
  })
  it('stores job listings', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
})
