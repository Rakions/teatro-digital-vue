import { defineStore } from 'pinia'
import type { RegisterParams, Usuario, UsuarioUpdate } from '@/utils/interfaces'
import { getToken } from '@/utils/utils'

export const useUserStore = defineStore('user', {
  state: () => ({
    usuarios: []
  }),
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
        const response = await fetch(
          'http://api.teatrogaleguista.work.gd/api/Sesion/Registrar',
          requestOptions
        )
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
        token: user.token
      })

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      try {
        const response = await fetch(
          'http://api.teatrogaleguista.work.gd/api/Sesion/Iniciar',
          requestOptions
        )
        const result = await response.json()
        return result
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        throw error
      }
    },
    async getUserByToken() {
      const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
      }
      try {
        const reponse = await fetch(
          'http://api.teatrogaleguista.work.gd/api/Sesion/usuario/' + getToken(),
          requestOptions
        )
        const result = await reponse.json()
        return result
      } catch (error) {
        console.error('Error al buscar el usuario')
        throw error
      }
    },
    async fetchAllUsers() {
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer ' + getToken())

      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }

      try {
        const response = await fetch(
          'http://api.teatrogaleguista.work.gd/api/Usuario',
          requestOptions
        )
        const result = await response.json()
        this.usuarios = result
      } catch (error) {
        console.error('Error al cargar los usuarios')
        throw error
      }
    },
    async actualizaUser(usuario: UsuarioUpdate) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Authorization', 'Bearer ' + getToken())

      const raw = JSON.stringify({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        contra: usuario.contra,
        rol: usuario.rol
      })

      const requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      try {
        const response = await fetch(
          'http://api.teatrogaleguista.work.gd/api/Usuario',
          requestOptions
        )
        const result = await response.json()
        return result
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
})
