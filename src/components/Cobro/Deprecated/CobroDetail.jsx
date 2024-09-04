import React from 'react'

export const CobroDetail = ({ activeDetail, setActiveDetail, cobrosActUser, actUser }) => {
  let clasesIndividuales = 0;
  let clasesGrupales = 0;

  const mostrarFechaDescentemente = (fecha) => {
    const date = (fecha).split('-');
    return `${date[2]}/${date[1]}/${date[0]}`
  }

  const handleCloseForm = () => {
    setActiveDetail(false);
  }

  const returnTipoClase = (tipoClase) => {
    if (tipoClase === 0) {
      return 'Alquiler'
    }
    else if (tipoClase === 1) {
      return 'Clase Indv.'
    }
    return 'Clase Grupal'
  }
  return (
    <>
      {activeDetail &&
        <div className='cobros-detail'>
          <button className='close-detail-add-form' onClick={handleCloseForm}>x</button>
          <h2>{actUser.nombre}</h2>
          <div className='cobros-detail-list'>
            {cobrosActUser.map((el, i) => {
              if (el.idTipoClase === 1) {
                clasesIndividuales += el.cantidad
              }
              if (el.idTipoClase === 2) {
                clasesGrupales += el.cantidad
              }
              return (
                <div className='cobros-detail-item' key={i}>
                  <p className='cbros-detail-fecha'>{mostrarFechaDescentemente(el.fecha)}</p>
                  <p className='cobros-detail-tipo'>Tipo: {returnTipoClase(el.idTipoClase)}</p>
                  <p className='cobros-detail-cantidad'>Cantidad: {el.cantidad}</p>
                </div>)
            })}
          </div>
          <div className='cobros-detail-contadores'>
            <div>Clases Individuales: {clasesIndividuales}</div>
            <div>Clases Grupales: {clasesGrupales}</div>
          </div>
        </div>
      }
    </>
  )
}
