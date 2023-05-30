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

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [{ jobType: 'full-time' }, { jobType: 'temp' }, { jobType: 'full-time' }]
      const result = store.UNIQUE_JOB_TYPES
      expect(result).toEqual(new Set(['full-time', 'temp']))
    })
  })

  describe('INCLUDE_JOB_BY_ORG', () => {
    describe('when user has not selected any orgs', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedOrgs = []

        const store = useJobsStore()
        const job = { organization: 'google' }
        const result = store.INCLUDE_JOB_BY_ORG(job)

        expect(result).toBe(true)
      })

      it('identifies if job is associated with given orgs', () => {
        const userStore = useUserStore()
        userStore.selectedOrgs = ['google', 'microsoft']

        const store = useJobsStore()
        const job = { organization: 'google' }
        const result = store.INCLUDE_JOB_BY_ORG(job)

        expect(result).toBe(true)
      })
    })
  })
  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when user has not selected any job type', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []

        const store = useJobsStore()
        const job = { jobType: 'full-time' }
        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)

        expect(result).toBe(true)
      })

      it('identifies if job is associated with given job type', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = ['full-time', 'part-time']

        const store = useJobsStore()
        const job = { jobType: 'part-time' }
        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)

        expect(result).toBe(true)
      })
    })
  })
})
