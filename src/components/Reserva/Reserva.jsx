import React, {useState} from 'react'

//styles
import '../../styles/reservaInfo.css'
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'


const Reserva = ({datos, canchas, today, setReservaDetail, setClaseDetail, setAlumnos, setProfe}) => {

    const horas = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]
    
    const adivinarFila = (hora) =>{
        return horas.indexOf(hora)+1;   
    }

 

    const adivinarColumna = (canchaName) =>{
        return (canchas.map((cancha) => cancha.nombre).indexOf(canchaName)+1);     
    }

    const abrirReservaDetail = () =>{
        if(datos.tipo === 'ALQUILER'){
            console.log(datos);
            setReservaDetail((pv) => datos);
        }
        else{
            setAlumnos(datos.grupo);
            setClaseDetail((pv) =>datos);
            setProfe(datos.profesorId);
            console.log('levantar clase detail');
        }
    }

    const setearColor = (tipoDeReserva) =>{
        if (tipoDeReserva === 'ALQUILER') {
            return '#336699'
            
        }
        else {
            return '#339967'
        }
    }
  return (
    <>
    { (datos.fecha === today)? 
    <div className='reservas' style={{gridArea: `${adivinarFila(datos.horaIni)+1}/${adivinarColumna(datos.canchaNombre)+1}/${adivinarFila(datos.horaFin)+2}/${adivinarColumna(datos.canchaNombre)+1}`, backgroundColor: setearColor(datos.tipo)}}>
        <div id='reserva-info'>
            <button id='reserva-infoBTN' onClick={abrirReservaDetail}><FontAwesomeIcon icon={faCircleInfo} id='infoBTNICO'></FontAwesomeIcon></button>
            <div id='reserva-datos'>
                <h2 id='reserva-nombre'>{datos.titular? datos.titular.nombre : ''}</h2>
                {(datos.tipo ==='ALQUILER')?
                    <h2 id='reserva-rol'>Cliente</h2>
                : <h2 id='reserva-rol'>Profesor</h2>}        
                <p id='reserva-horario'>{datos.horaIni} - {datos.horaFin}</p>
            </div>
        </div>
    </div>
    : ""}     
    </>
  )
}

export default Reserva