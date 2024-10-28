import DatePicker, { registerLocale } from 'react-datepicker'
import moment from 'moment'
import es from 'date-fns/locale/es'

//Font awesome component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretRight,
  faCaretLeft,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons'

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
      <div className="calendar-picker__date">
        <DatePicker
          className="pickers"
          selected={selectedDate}
          onChange={setSelectedDate}
          locale="es"
          dateFormat="dd 'de' MMMM"
          withPortal
        />
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      <button className="calendar-picker__btn" onClick={selectTomorrow}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  )
}

export default CalendarPicker
