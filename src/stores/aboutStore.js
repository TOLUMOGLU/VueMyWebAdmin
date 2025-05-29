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
        this.abouts = await aboutService.aboutGetAll()
      } catch (err) {
        this.error = err
      } finally {
        this.isLoading = false
      }
    },

    async updateAbout(id, aboutData) {
      this.isLoading = true
      this.error = null
      try {
        const updated = await aboutService.aboutUpdate(id, aboutData)
        // Güncellenen kaydı yerelde güncelle
        const index = this.abouts.findIndex(a => a.aboutMeId === id)
        if (index !== -1) this.abouts[index] = updated
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
        await aboutService.aboutDelete(id)
        this.abouts = this.abouts.filter(a => a.aboutMeId !== id)
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    }
  }
})
