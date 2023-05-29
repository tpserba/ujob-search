import { defineStore } from 'pinia'
import getJobs from '@/api/getJobs.js'
export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGS = 'UNIQUE_ORGS'
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
    }
  }
})
