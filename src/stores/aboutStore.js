import { defineStore } from 'pinia'
import * as aboutService from '@/services/aboutService'

const STORAGE_KEY = 'about-store'

export const useAboutStore = defineStore('about', {
  state: () => ({
    abouts: JSON.parse(localStorage.getItem(STORAGE_KEY))?.abouts || [],
    isLoading: false,
    error: null,
  }),

  actions: {
    saveToLocalStorage() {
      const data = {
        abouts: this.abouts,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    },

    async fetchAbouts() {
      this.isLoading = true
      this.error = null
      try {
        const response = await aboutService.aboutGetAll()
        const data = response.data
        const status = response.status
        this.abouts = data
        this.saveToLocalStorage() 
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
        const data = updated.data
        const status = updated.status

        const index = this.abouts.findIndex(a => a.aboutMeId === id)
        if (index !== -1) this.abouts[index] = data // burada updated yerine data olmalı
        this.saveToLocalStorage()
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
        this.saveToLocalStorage()
        return { data, status }
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async uploadImage(base64Image) {
      this.isLoading = true
      this.error = null

      try {
        const imageUrl = await aboutService.uploadBase64Image(base64Image)
        return imageUrl
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    }
  }
})
