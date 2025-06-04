import { defineStore } from "pinia";
import * as contactService from '@/services/contactService'

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchContacts() {
      this.isLoading = true
      this.error = null
      try {
        const response = await contactService.contactGetAll()
        const data = response.data
        const status = response.status
        this.contacts = data
        return { data, status }
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    },}})
