import { defineStore } from 'pinia'

export const useObrasStore = defineStore('obras', {
  state: () => ({
    obras: [],
    isLoading: false,
    cargaExitosa: true,
    funciones: [] as Funcion[]
  }),
  actions: {
    async fetchObrasCategoria(categoria: number) {
      this.isLoading = true
      const url: string = `http://localhost:6949/api/Obra/categoria=${categoria}`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        if (response.status === 400) {
          this.cargaExitosa = false
          throw new Error('Bad request')
        }
        const data = await response.json()
        this.obras = data
        this.cargaExitosa = true
      } catch (error) {
        console.error('Error al cargar las obras:', error)
        this.cargaExitosa = false
      } finally {
        this.isLoading = false
      }
    },
    async fetchObrasById(id: string) {
      this.isLoading = true
      const url: string = `http://localhost:6949/api/Obra/${id}`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        if (response.status === 400) {
          this.cargaExitosa = false
          throw new Error('Bad request')
        }
        const data = await response.json()
        this.obras = data
        this.cargaExitosa = true
      } catch (error) {
        console.error('Error al cargar las obras:', error)
        this.cargaExitosa = false
      } finally {
        this.isLoading = false
      }
    },
    async fetchAllObras() {
      this.isLoading = true
      const url: string = `http://localhost:6949/api/Obra`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        if (response.status === 400) {
          this.cargaExitosa = false
          throw new Error('Bad request')
        }
        const data = await response.json()
        this.obras = data
        this.cargaExitosa = true
      } catch (error) {
        console.error('Error al cargar las obras:', error)
        this.cargaExitosa = false
      } finally {
        this.isLoading = false
      }
    }
  }
})
