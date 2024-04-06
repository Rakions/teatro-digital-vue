export interface Star {
  x: number
  y: number
  size: number
  speed: number
}

export interface Funcion {
  funcionID: number
  obraID: number
  salaID: number
  fechaHora: string
  precio: number | null // Uso 'number | null' porque dijiste que el precio puede ser null
}

export interface Reserva {
  reservaID: number
  funcionID: number
  userID: number
  asiento: number
}
export interface Asiento {
  reservaID: number
  funcionID: number
  userID: number
  asiento: number
}
