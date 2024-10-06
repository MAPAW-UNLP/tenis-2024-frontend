import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import moment from 'moment'
import es from 'date-fns/locale/es'

//Font awesome component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/calendar.css'

registerLocale('es', es)

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
  function selectYesterday() {
    setSelectedDate((date) => moment(date).subtract(1, 'day').valueOf())
  }

  function selectTomorrow() {
    setSelectedDate((date) => moment(date).add(1, 'day').valueOf())
  }

  return (
    <div className="calendar-picker">
      <button className="calendar-picker__btn" onClick={selectYesterday}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <DatePicker
        className="pickers"
        selected={selectedDate}
        onChange={setSelectedDate}
        locale="es"
        dateFormat="dd 'de' MMMM"
        withPortal
      />
      <button className="calendar-picker__btn" onClick={selectTomorrow}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  )
}

export default CalendarPicker
