import React from 'react'
import '../../styles/table-next.clases.css'

const TableComponent = ({ clases }) => {
  return (
    <div className="table-container">
      {Object.keys(clases).map((day) => (
        <div key={day}>
          <h2>{day}</h2>
          {clases[day].length > 0 ? (
            <table className="table-class">
              <thead className="table-thead">
                <tr className="table-row">
                  <th className="table-head">Tipo</th>
                  <th className="table-head">Importe</th>
                  <th className="table-head">Fecha</th>
                  <th className="table-head">Hora Inicio</th>
                  <th className="table-head">Hora Fin</th>
                  <th className="table-head">Profesor</th>
                  <th className="table-head">Cancha</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {clases[day].map((clase) => (
                  <tr className="table-row" key={clase.id}>
                    <td className="table-data" data-label="Tipo">
                      {clase.tipo}
                    </td>
                    <td className="table-data" data-label="Importe">
                      {clase.importe}
                    </td>
                    <td className="table-data" data-label="Fecha">
                      {clase.fecha}
                    </td>
                    <td className="table-data" data-label="Hora Inicio">
                      {clase.hora_ini}
                    </td>
                    <td className="table-data" data-label="Hora Fin">
                      {clase.hora_fin}
                    </td>
                    <td className="table-data" data-label="Profesor">
                      {clase.profesor}
                    </td>
                    <td className="table-data" data-label="Cancha">
                      {clase.cancha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-classes-box">No tiene clases programadas</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default TableComponent
