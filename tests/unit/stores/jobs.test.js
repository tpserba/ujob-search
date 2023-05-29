import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'
import { vi } from 'vitest'
import { useUserStore } from '@/stores/user'
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

describe('getters', () => {
  beforeEach(() => {
    // Creates single global instance of pinia,
    // setActivePinia registers it in our environment
    setActivePinia(createPinia())
  })
  describe('UNIQUE_ORGS', () => {
    it('finds unique organizations from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        {
          organization: 'google'
        },
        {
          organization: 'amazon'
        },
        {
          organization: 'google'
        }
      ]
      const result = store.UNIQUE_ORGS
      expect(result).toEqual(new Set(['google', 'amazon']))
    })
  })

  describe('FILTERED_JOBS_BY_ORGS', () => {
    it('identifies jobs that are associated with the given organizations', () => {
      const jobsStore = useJobsStore()
      jobsStore.jobs = [
        {
          organization: 'google'
        },
        {
          organization: 'amazon'
        },
        {
          organization: 'microsoft'
        }
      ]
      const userStore = useUserStore()
      userStore.selectedOrgs = ['google', 'microsoft']
      const result = jobsStore.FILTERED_JOBS_BY_ORGS
      expect(result).toEqual([
        {
          organization: 'google'
        },
        {
          organization: 'microsoft'
        }
      ])
    })
  })
})
