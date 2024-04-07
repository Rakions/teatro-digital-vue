import type { Asiento, Funcion } from '@/utils/interfaces'
import { getToken } from '@/utils/utils'
import type { RequestOptions } from 'https'
import { defineStore } from 'pinia'

export const useAsientosStore = defineStore('asientos', {
  state: () => ({}),
  actions: {
    async reservar(asientos: Asiento[]) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Authorization', 'Bearer ' + getToken())

      asientos.forEach((asiento) => {
        const raw = JSON.stringify({
          funcionID: asiento.funcionID,
          userID: asiento.userID,
          asiento: asiento.asiento
        })

        const requestOptions: RequestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        }

        fetch('http://localhost:6949/api/Reserva', requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error))
      })
    }
  }
})
