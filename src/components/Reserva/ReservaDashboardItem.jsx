import { useMemo, useRef } from 'react'

import './ReservaDashboardItem.css'

const CELL_HEIGHT = 3 // 3 rem

const horas = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
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

export default function ReservaDashboardItem({ reserva, onClick }) {
  // Uso useMemo para evitar que estas cuentas se repitan cada vez que se
  // re-renderiza el componente
  const style = useMemo(() => {
    const indexIni = horas.indexOf(reserva.horaIni) + 1
    const indexFin = horas.indexOf(reserva.horaFin) + 1
    return {
      top: `${CELL_HEIGHT * indexIni}rem`,
      height: `${CELL_HEIGHT * (indexFin - indexIni) - 0.125}rem`,
      backgroundColor: reserva.tipo === 'ALQUILER' ? '#336699' : '#339967',
    }
  }, [reserva.horaFin, reserva.horaIni, reserva.tipo])

  const itemRef = useRef(null)

  function handleMouseEnter() {
    const fitContentHeight = itemRef.current.scrollHeight
    const currentHeight = itemRef.current.offsetHeight
    if (fitContentHeight > currentHeight) {
      itemRef.current.style.height = `${fitContentHeight}px`
    }
  }

  function handleMouseLeave() {
    itemRef.current.style.height = style.height
  }

  return (
    <div
      className="item-reserva"
      style={{ ...style, cursor: onClick ? 'pointer' : 'default' }}
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="item-reserva__data">
        {reserva.titular && (
          <p
            className="item-reserva__titular text-ellipsis"
            title={reserva.titular.nombre}
          >
            {reserva.titular.nombre}
          </p>
        )}
        <p className="item-reserva__rol">
          {reserva.tipo === 'ALQUILER' ? 'Cliente' : 'Profesor'}
        </p>
        <p className="item-reserva__horarios">
          {reserva.horaIni} - {reserva.horaFin}
        </p>
      </div>
    </div>
  )
}
