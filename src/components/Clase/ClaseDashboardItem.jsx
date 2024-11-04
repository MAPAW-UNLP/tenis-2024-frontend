import { useMemo, useRef } from 'react'

import '../../styles/claseDashboardItem.css'

const CELL_HEIGHT = 3 // 3 rem

const horas = [
  '08:00:00',
  '08:30:00',
  '09:00:00',
  '09:30:00',
  '10:00:00',
  '10:30:00',
  '11:00:00',
  '11:30:00',
  '12:00:00',
  '12:30:00',
  '13:00:00',
  '13:30:00',
  '14:00:00',
  '14:30:00',
  '15:00:00',
  '15:30:00',
  '16:00:00',
  '16:30:00',
  '17:00:00',
  '17:30:00',
  '18:00:00',
  '18:30:00',
  '19:00:00',
  '19:30:00',
  '20:00:00',
  '20:30:00',
  '21:00:00',
]

export default function ClaseDashboardItem({ clase, onClick }) {
  const style = useMemo(() => {
    const indexIni = horas.indexOf(clase.hora_ini) + 1
    const indexFin = horas.indexOf(clase.hora_fin) + 1
    console.log(horas.indexOf(clase.hora_ini))
    console.log('hora ini:' + clase.hora_ini)
    console.log('hora fin:' + clase.hora_fin)
    return {
      top: `${CELL_HEIGHT * indexIni}rem`,
      height: `${CELL_HEIGHT * (indexFin - indexIni) - 0.125}rem`,
      backgroundColor: clase.tipo === 'INDIVIDUAL' ? '#336699' : '#339967',
    }
  }, [clase.hora_fin, clase.hora_ini, clase.tipo])

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
      className="item-clase"
      style={{ ...style, cursor: onClick ? 'pointer' : 'default' }}
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="item-clase__data">
        <p className="item-clase__titular text-ellipsis" title={clase.profesor}>
          Prof: {clase.profesor}
        </p>
        <p className="item-clase__rol">Tipo: {clase.tipo}</p>
        <p className="item-clase__rol">Cancha: {clase.cancha}</p>
        <p className="item-clase__rol">Total: $ {clase.importe}</p>
      </div>
    </div>
  )
}
