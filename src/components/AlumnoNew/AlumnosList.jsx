export const AlumnosList = ({ alumnosFiltrados, setActAlu, actAlu, setLoadingDetails, loadingDetails }) => {
  const LoadingSpinner = () => {
    return (
      <div id="alumno-loading-spinner"></div>
    )
  }
  return (
    <div className='container-table-alumnos'>
      {alumnosFiltrados.length !== 0
        ? alumnosFiltrados.map((alumno) => (
          <div
            onClick={() => setActAlu({ id: alumno.id, nombre: alumno.nombre }, setLoadingDetails(true))}
            key={`alumno-${alumno.id}`} className='new-alumno-item-list'
            style={{
              display: 'flex', justifyContent: 'center', backgroundColor: '#78a1ca', borderRadius: '1em',
              marginBottom: '.5em', height: '2.5em'
            }}>
            <div className='table-cell-ajustes' style={{ alignSelf: 'center', fontFamily: 'var(--title-text)', color: 'var(--neutral-white-text)', fontSize: '1.5em' }}>
              {(loadingDetails && alumno.nombre === actAlu.nombre)
                ? <LoadingSpinner active={loadingDetails} containerClass={'contenedorLogin'} loaderClass={'loader'} />
                : alumno.nombre}
            </div>

          </div>
        ))
        : <h1 className="new-alumno-inside-title">No hay coincidencias</h1>
      }
    </div>
  )
}