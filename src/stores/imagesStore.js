import { defineStore } from 'pinia'
import * as imageService from '@/services/imageService'
import { useUserStore } from './userStore'

const STORAGE_KEY = 'image-store'

export const useImageStore = defineStore('image', {
  state: () => ({
    images: JSON.parse(localStorage.getItem(STORAGE_KEY))?.images || [],
    isLoading: false,
    error: null,
  }),

  actions: {
    saveToLocalStorage() {
      const data = {
        images: this.images,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    },

    async uploadImageFile(file) {
        this.isLoading = true;
        this.error = null;

        try {
           const userStore = useUserStore()
            const token = userStore.token

            const imageUrl = await imageService.uploadImageFile(file, token);  // burada aboutService'den çağrılıyor
            return imageUrl;
        } catch (err) {
            this.error = err;
            throw err;
        } finally {
            this.isLoading = false;
        }
        },

  }
})
