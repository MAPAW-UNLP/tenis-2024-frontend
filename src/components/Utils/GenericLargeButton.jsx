import '../../styles/buttons/genericLargeButton.css';

export const GenericLargeButton = ({ doSomething, title }) => {
  return(
    <button className='generic-large-add-btn' onClick={doSomething}>
      <h1 className='generic-large-add-btn-text'>{title}</h1>
    </button>
  )
}