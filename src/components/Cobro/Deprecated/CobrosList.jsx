import React, { useState, useEffect } from 'react';
import { Cobro } from './Cobro';
import { CobroDetail }  from './CobroDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InputComponent from '../../Utils/InputComponent';
import { CobroItem } from './CobroItem';

export const CobrosList = ({ cobros }) => {
  const [activeDetail, setActiveDetail] = useState(false);
  const [actUser, setActUser] = useState('');
  const [cobrosActUser, setCobrosActUser] = useState();
  const URL_BASE = `http://localhost:8083/api/`;

  useEffect(() => {
    if (actUser !== '') {
      fetch(`${URL_BASE}pagos_por_persona?personaId=${actUser.id}`)
        .then((response) => response.json())
        .then((data) => setCobrosActUser(data))
        .then(() => setActiveDetail(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actUser]);

  return (
    <div id="cobros-list-component">
      {/* <CobroDetail activeDetail={activeDetail} setActiveDetail={setActiveDetail} cobrosActUser={cobrosActUser} actUser={actUser}/> */}
      <div className="cobros-list-options-flex">
        <div className="item dia">Día</div>
        <div className="item concepto">Concepto</div>
        <div className="item descripcion">Descripción</div>
        <div className="item monto">Monto</div>
        <div className="item buscar cobros-searchbar">
          <FontAwesomeIcon className="magnify-icon" icon={faMagnifyingGlass}/>
          <InputComponent type={'text'} placeholder={'Buscar por descripcion'}/>
        </div>
      </div>
      <div id="cobros-list">
        {/* {cobros.map((cobro, index) => (
          <Cobro key={index} info={cobro} setActUser={setActUser} />
        ))} */}
        <CobroItem/>
        <CobroItem/>
        <CobroItem/>
      </div>
    </div>
  );
};
