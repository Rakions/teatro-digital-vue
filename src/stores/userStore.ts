import { defineStore } from 'pinia'
import type { RegisterParams } from '@/utils/interfaces'

export const useUserStore = defineStore('user', {
  state: () => ({}),
  actions: {
    async registerUser(params: RegisterParams) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({
        nombre: params.nombre,
        apellido: params.apellido,
        email: params.email,
        telefono: params.telefono,
        contra: params.contrasena,
        rol: 0
      })

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      try {
        const response = await fetch('http://localhost:6949/api/Sesion/Registrar', requestOptions)
        const result = await response.json()
        console.log(result)
        return result
      } catch (error) {
        console.error('Error al registrar el usuario:', error)
        throw error
      }
    }
  }
})
