import React from 'react'
import Cancha from './Cancha'

const CanchasList = ({canchas}) => {

  return (
    <div id='canchas-list'>
      {canchas.map((cancha) => <Cancha key={cancha.id} id={cancha.id} nombre={cancha.nombre} tipo={cancha.tipo} />)}
    </div>
  )
}

export default CanchasList;