import Button from 'components/Button/Button'

const PaginationButton = ({ onClick, disabled, text }) => (
  <Button size="lg" color="info" disabled={disabled} onClick={onClick}>
    {text}
  </Button>
)

export default PaginationButton
