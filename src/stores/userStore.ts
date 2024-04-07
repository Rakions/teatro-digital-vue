import { defineStore } from 'pinia'
import type { RegisterParams, Usuario } from '@/utils/interfaces'

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
        rol: 1
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
        return result
      } catch (error) {
        console.error('Error al registrar el usuario:', error)
        throw error
      }
    },
    async loginUser(user: Usuario) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({
        userID: user.userID,
        email: user.email,
        contra: user.contra,
        token: user.token,
        fechaInicio: user.fechaInicio,
        ip: user.ip,
        dispositivo: user.dispositivo
      })

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      try {
        const response = await fetch('http://localhost:6949/api/Sesion/Iniciar', requestOptions)
        const result = await response.json()
        return result
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        throw error
      }
    }
  }
})
