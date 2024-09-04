import React, { useState, useEffect } from 'react'

import { checkExistenceIn, ordenarPorNombre, validateEmail } from '../../components/Utils/Functions' 

import NavBar from '../Navbar/NavBar'
import AgregarProfesor from '../../components/Profesor/AgregarProfesor'
import { ProfesoresList } from '../../components/Profesor/ProfesoresList'
import LoaderSpinner from '../../components/LoaderSpinner'
import { GenericLargeButton } from '../../components/Utils/GenericLargeButton'

import '../../styles/profesores.css'
import { ProfesorDetail }  from '../../components/Profesor/ProfesorDetail'

export const Profesores = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const feedbackStructure = {
    text: '',
    color: ''
  }

  const [active, setActive] = useState(false);

  // Profesores en detalle (edicion)
  const [activeDetail, setActiveDetail] = useState(false)
  const [profeDetail, setProfeDetail] = useState({});
  const [willEdit, setWillEdit] = useState(false)

  const [profesoresLoader, setProfesoresLoader] = useState(true); // Spinner
  const [loadingDetails, setLoadingDetails] = useState(false) // Spinner edit

  //para actualizar los profesores en la lista
  const [profesores, setProfesores] = useState([]);
  const [actProfesores, setActProfesores] = useState(false);
  
  // Agregar profesor
  const [profesorForm, setProfesorForm] = useState({
    nombre: '',
    telefono: '',
    email: ''
  })

  const [feedback, setFeedback] = useState({
    nombreFB: feedbackStructure,
    telefonoFB: feedbackStructure,
    emailFB: feedbackStructure,
    nombreFBCorrecto: null,
    telefonoFBCorrecto: null,
    emailFBCorrecto: null
  })

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}profesoress`, requestOptions)
      .then((response) => response.json())
      .then((data) => setProfesores(ordenarPorNombre(data)))
      .then(() => setProfesoresLoader(() => false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actProfesores]);

    // EDICION DE PROFESOR 
    useEffect(() => {
      if (willEdit) {
        fetch(`${URL_BASE}profesorr?profesorId=${profeDetail.id}`)
          .then((response) => response.json())
          .then((data) => setProfeDetail(data))
          .then(profesorForm.nombre = profeDetail.nombre,
             profesorForm.email = profeDetail.email, profesorForm.telefono = profeDetail.telefono)
          .then(() => setActiveDetail(true))
          .then(() => setLoadingDetails(false));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [willEdit]);

  // AGREGAR PROFESOR
  const handleChangeName = (e, submitButtonName, emailInputName, checkDisabled) => {
    const pattern = new RegExp('^[A-Z]+$', 'i');
    const word = e.target.value.split(' ').join('');
    
    const nombreProfesor = e.target.value;
    const submitBtn = document.getElementById(submitButtonName)
    const shouldIStartDisabled = checkDisabled; // Con esto pregunto, deberia considerar este valor/input?

    setProfesorForm({...profesorForm, [e.target.name]: nombreProfesor})
    let nextInput;
    if (shouldIStartDisabled) nextInput = document.getElementById(emailInputName);

    if (nombreProfesor === '') {
      setFeedback({...feedback, nombreFB: feedbackStructure})
      if (shouldIStartDisabled){
        nextInput.disabled = true;
        submitBtn.disabled = true;
        setFeedback({...feedback, nombreFBCorrecto:false, nombreFB:{...feedback.nombreFB, text:'', color:''}})
      }
    } else {
      if (pattern.test(word)) {
        if (checkExistenceIn(profesores, "nombre", nombreProfesor)) {
          setFeedback({...feedback, nombreFBCorrecto:true, nombreFB: {...feedback.nombreFB, text: 'El nombre de profesor es correcto', color: '#7CBD1E'}})
          shouldIStartDisabled && (nextInput.disabled = false);
        } else {
          setFeedback({...feedback, nombreFBCorrecto:false, nombreFB: {...feedback.nombreFB, text: 'El nombre de profesor ya existe', color: '#CC3636'}})
          if (shouldIStartDisabled) {
            nextInput.disabled = true;
            submitBtn.disabled = true;
          } 
        }
      } else{
        setFeedback({...feedback, nombreFBCorrecto:false, nombreFB: {...feedback.nombreFB, text: 'Escriba un nombre de profesor sin numeros', color: '#CC3636'}})
        if (shouldIStartDisabled) {
          nextInput.disabled = true;
          submitBtn.disabled = true;
        } 
      }
    }
  };    

  const handleChangeEmail = (e, submitButtonName, telefonoInputName, checkDisabled) => {    
    const emailProfesor = e.target.value;
    const submitBtn = document.getElementById(submitButtonName)
    const shouldIStartDisabled = checkDisabled; // Con esto pregunto, deberia considerar este valor/input?

    setProfesorForm({...profesorForm, [e.target.name]: emailProfesor})
    let nextInput;
    if (shouldIStartDisabled) nextInput = document.getElementById(telefonoInputName);

    if (emailProfesor === '') {
      setFeedback({...feedback, emailFB: feedbackStructure})
      if (shouldIStartDisabled){
        nextInput.disabled = true;
        submitBtn.disabled = true;
        setFeedback({...feedback, emailFBCorrecto:false, emailFB:{...feedback.emailFB, text:'', color:''}})
      }
    } else {
      if (validateEmail(emailProfesor)) {
        if (checkExistenceIn(profesores, "email", emailProfesor)) {
          setFeedback({...feedback, emailFBCorrecto:true, emailFB: {...feedback.emailFB, text: 'El email ingresado es correcto', color: '#7CBD1E'}})
          shouldIStartDisabled && (nextInput.disabled = false);
        } else {
          setFeedback({...feedback, emailFBCorrecto:false, emailFB: {...feedback.emailFB, text: 'El email ingresado ya existe', color: '#CC3636'}})
          if (shouldIStartDisabled) {
            nextInput.disabled = true;
            submitBtn.disabled = true;
          } 
        }
      } else{
        setFeedback({...feedback, emailFBCorrecto:false, emailFB: {...feedback.emailFB, text: 'Ingrese una direccion de email valida', color: '#CC3636'}})
        if (shouldIStartDisabled) {
          nextInput.disabled = true;
          submitBtn.disabled = true;
        } 
      }
    }
  };    

  const handleChangePhone = (e, submitButtonName, checkDisabled) => {
    const pattern = '^[0-9]+$';

    const telefonoProfesor = e.target.value;
    setProfesorForm({...profesorForm, [e.target.name]: telefonoProfesor})

    let submitBtn = document.getElementById(submitButtonName);
    const shouldIStartDisabled = checkDisabled;

    if (telefonoProfesor === '') {
      setFeedback({...feedback, telefonoFB: feedbackStructure})
      if(shouldIStartDisabled){
        submitBtn.disabled = true;
        setFeedback({...feedback, telefonoFBCorrecto:false, telefonoFB:{...feedback.telefonoFB, text:'', color:''}})
      }
    } else {
      if (telefonoProfesor.match(pattern) != null && telefonoProfesor.length >= 7) {
        setFeedback({...feedback, telefonoFBCorrecto: true, telefonoFB: {...feedback.telefonoFB, text: 'El nummero de telefono es correcto', color: '#7CBD1E'}})
        shouldIStartDisabled && (submitBtn.disabled = false);
      } else {
        setFeedback({...feedback,  telefonoFBCorrecto: false, telefonoFB: {...feedback.telefonoFB, text: 'Solo numeros, minimo 7', color: '#CC3636'}})
        shouldIStartDisabled && (submitBtn.disabled = true);
      }
    }
  };
  
  // Si todos los feefbacks son correctos entonces habilito boton para AGREGAR PROFESOR
  useEffect(() => {
    if (feedback.nombreFBCorrecto && feedback.emailFBCorrecto && feedback.telefonoFBCorrecto
      && document.getElementById('profesor-add-form-addBtn') !== null) {
      let addBtn = document.getElementById('profesor-add-form-addBtn');
      addBtn.disabled = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback]);

  const submitProfesorForm = (e) => {
    e.preventDefault();
    setFeedback({
      nombreFB:feedbackStructure,
      telefonoFB: feedbackStructure,
      emailFB: feedbackStructure
    })

    setProfesoresLoader((prevValue) => !prevValue);
    setActive(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        nombre: profesorForm.nombre,
        telefono: profesorForm.telefono,
        email: profesorForm.email,
      }),
    };

    fetch(`${URL_BASE}profesorr`, requestOptions)
      .then((response) => response.json())
      .then(() => setActProfesores((v) => !v));
  };

  const handleCloseForm = () => {
    setActive(false);
    clearState()
  };

  const clearState = () => {
    setProfesorForm({ 
      nombre: '',
      telefono: '',
      email: ''
     });

     setFeedback({
      nombreFB:feedbackStructure,
      telefonoFB: feedbackStructure,
      emailFB: feedbackStructure,
      telefonoFBCorrecto: null,
      nombreFBCorrecto: null,
      emailFBCorrecto:null
     })
  };

  return (
    <div id='profesores-component'>
        <NavBar title={'Profesores'} setSesion={setSesion}/>
        <div id='profesores-component-mainContent'>
          <GenericLargeButton title={"Crear nuevo profesor"} doSomething={() => setActive(true)}/>          
            <AgregarProfesor 
              active={active} handleCloseForm={handleCloseForm} handleChangeName={handleChangeName} handleChangeEmail={handleChangeEmail}
              handleChangePhone={handleChangePhone} feedback={feedback} submitProfesorForm={submitProfesorForm}
            />
            
            {profesoresLoader ?  
              <LoaderSpinner active={profesoresLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
            :
            <div id="profesores-list-component">
              <ProfesorDetail activeDetail={activeDetail} setActiveDetail={setActiveDetail} 
                setProfeDetail={setProfeDetail} profeDetail={profeDetail}
                handleChangeName={handleChangeName} handleChangePhone={handleChangePhone} handleChangeEmail={handleChangeEmail}
                feedback={feedback} setProfesorForm={setProfesorForm} profesorForm={profesorForm} clearState={clearState}
                setWillEdit={setWillEdit} setActProfesores={setActProfesores}
              />
              <ProfesoresList profesores={profesores} setProfeDetail={setProfeDetail} profeDetail={profeDetail}
                setWillEdit={setWillEdit} setLoadingDetails={setLoadingDetails} loadingDetails={loadingDetails}
              />
            </div>
        }
        </div>
    </div>
  )
}
