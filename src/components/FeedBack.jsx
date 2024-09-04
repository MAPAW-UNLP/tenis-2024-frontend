import React from 'react'

import '../styles/feedBackComponent.css'

const FeedBack = ({type, title, text }) => {
  return (
    <div className='feedback-component'>
      <h2>{title}</h2>
      <p> {text}</p>
    </div>
  )
}

export default FeedBack