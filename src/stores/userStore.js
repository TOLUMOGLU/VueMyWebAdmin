import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    userName: '',
    isLoggedIn: false,
  }),
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getisLoggedIn: (state) => {
      return state.token != null && state.userName !== ''
    }
  },
  actions: {
    login(name) {
      this.userName = name;
      this.token = "123456";
      if (this.token.length > 1) {      
        this.isLoggedIn = true;
      }  
    },
    logout() {
      this.userName = '';
      this.token = null;
      this.isLoggedIn = false;
      console.log("geldi");
    }
  }
})
