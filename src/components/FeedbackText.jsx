import React from 'react'
import '../styles/feedbackText.css'


const FeedbackText = ({text, color, backGroundColor, active}) => {
  return(
  <>
  {active ? 
    <p className='feedback-text' style={{'color': color, 'backgroundColor': backGroundColor}}>{text} </p>
    :
    ""
  }
  </>
  )
}

export default FeedbackText