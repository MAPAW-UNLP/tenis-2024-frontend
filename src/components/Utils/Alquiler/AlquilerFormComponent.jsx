import React from 'react'
import { useState } from 'react';


//Components
import InputComponent from '../InputComponent';
import SelectComponent from '../SelectComponent';


//FontawesomeIcon
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const AlquilerFormComponent = ({active, canchas,setCancha,setActive, handleAddReserva, setNombre, setTelefono}) => {

    const handleChangeSelect = (e) =>{
        setCancha(e.target.value);
        const nextInput = document.getElementById('nameInput');
        e.target.value === "" ? nextInput.disabled = true: nextInput.disabled = false;  
      }

      const handleChangeName = (e) =>{
        setNombre(e.target.value);
        const nextInput = document.getElementById('telefonoInput');
        e.target.value === "" ? nextInput.disabled = true: nextInput.disabled = false;  
      }

    const handleChangePhone = (e) =>{
        setTelefono(e.target.value);
        const nextBtn = document.getElementById('submit-btn');
        e.target.value === "" ? nextBtn.disabled = true: nextBtn.disabled = false;  
    }
    
  return (
    <>
    {active &&
      
        <div id='alquilerFormComponent'>
            <hr />
            <select name="" className='inputReserva' id="" onChange={handleChangeSelect} >
              <option value="">Canchas disponibles</option>
              {canchas.map((el) => <option value={el.id} key={el.id}>{el.nombre}</option>)}
            </select>
            
            <InputComponent type={'text'} id={'nameInput'} className={'inputReserva'} placeholder={'Nombre y Apellido del cliente'} onChangeFuncion={handleChangeName} deshabilitado={true} />
            <InputComponent type={'number'} id={'telefonoInput'} className={'inputReserva'} placeholder={'Telefono del cliente'} onChangeFuncion={handleChangePhone} deshabilitado={true}/>
            <button id='submit-btn' onClick={handleAddReserva}> <FontAwesomeIcon id='next-icon' icon={faPlusCircle} /> </button>   
        </div>
    }
    </>
  )
}

export default AlquilerFormComponent