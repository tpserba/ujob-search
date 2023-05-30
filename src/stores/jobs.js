import { defineStore } from 'pinia'
import getJobs from '@/api/getJobs.js'
export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGS = 'UNIQUE_ORGS'
import { useUserStore } from '@/stores/user'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'
export const FILTERED_JOBS = 'FILTERED_JOBS'
export const FILTERED_JOBS_BY_ORGS = 'FILTERED_JOBS_BY_ORGS'
export const FILTERED_JOBS_BY_JOB_TYPES = 'FILTERED_JOBS_BY_JOB_TYPES'

export const INCLUDE_JOB_BY_ORG = 'INCLUDE_JOB_BY_ORG'
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: []
  }),
  actions: {
    async [FETCH_JOBS]() {
      this.jobs = await getJobs()
    }
  },
  getters: {
    [UNIQUE_ORGS](state) {
      const uniqueOrgs = new Set()
      state.jobs.forEach((job) => uniqueOrgs.add(job.organization))
      return uniqueOrgs
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set()
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType))
      return uniqueJobTypes
    },
    [INCLUDE_JOB_BY_ORG]: () => (job) => {
      const userStore = useUserStore()
      if (userStore.selectedOrgs.length === 0) {
        return true
      }
      return userStore.selectedOrgs.includes(job.organization)
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job) => {
      const userStore = useUserStore()
      if (userStore.selectedJobTypes.length === 0) {
        return true
      }
      return userStore.selectedJobTypes.includes(job.jobType)
    },
    [FILTERED_JOBS_BY_ORGS](state) {
      const userStore = useUserStore()
      if (userStore.selectedOrgs.length === 0) {
        return state.jobs
      }
      return state.jobs.filter((job) => userStore.selectedOrgs.includes(job.organization))
    },
    [FILTERED_JOBS_BY_JOB_TYPES](state) {
      const userStore = useUserStore()
      if (userStore.selectedJobTypes.length === 0) {
        return state.jobs
      }
      return state.jobs.filter((job) => userStore.selectedJobTypes.includes(job.jobType))
    },
    [FILTERED_JOBS](state) {
      const userStore = useUserStore()

      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORG(job))
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job))
    }
  }
})
