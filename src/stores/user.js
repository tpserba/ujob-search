import { defineStore } from 'pinia'
export const ADD_SELECTED_ORGS = 'ADD_SELECTED_ORGS'
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES'
export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    selectedOrgs: [],
    selectedJobTypes: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true
    },
    [ADD_SELECTED_ORGS](orgs) {
      this.selectedOrgs = orgs
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes) {
      this.selectedJobTypes = jobTypes
    }
  }
})
