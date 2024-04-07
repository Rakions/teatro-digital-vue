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
  precio: number | null
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

export interface Obra {
  obraID: number
  titulo: string
  descripcion: string
  categoriaID: number
  imagen: string
}
