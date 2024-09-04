import React from 'react'
import { useState } from 'react';
import Select from 'react-select';


const SelectAlumnosAddClase = ({alumnosDeLaClase, alumnos, setAlumnos}) => {
  

    const [alumnosFiltrados, setAlumnosFiltrados] = useState([])
    const filtrarAlumno = (e) =>{
        const Posibles = (alumnos.filter((a) => a.nombre.toUpperCase().includes(e.target.value.toUpperCase())) );
        if(e.target.value === ''){
            setAlumnosFiltrados(alumnos);
        }
        else{
            setAlumnosFiltrados(Posibles)
    }
    }

    const IDalumnosDeLaClase = alumnosDeLaClase.map(el => el.nombre);
    console.log(IDalumnosDeLaClase)
    return (
    <div id='selectorAlumnosDetallesClase'>
        <input type="text" id='filtrado' placeholder='buscar alumno' onChange={filtrarAlumno}/>
        {alumnos.map((el)=>{ if(IDalumnosDeLaClase.indexOf(el.nombre) === -1){
            return <div>{el.nombre} <button>+</button></div> }
        })}
    </div>
  )
}

export default SelectAlumnosAddClase