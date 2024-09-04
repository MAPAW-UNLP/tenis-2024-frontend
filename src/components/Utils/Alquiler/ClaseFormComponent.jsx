import React from 'react'
import { useState } from 'react';

//Components
import InputComponent from '../InputComponent';
import SelectComponent from '../SelectComponent';
import Select from 'react-select';



//FontawesomeIcon
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ClaseFormComponent = ({active, canchas, setCancha, setActive, handleAddReserva, profesores, setProfesores, alumnos, setAlumnos, grupoIds, setGrupoIds, setProfesorSel, replica, setReplica, tipoClase, setTipoClase}) => {

  const [tipoClaseSel, setTipoClaseSel] = useState('');

  const handleChangeSelect = (e) =>{
      setCancha(e.target.value);
      const nextInput = document.getElementById('profeInput');
      e.target.value === "" ? nextInput.disabled = true: nextInput.disabled = false;
  }

  const handleChangeProfesorSelect = (e) => {
    setProfesorSel(e.target.value);
    const nextInput = document.getElementById('typeReserva');
    e.target.value === "" ? nextInput.disabled = true: nextInput.disabled = false;
  }
      
  const handleChangeAlumnoSelect = (e) => {
    setGrupoIds(e.target.value)
  }

  const handleChangeAlumnoMultSelect = (e) => {
    console.log('Selecciono alumno ', e)
    setGrupoIds(e.map((i)=>i.value))
    console.log(grupoIds)
  }

  const handleChangeTipoClaseSelect = (e) => {
    setTipoClaseSel(e.target.value)
    setTipoClase(e.target.value)
  }

  const handleChangeCheck = (e) => {
    console.log('Repetir', e.target.checked)
    setReplica(e.target.checked)
  }
    
  return (
    <>
    {active &&
      
        <div id='claseFormComponent'>
            <hr />
            <select name="" className='inputReserva' id="" onChange={handleChangeSelect} >
              <option value="">Canchas disponibles</option>
              {canchas.map((el) => <option value={el.id} key={el.id}>{el.nombre}</option>)}
            </select>
            <select name="" className='inputReserva' id='profeInput' onChange={handleChangeProfesorSelect} disabled>
              <option value="">Profesor</option>
              {profesores.map((el) => <option value={el.id} key={el.id}>{el.nombre}</option>)}
            </select>
            <select name="" className='inputReserva' id="typeReserva" onChange={handleChangeTipoClaseSelect} disabled>
              <option value="">Tipo de Clase</option>
              <option value="2">Grupal</option>
              <option value="1">Individual</option>
            </select>

            { tipoClaseSel == '1' && 
            <select name="" className='inputReserva' id="" onChange={handleChangeAlumnoSelect} >
              <option value="">Alumno</option>
              {alumnos.map((el) => <option value={el.id} key={el.id}>{el.nombre}</option>)}
            </select>
            }
            { tipoClaseSel == '2' &&
            <Select className='inputReserva' isMulti onChange={handleChangeAlumnoMultSelect} options={alumnos.map((el)=> ({label:el.nombre, value:el.id}))} placeholder="Seleccionar alumnos">
            </Select>
            }
            <label id='checkbox-container'><input type='checkbox' onChange={handleChangeCheck} />Repetir Clase</label>
            <button id='submit-btn' onClick={handleAddReserva}> <FontAwesomeIcon id='next-icon' icon={faPlusCircle} /> </button>   
        </div>
    }
    </>
  )
}

export default ClaseFormComponent