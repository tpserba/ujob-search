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
    describe('when the user has not selected any orgs', () => {
      it('returns all jobs', () => {
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
        userStore.selectedOrgs = []
        const result = jobsStore.FILTERED_JOBS_BY_ORGS
        expect(result).toEqual([
          {
            organization: 'google'
          },
          {
            organization: 'amazon'
          },
          {
            organization: 'microsoft'
          }
        ])
      })
    })
  })

  describe('FILTERED_JOBS_BY_JOB_TYPES', () => {
    it('identifies jobs that are associated with given job types', () => {
      const jobsStore = useJobsStore()
      jobsStore.jobs = [
        {
          jobType: 'full-time'
        },
        {
          jobType: 'temporary'
        },
        {
          jobType: 'part-time'
        }
      ]
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['full-time', 'part-time']
      const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES
      expect(result).toEqual([
        {
          jobType: 'full-time'
        },
        {
          jobType: 'part-time'
        }
      ])
    })
    describe('when the user has not selected any job types', () => {
      it('returns all jobs', () => {
        const jobsStore = useJobsStore()
        jobsStore.jobs = [
          {
            jobType: 'full-time'
          },
          {
            jobType: 'temporary'
          },
          {
            jobType: 'part-time'
          }
        ]
        const userStore = useUserStore()
        userStore.selectedJobTypes = []
        const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES
        expect(result).toEqual([
          {
            jobType: 'full-time'
          },
          {
            jobType: 'temporary'
          },
          {
            jobType: 'part-time'
          }
        ])
      })
    })
  })
})
