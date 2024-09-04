import React, {useState} from 'react'
import DatePicker, {registerLocale} from 'react-datepicker'
import moment from 'moment';
import es from 'date-fns/locale/es'
//Font awesome component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/calendar.css';

registerLocale("es", es);


const CalendarComponent = ({today,setToday}) => {

  
  const [startDate, setStartDate] = useState(new Date());

  const setDate = (date) =>{
    const mes = ("0" + (date.getMonth() + 1)).slice(-2)
    const dia = ("0" + date.getDate()).slice(-2)
    const año = ( date.getFullYear());

    setToday(`${año}-${mes}-${dia}`);  
  }

  const yesterday = () =>{
    setStartDate(moment(startDate).subtract(1, 'day').toDate())
    setDate(moment(startDate).subtract(1, 'day').toDate())
  }

  const tomorrow = () =>{
    setStartDate(moment(startDate).add(1, 'day').toDate())
    setDate(moment(startDate).add(1, 'day').toDate())
  }


  return (
    <>
      <button onClick={yesterday}> <FontAwesomeIcon icon={faCaretLeft}/></button>
      <DatePicker id='date' selected={startDate} onChange={(date) => {setStartDate(date); setDate(date)}} locale="es" className='pickers' dateFormat="dd 'de' MMMM" withPortal  />
      <button onClick={tomorrow}> <FontAwesomeIcon icon={faCaretRight}/></button>
    </>
  );
  
};

export default CalendarComponent