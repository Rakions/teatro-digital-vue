import { defineStore } from 'pinia'

export const useObrasStore = defineStore('obras', {
  state: () => ({
    obras: [],
    isLoading: false
  }),
  actions: {
    async fetchObrasCategoria(categoria: number) {
      this.isLoading = true
      const url: string = `http://localhost:6949/api/Obra/categoria=${categoria}`
      try {
        const response = await fetch(url)
        const data = await response.json()
        this.obras = data
      } catch (error) {
        console.error('Error al cargar las obras:', error)
        this.obras = []
      } finally {
        this.isLoading = false
      }
    },
    async fetchObrasById(id: number) {
      this.isLoading = true
      const url: string = `http://localhost:6949/api/Obra/${id}`
      try {
        const response = await fetch(url)
        const data = await response.json()
        this.obras = data
      } catch (error) {
        console.error('Error al cargar las obras:', error)
        this.obras = []
      } finally {
        this.isLoading = false
      }
    }
  }
})
