import { defineStore } from "pinia";
import * as experienceService from '@/services/experienceServise'

export const useExperienceStore = defineStore('experience', {
  state: () => ({
    experiences: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchExperiences() {
      this.isLoading = true
      this.error = null
      try {
        const response = await experienceService.aboutGetAll()
        const data = response.data
        const status = response.status
        this.experiences = data
        return { data, status }
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async updateExperience(id, experienceData) {
      this.isLoading = true
      this.error = null
      try {
        const response = await experienceService.updateExperience(id, experienceData)
        const data = response.data
        const status = response.status

        // Dizideki eski kaydı güncelle
        const index = this.experiences.findIndex(exp => exp.experienceId === id)
        if (index !== -1) {
          this.experiences[index] = data
        }

        return { data, status }
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async deleteExperience(id) {
      this.isLoading = true
      this.error = null
      try {
        const response = await experienceService.aboutDelete(id)
        const data = response.data
        const status = response.status

        // Diziden sil
        this.experiences = this.experiences.filter(exp => exp.experienceId !== id)
        return { data, status }
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    }
  }
})
