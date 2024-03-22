import { defineStore } from 'pinia'

export const useFuncionStore = defineStore('funciones', {
  state: () => ({
    asientos: []
  }),
  actions: {
    async fetchUrl(url: string) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Cache-Control': 'no-cache' }
        })
        if (!response.ok) {
          throw new Error('Bad request')
        }
        const data = await response.json()
        return data
      } catch (error) {
        console.error('Error al cargar:', error)
      }
    }
  }
})

export default useFuncionStore
