export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString)

  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day} ${month} ${hours}:${minutes}`
}

export function getToken() {
  if (localStorage.getItem('userToken')) {
    const token = localStorage.getItem('userToken')
    return token
  }
}
