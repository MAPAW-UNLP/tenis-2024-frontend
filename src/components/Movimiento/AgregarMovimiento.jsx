import { MovimientoForm } from './MovimientoForm'

export const AgregarMovimiento = ({
  active,
  handleCloseForm,
  submitMovimientoForm,
  movimientoAddForm,
  handleChangeFormData,
  personas,
  proveedores = [],
  movimientoName,
  movimientoOptions,
  clasesOptions,
}) => {
  return (
    <>
      {active && (
        <MovimientoForm
          handleCloseForm={handleCloseForm}
          submitMovimientoForm={submitMovimientoForm}
          personas={personas}
          proveedores={proveedores}
          handleChangeFormData={handleChangeFormData}
          movimientoAddForm={movimientoAddForm}
          movimientoOptions={movimientoOptions}
          movimiento={movimientoName}
          clasesOptions={clasesOptions}
        />
      )}
    </>
  )
}
