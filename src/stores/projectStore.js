import { defineStore } from 'pinia'
import * as projectService from '@/services/projectService'
import { useUserStore } from './userStore'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchProjects() {
        this.isLoading = true
        this.error = null
        try {
            const response = await projectService.projectGetAll()
            const data = response.data
            const status = response.status
            this.projects = data
            return { data, status }
        } catch (err) {
            this.error = err
            throw err
        } finally {
            this.isLoading = false
        }
        },


    async updateProject(id, projectData) {
      this.isLoading = true
      this.error = null
      try {
        const userStore = useUserStore()
        const token = userStore.token

        const updated = await projectService.projectUpdate(id, projectData, token)
        const data = updated.data
        const status = updated.status

        const index = this.projects.findIndex(a => a.projectId === id)
        if (index !== -1) this.projects[index] = data
        return { data, status }  
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.isLoading = false
      }
    },


    async postProject(payload) {
      this.isLoading = true
            this.error = null
            try {
              const userStore = useUserStore()
              const token = userStore.token

              const response = await projectService.projectPost(payload, token)
              const data = response.data
              const status = response.status
              this.projects.push(data)
              return { data, status }
            } catch (err) {
              this.error = err
              throw err
            } finally {
              this.isLoading = false
            }
          },

    async deleteProject(id) {
    this.isLoading = true
    this.error = null
    try {
        const userStore = useUserStore()
        const token = userStore.token

        const response = await projectService.projectDelete(id, token)
        const data = response.data
        const status = response.status

        this.projects = this.projects.filter(a => a.projectId !== id)
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
