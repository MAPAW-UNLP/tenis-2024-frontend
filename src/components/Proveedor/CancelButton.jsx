import Button from 'components/Button/Button'

const CancelButton = ({ handleClick }) => {
  return (
    <Button color="secondary" onClick={handleClick} size="lg">
      Cancelar
    </Button>
  )
}

export default CancelButton
