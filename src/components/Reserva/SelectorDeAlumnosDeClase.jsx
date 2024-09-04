import React,{useState, useEffect}from 'react'

const SelectorDeAlumnosDeClase = ({alumnos, setAlumnosDeLaClase, alumnosDeLaClase}) => {
  
    const [alumnosFiltrados, setAlumnosFiltrados] = useState(alumnos)
    
    const handleChangeAlumnos = (e) => {
        const Posibles = (alumnos.filter((a) => a.nombre.toUpperCase().includes(e.target.value.toUpperCase())) );
        if(e.target.value === ''){
            setAlumnosFiltrados(alumnos);
        }
        else{
            setAlumnosFiltrados(Posibles)
        }
    }

    const handleAddAlumno = (el) =>{
        setAlumnosDeLaClase((alumnosDeLaClase)=>   [...alumnosDeLaClase, el])
    }

    const yaEsta = (alumno) =>{
        return alumnosDeLaClase.filter((a) => a.nombre.toUpperCase().includes(alumno.nombre.toUpperCase()));
    }

    useEffect(() =>{
        setAlumnosFiltrados(alumnos);
    }, [alumnos])
  
    return (
    <div>
        <input type="text" name="" placeholder='Nombre' id='buscadorDeAlumnos' onChange={handleChangeAlumnos}/>
        <div id='alumnosListAddDiv'>
        {alumnosFiltrados.map((el, index) => {
            return yaEsta(el).length === 0 ? 
                <div key={index} className='clase-detail-a' id='alumnosListAdd'><p onClick={() =>handleAddAlumno(el)}>{el.nombre}</p>  </div>
            :
                <div key={index} className='clase-detail-a' id='alumnosListAdd' style={{'backgroundColor':'#29754F'}}><p >{el.nombre}</p>  </div>
            })
        }
        </div>
    </div>
  )
}

export default SelectorDeAlumnosDeClase