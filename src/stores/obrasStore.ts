import type { Funcion } from '@/utils/interfaces'
import { defineStore } from 'pinia'

export const useObrasStore = defineStore('obras', {
  state: () => ({
    obras: [],
    isLoading: false,
    cargaExitosa: true,
    funciones: [] as Funcion[],
    asientos: []
  }),
  actions: {
    async fetchUrl(url: string) {
      this.isLoading = true
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Cache-Control': 'no-cache' }
        })
        if (!response.ok) {
          this.cargaExitosa = false
          throw new Error('Bad request')
        }
        const data = await response.json()
        this.cargaExitosa = true
        return data
      } catch (error) {
        console.error('Error al cargar:', error)
        this.cargaExitosa = false
      } finally {
        this.isLoading = false
      }
    },
    async fetchObrasCategoria(categoria: number) {
      const data = await this.fetchUrl(`http://localhost:6949/api/Obra/categoria/${categoria}`)
      if (data) this.obras = data
    },
    async fetchObrasById(id: number) {
      const data = await this.fetchUrl(`http://localhost:6949/api/Obra/${id}`)
      if (data) this.obras = data
    },
    async fetchAllObras() {
      const data = await this.fetchUrl(`http://api.teatrogaleguista.work.gd/api/Obra`)
      if (data) this.obras = data
    },
    async fetchFunciones() {
      const data = await this.fetchUrl(`http://localhost:6949/api/Funcion`)
      if (data) this.funciones = data
    }
  }
})
