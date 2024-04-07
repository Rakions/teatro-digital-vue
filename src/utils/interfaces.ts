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
  precio: number
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

export interface RegisterParams {
  nombre: string
  apellido: string
  email: string
  telefono: string
  contrasena: string
  rol: 0 | 1
}

export interface Usuario {
  userID: number
  email: string
  contra: string
  token: ''
  fechaInicio: ''
  ip: ''
  dispositivo: ''
}

export interface UsuarioFetchDashboard {
  nombre: string
  apellido: string
  email: string
  telefono: string
  rol: number
  userID: number
}

export interface UsuarioUpdate {
  nombre: string
  apellido: string
  email: string
  telefono: string
  contra: string
  rol: 0 | 1
}

export interface CreateFuncion {
  obraID: number
  salaID: number
  fechaHora: string
  precio: number
}
