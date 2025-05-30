import { defineStore } from 'pinia'
import * as aboutService from '@/services/aboutService'

export const useAboutStore = defineStore('about', {
  state: () => ({
    abouts: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchAbouts() {
        this.isLoading = true
        this.error = null
        try {
            const response = await aboutService.aboutGetAll()
            const data = response.data
            const status = response.status
            this.abouts = data
            return { data, status }
        } catch (err) {
            this.error = err
            throw err
        } finally {
            this.isLoading = false
        }
        },


    async updateAbout(id, aboutData) {
      this.isLoading = true
      this.error = null
      try {
        const updated = await aboutService.aboutUpdate(id, aboutData)
        const data = updated.data;
        const status = updated.status;

        const index = this.abouts.findIndex(a => a.aboutMeId === id)
        if (index !== -1) this.abouts[index] = updated
            return { data, status }  
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async deleteAbout(id) {
    this.isLoading = true
    this.error = null
    try {
        const response = await aboutService.aboutDelete(id)
        const data = response.data
        const status = response.status

        this.abouts = this.abouts.filter(a => a.aboutMeId !== id)
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
