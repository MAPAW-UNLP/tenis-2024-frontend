import '../../styles/movimiento/movimientoTable.css'
import { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InputComponent from '../Utils/InputComponent';
import { CoverSpinner } from '../CoverSpinner';

export const MovimientoTable = ({ movimientos, loadingFetch }) => {

  const [movimientosFiltrados, setMovimientosFiltrados] = useState(movimientos)

  const handleSearchMovimiento = (e) => {
    const posibles = movimientos.filter((mov) =>
      mov.descripcion.toUpperCase().includes(e.target.value.toUpperCase())
    );
    if (e.target.value === '') {
      setMovimientosFiltrados(movimientos);
    } else {
      setMovimientosFiltrados(posibles);
    }
  };

  useEffect(() => {
    setMovimientosFiltrados(movimientos);
  }, [movimientos]);

  return (
    <>
      <div className="container" style={{
        backgroundColor: 'white', paddingLeft: '5px', paddingRight: '5px', maxHeight: '60vh',
        overflowY: 'scroll'
      }}>
        <CoverSpinner loadingFetch={loadingFetch} />
        <table className="movimiento-table" style={{ marginBottom: '5px', position: 'relative' }}>
          <thead className='table-head' style={{ position: 'sticky', top: '0' }}>
            <tr>
              <th>Fecha y hora</th>
              <th>Concepto</th>
              <th style={{ textAlign: 'center' }}>Descripción</th>
              <th>Monto</th>
              <th style={{ width: '15em' }}>
                <div className="movimiento-searchbar">
                  <FontAwesomeIcon className="movimiento-magnify-icon" icon={faMagnifyingGlass} />
                  <InputComponent type={'text'} placeholder={'Buscar por descripcion'} onChangeFuncion={handleSearchMovimiento} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {movimientosFiltrados.map((movimiento) => (
              <Fragment key={movimiento.id}>
                <tr style={{ height: '8px' }} />
                <tr className='table-row'>
                  <td>{movimiento.fecha_format} - {movimiento.hora} hs</td>
                  <td>{movimiento.concepto_desc}</td>
                  {movimiento.idAlumno
                    ? <td><span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{movimiento.nombreAlumno}</span> <br /> {movimiento.descripcion}</td>
                    : (movimiento.idProfesor
                      ? <td><span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{movimiento.nomProfesor}</span> <br /> {movimiento.descripcion}</td>
                      : <td>{movimiento.descripcion}</td>
                    )
                  }
                  {/* <td>{movimiento.descripcion}</td> */}
                  <td className='monto-td'>${movimiento.monto}</td>
                  <td></td>
                </tr>
              </Fragment>
            ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}