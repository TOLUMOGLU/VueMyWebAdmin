import { defineStore } from "pinia";
import * as skillsetService from '@/services/skillsetService';

export const useSkillsetStore = defineStore('skillset', {
  state: () => ({
    skillset: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchSkillsets() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await skillsetService.skillsetGetAll();
        this.skillset = response.data;
        return response;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async updateSkillset(id, skillsetData) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await skillsetService.skillsetUpdate(id, skillsetData);
        this.skillset = response.data;
        return response;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteSkillset(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await skillsetService.skillsetDelete(id);
        this.skillset = null;
        return response;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async postSkillset(newData) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await skillsetService.skillsetPost(newData);
        this.skillset = response.data;
        return response;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
