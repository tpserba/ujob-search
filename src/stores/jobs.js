import { defineStore } from 'pinia'
import getJobs from '@/api/getJobs.js'
export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGS = 'UNIQUE_ORGS'
import { useUserStore } from '@/stores/user'
export const FILTERED_JOBS_BY_ORGS = 'FILTERED_JOBS_BY_ORGS'
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
    [FILTERED_JOBS_BY_ORGS](state) {
      const userStore = useUserStore()
      return state.jobs.filter((job) => userStore.selectedOrgs.includes(job.organization))
    }
  }
})
