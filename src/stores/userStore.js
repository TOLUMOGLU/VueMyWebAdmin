import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: '',
    isLoggedIn: false,
  }),
  actions: {
    login(name) {
      this.userName = name
      this.isLoggedIn = true
    },
    logout() {
      this.userName = ''
      this.isLoggedIn = false
    }
  }
})
