import React from 'react'

const Cancha = ({id, nombre, tipo}) => {
  const pickBackgroundColor = () =>{
    if(tipo === 'verde'){return '#339966'}
    else if(tipo === 'roja'){return '#993300'}
    else if(tipo === 'azul'){return '#336699'}
  }
  return (
    <div id="cancha-component">
      <h2>{nombre}</h2>
      <h4>Proximo partido</h4>
      <div id='grafico' style={{ backgroundColor: pickBackgroundColor()}}>
        <div id='cancha-big-div'>
          <div id='primeraMitad'></div>
          <div id='medio'></div>
          <div id='segundaMitad'></div>
        </div>
      </div>
    </div>
  )
}

export default Cancha