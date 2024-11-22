const PaginationButton = ({ onClick, disabled, text }) => (
  <button className="btnSelectPage" disabled={disabled} onClick={onClick}>
    {text}
  </button>
)

export default PaginationButton
