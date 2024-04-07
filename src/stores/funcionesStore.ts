import { defineStore } from 'pinia'
import { getToken } from '@/utils/utils'
import type { CreateFuncion, Funcion } from '@/utils/interfaces'

export const useFuncionesStore = defineStore('funciones', {
  state: () => ({
    funciones: []
  }),
  actions: {
    async getAllFunciones() {
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer ' + getToken())

      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }

      try {
        const response = await fetch('http://localhost:6949/api/Funcion', requestOptions)
        const result = await response.json()
        this.funciones = result
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async createFuncion(funcion: CreateFuncion) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMTE3IiwiZW1haWwiOiJhZG1pbjJAZ21haWwuY29tIiwicm9sZSI6IjEiLCJuYmYiOjE3MTI1MTU0MjgsImV4cCI6MTcxMjUyMjYyOCwiaWF0IjoxNzEyNTE1NDI4LCJpc3MiOiJUZWF0cm9HYWxlZ3Vpc3RhIiwiYXVkIjoiVXN1YXJpb3NUZWF0cm9HYWxlZ3Vpc3RhIn0.jU3ECvgcfE2nI2Z6n36Yij0Blg3ciGLMRGQ9JcBqR8g'
      )

      const raw = JSON.stringify({
        obraID: funcion.obraID,
        salaID: funcion.salaID,
        fechaHora: funcion.fechaHora,
        precio: funcion.precio
      })

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      try {
        const response = await fetch('http://localhost:6949/api/Funcion', requestOptions)
        const result = await response.json()
        return result
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async updateFunciones(funcion: Funcion) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Authorization', 'Bearer ' + getToken())

      const raw = JSON.stringify({
        funcionID: funcion.funcionID,
        obraID: funcion.obraID,
        salaID: funcion.salaID,
        fechaHora: funcion.fechaHora,
        precio: funcion.precio
      })

      const requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      await fetch('http://localhost:6949/api/Funcion', requestOptions)
    }
  }
})
