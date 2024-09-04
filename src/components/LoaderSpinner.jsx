import React from 'react'
import '../styles/loader.css'

const LoaderSpinner = ({active, containerClass, loaderClass}) => {
  return (
    <>
        {active && 
          <div id={containerClass}>
            <div className={loaderClass} id='loader'/>
          </div>
        }
    </>
  )
}

export default LoaderSpinner