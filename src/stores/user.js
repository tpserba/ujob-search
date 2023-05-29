import { defineStore } from 'pinia'
export const ADD_SELECTED_ORGS = 'ADD_SELECTED_ORGS'
export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    selectedOrgs: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true
    },
    [ADD_SELECTED_ORGS](orgs) {
      this.selectedOrgs = orgs
    }
  }
})
