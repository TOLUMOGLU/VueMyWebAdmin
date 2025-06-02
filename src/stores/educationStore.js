import { defineStore } from "pinia";
import * as educationService from '@/services/educationService'

export const useEducationStore = defineStore('education', {
  state: () => ({
    educations: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchEducations() {
      this.isLoading = true
      this.error = null
      try {
        const response = await educationService.educationGetAll()
        const data = response.data
        const status = response.status
        this.educations = data
        return { data, status }
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async updateEducation(id, educationData) {
      this.isLoading = true
      this.error = null
      try {
        const response = await educationService.educationUpdate(id, educationData)
        const data = response.data
        const status = response.status

        const index = this.educations.findIndex(edu => edu.educationId === id)
        if (index !== -1) {
          this.educations[index] = data
        }

        return { data, status }
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async deleteEducation(id) {
      this.isLoading = true
      this.error = null
      try {
        const response = await educationService.educationDelete(id)
        const data = response.data
        const status = response.status

        this.educations = this.educations.filter(edu => edu.educationId !== id)
        return { data, status }
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async postEducation(newEducationData) {
      this.isLoading = true
            this.error = null
            try {
              const response = await educationService.educationPost(newEducationData)
              const data = response.data
              const status = response.status
              this.educations.push(data)
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
