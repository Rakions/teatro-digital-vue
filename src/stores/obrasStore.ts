import type { Funcion, Obra } from '@/utils/interfaces'
import type { RequestOptions } from 'https'
import { defineStore } from 'pinia'

export const useObrasStore = defineStore('obras', {
  state: () => ({
    obras: [],
    isLoading: false,
    cargaExitosa: true,
    funciones: [] as Funcion[]
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
      const data = await this.fetchUrl(`http://localhost:6949/api/Obra`)
      if (data) this.obras = data
    },
    async fetchFunciones(obraId: number) {
      const data = await this.fetchUrl(`http://localhost:6949/api/Funcion/obra/` + obraId)
      if (data) this.funciones = data
    },
    async modificarObras(obra: Obra) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMTAxIiwiZW1haWwiOiJ0b3RpdG9tYXJyYW5vMyIsInJvbGUiOiIxIiwibmJmIjoxNzEyNTA0MTI2LCJleHAiOjE3MTI1MTEzMjYsImlhdCI6MTcxMjUwNDEyNiwiaXNzIjoiVGVhdHJvR2FsZWd1aXN0YSIsImF1ZCI6IlVzdWFyaW9zVGVhdHJvR2FsZWd1aXN0YSJ9.4ZqDc5-C9SYinQLU8IbznvH1FDqosgSevlaKF206zdQ'
      )

      const raw = JSON.stringify({
        obraID: obra.obraID,
        titulo: obra.titulo,
        descripcion: obra.descripcion,
        categoriaID: obra.categoriaID,
        imagen: obra.imagen
      })

      const requestOptions: RequestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('http://localhost:6949/api/Obra', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
    }
  }
})
