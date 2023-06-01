import { defineStore } from 'pinia'
export const ADD_SELECTED_ORGS = 'ADD_SELECTED_ORGS'
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES'
export interface UserState {
  isLoggedIn: boolean
  selectedOrgs: string[]
  selectedJobTypes: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedOrgs: [],
    selectedJobTypes: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true
    },
    [ADD_SELECTED_ORGS](orgs: string[]) {
      this.selectedOrgs = orgs
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
      this.selectedJobTypes = jobTypes
    }
  }
})
