import PaginationButton from 'components/Proveedor/PaginationButton'

const PaginationControls = ({ pagina, totalDePaginas, atras, siguiente }) => {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <PaginationButton onClick={atras} disabled={pagina === 0} text="Atrás" />
      <PaginationButton
        onClick={siguiente}
        disabled={pagina >= totalDePaginas - 1}
        text="Siguiente"
      />
    </div>
  )
}

export default PaginationControls
