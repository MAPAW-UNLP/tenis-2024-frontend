import React, { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import '../../styles/canchas.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

//Components
import CanchasAddForm from '../../components/Cancha/CanchasAddForm'
import CanchasList from '../../components/Cancha/CanchasList'
import LoaderSpinner from '../../components/LoaderSpinner'

export const Canchas = ({ setSesion }) => { 
  const URL_BASE = `http://localhost:8083/api/`; 

  const [actived, setActived] = useState(false);

  const [canchas, setCanchas] = useState([]);
  const [actCanchas, setActCanchas] = useState(false);
  const [activedLoader, setActivedLoader] = useState(false);

  const [nombreCancha, setNombreCancha] = useState('');
  const [option, setOption] = useState('');

  //para el feedback de formulario
  const [feedBack, setFeedBack] = useState({
    text: '',
    color: '',
    backGroundColor: '',
    active: false,
  });

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}canchas`, requestOptions)
      .then((response) => response.json())
      .then((data) => setCanchas(data.detail))
      .then((response) => setActivedLoader((v) => false)); //siempre aca da false
    /* Desactivar spinner */
  }, [actCanchas]);

  const handleCanchaNameChange = (e) => {
    setNombreCancha(e.target.value);
    if (
      canchas
        .map((each) => each.nombre.toUpperCase())
        .indexOf(e.target.value.toUpperCase()) === -1
    ) {
      //pregunta se no existe una cancha con el mismo nombre
      const selectTipo = document.getElementById('cancha-add-form-select');
      if (e.target.value === '') {
        setFeedBack({
          ...feedBack,
          text: '',
          color: '',
          backGroundColor: '',
          active: false,
        });
        selectTipo.disabled = true;
      } else {
        setFeedBack({
          ...feedBack,
          text: 'El nombre de la cancha es correcto',
          color: '#F4F4F4',
          backGroundColor: '#7CBD1E',
          active: true,
        });
        selectTipo.disabled = false;
      }
    } else {
      //avisar mediante feedback que no puede haber una cancha repetida
      setFeedBack({
        ...feedBack,
        text: 'El nombre de la cancha es igual a una existente',
        color: '#F4F4F4',
        backGroundColor: '#CC3636',
        active: true,
      });
      const selectTipo = document.getElementById('cancha-add-form-select');
      setOption('');
      selectTipo.disabled = true;
      const addBtn = document.getElementById('cancha-add-form-addBtn');
      addBtn.disabled = true;
    }
  };

  const handleSelect = (e) => {
    setOption(e.target.value);
    const addBtn = document.getElementById('cancha-add-form-addBtn');
    e.target.value === ''
      ? (addBtn.disabled = true)
      : (addBtn.disabled = false);
  };

  const handleClickaddCourt = (e) => {
    //Aca meter un feedback de que la cancha se agrego correctamente
    e.preventDefault();
    setActivedLoader((prevValue) => !prevValue);
    setOption('');
    setNombreCancha('');
    setFeedBack({
      ...feedBack,
      text: '',
      color: '',
      backGroundColor: '',
      active: false,
    });
    setActived((actived) => false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ nombre: nombreCancha, tipo: option }),
    };
    fetch(`${URL_BASE}cancha`, requestOptions)
      .then((response) => response.json())
      .finally((response) => setActCanchas((v) => !v));
  };

  const handleCloseForm = () => {
    setOption('');
    setNombreCancha('');
    setActived(false);
    setFeedBack({ ...feedBack, text: '', color: '' });
  };

  const handleactivateForm = () =>{
    setActived((actived) => true);
  }
  
  return (
    <div id='canchas-component'>
      <NavBar title={'Canchas'} setSesion={setSesion}/>
      <LoaderSpinner active={activedLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
      <div id='canchas-info'>
        <button id='canchas-add-btn' onClick={handleactivateForm}> <FontAwesomeIcon icon={faPlusCircle}/> </button>
        <CanchasAddForm 
          actived={actived}
          handleCanchaNameChange={handleCanchaNameChange}
          handleSelect={handleSelect}
          handleClickaddCourt={handleClickaddCourt}
          handleCloseForm={handleCloseForm}
          feedBack={feedBack}
          nombreCancha={nombreCancha}
          option={option}
        />
        <CanchasList canchas={canchas}/>
      </div>
    </div>
  )
}
