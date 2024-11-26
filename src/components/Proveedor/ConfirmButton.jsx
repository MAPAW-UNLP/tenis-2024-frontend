import Button from 'components/Button/Button'

const ConfirmButton = ({ handleClick }) => {
  return (
    <Button onClick={handleClick} size="lg">
      Aceptar
    </Button>
  )
}

export default ConfirmButton
