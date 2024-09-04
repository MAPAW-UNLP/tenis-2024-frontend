import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import '../../styles/profesorLoader.css'

export const Profesor = ({ info, setProfeDetail, profeDetail, setWillEdit, loadingDetails, setLoadingDetails }) => {

  const LoadingSpinner = () => {
    return(
      <div id="loading"></div>
    )
  }
  
  return (
    <div className='profesor-info'>
        <p>{info.nombre}</p>
        <p>{info.telefono}</p>
        <p>{info.email}</p>
        <button id='edit-profesor-btn' style={{margin: 'auto'}}
          onClick={()=> setProfeDetail({id:info.id}, setWillEdit(true), setLoadingDetails(true))}>
          {(loadingDetails && profeDetail.id === info.id) ? 
            <LoadingSpinner active={loadingDetails} containerClass={'contenedorLogin'} loaderClass={'loader'}/> 
          : 
            <FontAwesomeIcon icon={faUserEdit}/> 
          }
        </button>
    </div>
  )
}
