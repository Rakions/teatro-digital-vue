import type { Asiento, Funcion } from '@/utils/interfaces'
import type { RequestOptions } from 'https'
import { defineStore } from 'pinia'

export const useAsientosStore = defineStore('asientos', {
  state: () => ({}),
  actions: {
    async reservar(asientos: Asiento[]) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMTAxIiwiZW1haWwiOiJ0b3RpdG9tYXJyYW5vMyIsInJvbGUiOiIxIiwibmJmIjoxNzEyNDIyMTA4LCJleHAiOjE3MTI0MjkzMDgsImlhdCI6MTcxMjQyMjEwOCwiaXNzIjoiVGVhdHJvR2FsZWd1aXN0YSIsImF1ZCI6IlVzdWFyaW9zVGVhdHJvR2FsZWd1aXN0YSJ9.ICwWTi1RCDJlSNeVIj5eA_NxaiHTcooUYYDvTvNW-OE'
      )

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
