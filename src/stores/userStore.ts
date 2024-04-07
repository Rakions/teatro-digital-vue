import type { RequestOptions } from 'https'
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
        rol: 1
      })

      const requestOptions: RequestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('http://localhost:6949/api/Sesion/Registrar', requestOptions)
        .then((response) => response.json())
        .then((result) => {})
        .catch((error) => console.error(error))
    }
  }
})
