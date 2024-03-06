import { defineStore } from 'pinia'

export const useObrasStore = defineStore('obras', {
  state: () => ({
    obras: [],
    isLoading: false
  }),
  actions: {
    async fetchObras(categoria: number) {
      this.isLoading = true
      const url: string = `http://localhost:6949/api/Obra/categoria=${categoria}`
      try {
        const response = await fetch(url, {
          method: 'GET', // o 'POST', 'PUT', 'DELETE', etc., según tu necesidad
          headers: {
            // tus cabeceras aquí
            // 'Content-Type': 'application/json' // Comentado porque no-cors limita los tipos de contenido.
          }
        })
        const data = await response.text()
        console.log(data)
      } catch (error) {
        console.error('Error fetching obras:', error)
        this.obras = []
      } finally {
        this.isLoading = false
      }
    }
  }
})
