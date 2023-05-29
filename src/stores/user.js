import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    selectedOrgs: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true
    }
  }
})
