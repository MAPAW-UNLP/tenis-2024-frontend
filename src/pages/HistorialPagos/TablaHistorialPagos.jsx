import React from 'react'
import '../../styles/table-next.clases.css'

const TableComponent = ({ data }) => {
  // Combine all rows from the data object
  const allRows = Object.values(data).flat()

  return (
    <div className="table-container">
      {allRows.length > 0 ? (
        <table className="table-class">
          <thead className="table-thead">
            <tr className="table-row">
              <th className="table-head">Fecha</th>
              <th className="table-head">Concepto</th>
              <th className="table-head">Importe</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {allRows.map((row) => (
              <tr className="table-row" key={row.id}>
                <td className="table-data" data-label="Fecha">
                  {row.fecha}
                </td>
                <td className="table-data" data-label="Concepto">
                  {row.concepto}
                </td>
                <td className="table-data" data-label="Importe">
                  {row.importe}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-classes-box">No dispone de pagos realizados</p>
      )}
    </div>
  )
}

export default TableComponent
