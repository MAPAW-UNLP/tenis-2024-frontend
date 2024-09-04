import React, {useState} from 'react'

import ReservaSemanal from './ReservaSemanal'


const VistaSemanal = ({canchas, reservas}) => {

    const horas = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]
    const semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  return (
    
    <div>

        <div id='table-grid' style={{display:'grid', gridTemplateColumns: `repeat(${canchas.length+1}, 1fr)`, gridTemplateRows: `repeat(${horas.length+1}, 1fr)` }}>
            <div id='hora' style={{gridArea: "1/1/2/2"}}>Hora</div>
            {horas.map((el, i) => <div className='horas' key={i} style={{gridArea:`${i+2}/1/${i+3}/2`}}> {el} </div>)}  
            {semana.map((el, i) => <div className='semana' key={el} style={{gridArea: `1/${i+2} / ${horas.lenght}/${i+3}`}} ><div id='semana-nombre' style={{ height: '4vh'}}> {el}</div> </div>)}
            {reservas.map((el) => <ReservaSemanal key={el.reservaId} datos={el} canchas={canchas} />  )}          
        </div>
    </div>
  )
}

export default VistaSemanal