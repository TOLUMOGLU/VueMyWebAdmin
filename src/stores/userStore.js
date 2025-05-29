import { defineStore } from 'pinia';
import * as userService from '@/services/userService';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userName: localStorage.getItem('userName') || '',
  }),
  getters: {
    isLoggedIn: (state) => !!state.token && state.userName !== '',
  },
  actions: {
    async login(username, password) {
      try {
        const { token } = await userService.login(username, password);

        this.token = token;
        this.userName = username; 

        localStorage.setItem('token', token);
        localStorage.setItem('userName', username);

        return true;
      } catch (error) {
        console.error('Giriş başarısız', error);
        return false;
      }
    },
    logout() {
      this.token = null;
      this.userName = '';
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    }
  }
});
