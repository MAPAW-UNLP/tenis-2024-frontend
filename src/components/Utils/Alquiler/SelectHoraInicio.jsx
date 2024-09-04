import React from 'react'

const SelectHoraInicio = ({id, className, setHoraInicio}) => {

    const horas = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]
    
    const handleChangeHoraInicio = (e) =>{
      setHoraInicio(e.target.value);
      const nextInput = document.getElementById('horaFin');
      e.target.value === "" ? nextInput.disabled = true: nextInput.disabled = false;  
    }
    return (
    <>
      <select name="" className={className} id={id} onChange={handleChangeHoraInicio} disabled >
          <option value="">Hora Inicio (*)</option>
          {horas.map((hora, i) =>{if(i !== horas.length-1){return  <option key={hora}  value={hora}>{hora}</option> } else{return ""}})   }   
      </select>

    </>
  )
}

export default SelectHoraInicio