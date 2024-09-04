import { Fragment } from 'react'
import '../../styles/movimiento/movimientoTable.css'

export const BalanceTable = ({ balance }) => {
  return (
    <>
      <div className="container container-balance" style={{
        backgroundColor: 'white', paddingLeft: '5px', paddingRight: '5px', maxHeight: '60vh',
        overflowY: 'scroll'
      }}>
        <table className="movimiento-table" style={{ marginBottom: '5px', position: 'relative' }}>
          <thead className='table-head' style={{ position: 'sticky', top: '0' }}>
            <tr>
              <th style={{textAlign:'center'}}>Fecha y hora</th>
              <th>Concepto</th>
              <th>Profesor/Alumno</th>
              <th style={{textAlign:'left'}}>Descripción</th>
              <th className='debe-th'>Debe</th>
              <th className='haber-th'>Haber</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ height: '8px' }} />
            {balance.movimientos.map((item) => (
              <Fragment key={`${item.id}-${item.movimiento_id}`}>
                <tr className='table-row'>
                  <td style={{textAlign:'center'}}>{item.fecha_format} - {item.hora} hs</td>
                  <td>{item.concepto_desc}</td>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td className='debe-td'>{item.movimiento_id === 1 && `$${item.monto}`}</td>
                  <td className='haber-td'>{item.movimiento_id === 2 && `$${item.monto}`}</td>
                </tr>
                <tr style={{ height: '5px' }} />
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className='balance-table-footer'>
        Total: ${balance.total}
      </div>
    </>
  )
}