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
