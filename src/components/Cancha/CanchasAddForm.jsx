import React from 'react';

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

//Components
import FeedbackText from '../FeedbackText';

const CanchasAddForm = ({
  actived,
  handleCanchaNameChange,
  handleSelect,
  handleClickaddCourt,
  handleCloseForm,
  feedBack,
  nombreCancha,
  option
}) => {

  return (
    <>
      {actived && (
        <div id="cancha-add-component">
          <div id="close-cancha-add-form" onClick={handleCloseForm}>
            x
          </div>
          <h2>Nueva cancha</h2>
          <form action="" id="cancha-add-form" onSubmit={handleClickaddCourt}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Ingresar nombre nueva Cancha"
              className="cancha-add-form-input"
              onChange={handleCanchaNameChange}
              value={nombreCancha}
            />
            <select
              name=""
              id="cancha-add-form-select"
              disabled
              onChange={handleSelect}
              value={option}
            >
              <option value="">Seleccionar Tipo</option>
              <option value="roja">Tierra batida</option>
              <option value="verde">Hierba</option>
              <option value="azul">Asfalto</option>
            </select>

            <FeedbackText
              text={feedBack.text}
              color={feedBack.color}
              backGroundColor={feedBack.backGroundColor}
              active={true}
            />

            <button id="cancha-add-form-addBtn" type="sumbit" disabled>
              <FontAwesomeIcon id="canchas-add-form-btn" icon={faPlusCircle} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CanchasAddForm;
