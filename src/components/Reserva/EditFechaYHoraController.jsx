import React, {useState} from 'react'
import DatePicker, {registerLocale} from 'react-datepicker'
import moment from 'moment';
import es from 'date-fns/locale/es'
import SelectHoraInicio from '../Utils/Alquiler/SelectHoraInicio';
import SelectHoraFin from '../Utils/Alquiler/SelectHoraFin';
const EditFechaYHoraController = ({reserva, setHoraInicio, horaInicio, setHoraFinal, horaFinal, diaElegido, setDiaElegido}) => {
    
  const horas = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]

    const [startDate, setStartDate] = useState(moment(reserva.fecha, 'YYYY-MM-DD').toDate());
    

    const formatFecha = (fecha) => {
      setDiaElegido(moment(fecha).format('YYYY-MM-DD'));
    }

    const posInicial = (horaInit) =>{
      if(horaInit !== ""){
          return horas.indexOf(horaInit);
      }
  }

    return (
    <div id='edit-calendar-alquiler'>
      <DatePicker
        selected={startDate}
        onChange={(date) => {setStartDate(date); formatFecha(date)}}
        inline
        locale="es"
        minDate={moment(new Date().getDate(), 'DD-MM-YYYY').toDate()}

      />

      <div id='selectorhora'>
        {/* <h4>Horario:</h4> */}
        {horaInicio === '' ?
        <select name="" id="" onChange={(e)=> setHoraInicio(e.target.value)}>
          {horas.map((hora, i) =>{if(hora === reserva.horaIni){return  <option  selected key={hora}  value={hora}>{hora}</option> } else{ return <option key={hora}  value={hora}>{hora}</option>}})   }
        </select>
        :
        <select name="" id="" onChange={(e)=> setHoraInicio(e.target.value)}>
            {horas.map((hora, i) =>{if(hora === horaInicio){return  <option  selected key={hora}  value={hora}>{hora}</option> } else{ return <option key={hora}  value={hora}>{hora}</option>}})   }
        </select>
        }

        {horaFinal === ''?
         <select name="" id="" onChange={(e)=> setHoraFinal(e.target.value)}>
            {horas.map((hora, i) =>{ if(i < posInicial(reserva.horaIni)+1) {return ""}
            else{
            if(hora === reserva.horaFin){return  <option  selected key={hora}  value={hora}>{hora}</option> } else{ return <option key={hora}  value={hora}>{hora}</option>}
          }})}
          </select>
        :
        <select name="" id="" onChange={(e)=> setHoraFinal(e.target.value)}>
          {horas.map((hora, i) =>{ if(i < posInicial(horaInicio)+1) {return ""}
          else{
            if(hora === horaFinal){return  <option  selected key={hora}  value={hora}>{hora}</option> } else{ return <option key={hora}  value={hora}>{hora}</option>}
          }})}
        </select>
        }
        

       

      </div>
      </div>
    );
}

export default EditFechaYHoraController