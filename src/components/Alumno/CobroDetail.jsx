import React from 'react'

export const CobroDetail = ({ activeDetail, setActiveDetail, cobrosActUser, setActUser, actUser }) => {

  const mostrarFechaDescentemente = (fecha) => {
    const date = (fecha).split('-');
    return `${date[2]}/${date[1]}/${date[0]}`
  }

  const handleCloseForm = () => {
    setActiveDetail(false);
    setActUser('');
  }

  const returnTipoClase = (tipoClase) => {
    if (tipoClase === 0) return 'Alquiler'
    else if (tipoClase === 1) return 'Clase Individual'
    else if (tipoClase === 2) return 'Clase Grupal'
    else return "-"
  }

  return (
    <>
      {activeDetail &&
        <div className='cobros-detail'>
          <button className='close-detail-add-form' onClick={handleCloseForm}>x</button>
          <h2>Detalles</h2>
          <h3 className='cobros-detail-title'>{actUser.nombre}</h3>
          <div className='cobros-detail-list'>
            {cobrosActUser.map((el, i) => {
              return (
                <div className='cobros-detail-item' key={i}>
                  <div className='cobros-detail-fecha'>{mostrarFechaDescentemente(el.fecha)}</div>
                  <div className='cobros-detail-tipo'>Tipo: {returnTipoClase(el.idTipoClase)}</div>
                  <div className='cobros-detail-cantidad'>Monto: ${el.monto} </div>
                </div>)
            })}
          </div>
        </div>
      }
    </>
  )
}
