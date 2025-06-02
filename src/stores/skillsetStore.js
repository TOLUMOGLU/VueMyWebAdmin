import { defineStore } from "pinia";
import * as skillsetService from '@/services/skillsetService';

export const useSkillsetStore = defineStore('skillset', {
  state: () => ({
    experiences: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchSkillsets() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await skillsetService.skillsetGetAll();
        const data = response.data;
        const status = response.status;
        this.experiences = data;
        return { data, status };
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
        const data = response.data;
        const status = response.status;

        const index = this.experiences.findIndex(exp => exp.experienceId === id);
        if (index !== -1) {
          this.experiences[index] = data;
        }

        return { data, status };
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
        const data = response.data;
        const status = response.status;

        this.experiences = this.experiences.filter(exp => exp.experienceId !== id);
        return { data, status };
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async postSkillset(newExperienceData) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await skillsetService.skillsetPost(newExperienceData);
        const data = response.data;
        const status = response.status;
        this.experiences.push(data);
        return { data, status };
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
