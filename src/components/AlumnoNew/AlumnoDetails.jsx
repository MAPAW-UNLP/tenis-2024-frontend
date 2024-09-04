import '../../styles/alumnos/alumnoDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Fragment } from 'react';
import { GenericButton } from '../Utils/GenericButton';

export const AlumnoDetails = ({ activeDetails, handleCloseDetails, aluDetail, setEditAlumnoActive, cobrosActUser }) => {

  return (
    <>
      {activeDetails &&
        <div className="new-alumno-details-component-container">
          <div className='new-alumno-details-component'>
            <button className="close-new-alumno-details" onClick={handleCloseDetails}> x </button>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              <div>
                <h2>{aluDetail.nombre}</h2>
                <p className='new-alumno-inside-text'>Telefono: {aluDetail.telefono}</p>
                <GenericButton marginBottom={"1.5em"} backgroundColor={'#9195e6'} color="white" borderRadius="1em"
                  width="20em" centrado boxShadow={"0px 2px 1px #9195e6"} onClick={() => setEditAlumnoActive(true)}>
                  Editar datos
                </GenericButton>
              </div>
              {!aluDetail.profilePic
                ?
                <div className="new-alumno-profile-pic">
                  <div style={{ fontSize: '3.2em', color: 'rgb(93, 93, 93)' }}>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                </div>
                :
                <p>Foto de perfil</p>
              }
            </div>
            {cobrosActUser.length === 0 ?
              <div className='new-alumno-inside-title'>
                <p>No hay pagos registrados</p>
              </div>
              :
              <>
                <div className='new-alumno-inside-title'>
                  <p>Ultimos pagos realizados</p>
                </div>

                <table style={{
                  borderCollapse: 'collapse', width: '80%', marginTop: '1.5em', marginLeft: 'auto',
                  marginRight: 'auto', fontFamily: 'var(--normal-text)'
                }} className='new-alumno-details-table'>
                  <thead style={{ backgroundColor: 'gray', color: 'white' }}>
                    <tr>
                      <th>Fecha</th>
                      <th>Tipo de clase</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cobrosActUser.map((cobro) => (
                      <Fragment key={`cobro-${cobro.id}`}>
                        <tr>
                          <td>{cobro.fecha}</td>
                          <td>{cobro.tipoClase}</td>
                          <td>{cobro.monto}</td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>

                <div className='new-alumno-inside-title'>
                  <p>Deudas</p>
                </div>
                <div className='new-alumno-deudas' style={{ marginBottom: '1em' }}>
                  <p>Clase grupal: 0</p>
                  <p>Clase individual: 3</p>
                </div>
              </>
            }
          </div>
        </div >
      }
    </>
  )
}