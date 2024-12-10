export const horas = [
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
]

function getIndex(hora) {
  return horas.findIndex((h) => h === hora)
}

export function getHorasMayoresA(hora) {
  const horaIndex = getIndex(hora) + 1
  return horas.slice(horaIndex !== -1 ? horaIndex : undefined)
}

export function compareHoras(hora1, hora2) {
  return getIndex(hora1) - getIndex(hora2)
}
