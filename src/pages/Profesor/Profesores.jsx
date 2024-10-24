import { useState, useEffect } from 'react'

import {
  checkExistenceIn,
  ordenarPorNombre,
  validateEmail,
} from '../../components/Utils/Functions'

import NavBar from '../Navbar/NavBar'
import AgregarProfesor from '../../components/Profesor/AgregarProfesor'
import { ProfesoresList } from '../../components/Profesor/ProfesoresList'
import LoaderSpinner from '../../components/LoaderSpinner'
import { GenericLargeButton } from '../../components/Utils/GenericLargeButton'

import '../../styles/profesores.css'
import { ProfesorDetail } from '../../components/Profesor/ProfesorDetail'

export const Profesores = () => {
  const URL_BASE = `http://localhost:8083/api/`

  const feedbackStructure = {
    text: '',
    color: '',
  }

  const [active, setActive] = useState(false)

  // Profesores en detalle (edicion)
  const [activeDetail, setActiveDetail] = useState(false)
  const [profeDetail, setProfeDetail] = useState({})
  const [willEdit, setWillEdit] = useState(false)

  const [profesoresLoader, setProfesoresLoader] = useState(true) // Spinner
  const [loadingDetails, setLoadingDetails] = useState(false) // Spinner edit

  //para actualizar los profesores en la lista
  const [profesores, setProfesores] = useState([])
  const [actProfesores, setActProfesores] = useState(false)

  // Agregar profesor
  const [profesorForm, setProfesorForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    valorHora: '',
  })

  const [feedback, setFeedback] = useState({
    nombreFB: feedbackStructure,
    telefonoFB: feedbackStructure,
    emailFB: feedbackStructure,
    nombreFBCorrecto: null,
    telefonoFBCorrecto: null,
    emailFBCorrecto: null,
    valorHoraFB: { isValid: false, text: '', color: '' },
  })

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    }
    setProfesoresLoader(true); // Activa el loader antes de la petición
    fetch(`${URL_BASE}profesoress`, requestOptions)
      .then((response) => response.json())
      .then((data) => setProfesores(ordenarPorNombre(data)))
      .finally(() => setProfesoresLoader(false)); // Desactiva el loader cuando termina la petición
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actProfesores])

  // EDICION DE PROFESOR
  useEffect(() => {
    if (willEdit) {
      // Verificar el estado de profesorForm en consola antes de continuar
      console.log("Datos del formulario:", profesorForm);
      setLoadingDetails(true); // Activa el loader antes de la petición
      fetch(`${URL_BASE}profesorr?profesorId=${profeDetail.id}`)
        .then((response) => response.json())
        .then((data) => setProfeDetail(data))
        .then(
          (profesorForm.nombre = profeDetail.nombre),
          (profesorForm.email = profeDetail.email),
          (profesorForm.telefono = profeDetail.telefono),
          (profesorForm.valorHora = profeDetail.valorHora)
        )
        .then(() => setActiveDetail(true))
        .finally(() => setLoadingDetails(false)); // Desactiva el loader cuando termina la petición
    }
    // Verificar el estado de profesorForm en consola antes de continuar
    console.log("Datos del formulario:", profesorForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [willEdit])

  // AGREGAR PROFESOR
  const handleChangeName = (
    e,
    submitButtonName,
    emailInputName,
    checkDisabled
  ) => {
    const pattern = new RegExp('^[A-Z]+$', 'i')
    const word = e.target.value.split(' ').join('')

    const nombreProfesor = e.target.value
    const submitBtn = document.getElementById(submitButtonName)
    const shouldIStartDisabled = checkDisabled // Con esto pregunto, deberia considerar este valor/input?

    setProfesorForm({ ...profesorForm, [e.target.name]: nombreProfesor })
    let nextInput
    if (shouldIStartDisabled)
      nextInput = document.getElementById(emailInputName)

    if (nombreProfesor === '') {
      setFeedback({ ...feedback, nombreFB: feedbackStructure, isValid: false })
      if (shouldIStartDisabled) {
        nextInput.disabled = true
        submitBtn.disabled = true
        setFeedback({
          ...feedback,
          isValid: false,
          nombreFBCorrecto: false,
          nombreFB: { ...feedback.nombreFB, text: '', color: '' },
        })
      }
    } else {
      if (pattern.test(word)) {
        if (checkExistenceIn(profesores, 'nombre', nombreProfesor)) {
          setFeedback({
            ...feedback,
            nombreFBCorrecto: true,
            nombreFB: {
              ...feedback.nombreFB,
              isValid: true,
              text: 'El nombre de profesor es correcto',
              color: '#7CBD1E',
            },
          })
          shouldIStartDisabled && (nextInput.disabled = false)
        } else {
          setFeedback({
            ...feedback,
            nombreFBCorrecto: false,
            nombreFB: {
              ...feedback.nombreFB,
              isValid: false,
              text: 'El nombre de profesor ya existe',
              color: '#CC3636',
            },
          })
          if (shouldIStartDisabled) {
            nextInput.disabled = true
            submitBtn.disabled = true
          }
        }
      } else {
        setFeedback({
          ...feedback,
          nombreFBCorrecto: false,
          nombreFB: {
            ...feedback.nombreFB,
            isValid: false,
            text: 'Escriba un nombre de profesor sin numeros',
            color: '#CC3636',
          },
        })
        if (shouldIStartDisabled) {
          nextInput.disabled = true
          submitBtn.disabled = true
        }
      }
    }
  }

  const handleChangeEmail = (
    e,
    submitButtonName,
    telefonoInputName,
    checkDisabled
  ) => {
    const emailProfesor = e.target.value
    const submitBtn = document.getElementById(submitButtonName)
    const shouldIStartDisabled = checkDisabled // Con esto pregunto, deberia considerar este valor/input?

    setProfesorForm({ ...profesorForm, [e.target.name]: emailProfesor, isValid: false, })
    let nextInput
    if (shouldIStartDisabled)
      nextInput = document.getElementById(telefonoInputName)

    if (emailProfesor === '') {
      setFeedback({ ...feedback, emailFB: feedbackStructure })
      if (shouldIStartDisabled) {
        nextInput.disabled = true
        submitBtn.disabled = true
        setFeedback({
          ...feedback,
          isValid: false,
          emailFBCorrecto: false,
          emailFB: { ...feedback.emailFB, text: '', color: '' },
        })
      }
    } else {
      if (validateEmail(emailProfesor)) {
        if (checkExistenceIn(profesores, 'email', emailProfesor)) {
          setFeedback({
            ...feedback,
            emailFBCorrecto: true,
            emailFB: {
              ...feedback.emailFB,
              isValid: true,
              text: 'El email ingresado es correcto',
              color: '#7CBD1E',
            },
          })
          shouldIStartDisabled && (nextInput.disabled = false)
        } else {
          setFeedback({
            ...feedback,
            isValid: false,
            emailFBCorrecto: false,
            emailFB: {
              ...feedback.emailFB,
              isValid: false,
              text: 'El email ingresado ya existe',
              color: '#CC3636',
            },
          })
          if (shouldIStartDisabled) {
            nextInput.disabled = true
            submitBtn.disabled = true
          }
        }
      } else {
        setFeedback({
          ...feedback,
          emailFBCorrecto: false,
          emailFB: {
            ...feedback.emailFB,
            isValid: false,
            text: 'Ingrese una direccion de email valida',
            color: '#CC3636',
          },
        })
        if (shouldIStartDisabled) {
          nextInput.disabled = true
          submitBtn.disabled = true
        }
      }
    }
  }

  const handleChangePhone = (
    e,
    submitButtonName,
    valorHoraInput,
    checkDisabled
  ) => {
    const pattern = '^[0-9]+$'

    const submitBtn = document.getElementById(submitButtonName)
    const telefonoProfesor = e.target.value
    setProfesorForm({ ...profesorForm, [e.target.name]: telefonoProfesor })

    let nextInput = document.getElementById(valorHoraInput)
    const shouldIStartDisabled = checkDisabled

    if (telefonoProfesor === '') {
      setFeedback({ ...feedback, telefonoFB: feedbackStructure, isValid: false, })
      if (shouldIStartDisabled) {
        nextInput.disabled = true
        setFeedback({
          ...feedback,
          telefonoFBCorrecto: false,
          isValid: false,
          telefonoFB: { ...feedback.telefonoFB, text: '', color: '' },
        })
      }
    } else {
      if (
        telefonoProfesor.match(pattern) != null &&
        telefonoProfesor.length >= 7
      ) {
        setFeedback({
          ...feedback,
          telefonoFBCorrecto: true,
          telefonoFB: {
            ...feedback.telefonoFB,
            isValid: true,
            text: 'El nummero de telefono es correcto',
            color: '#7CBD1E',
          },
        })
        shouldIStartDisabled && (nextInput.disabled = false)
      } else {
        setFeedback({
          ...feedback,
          telefonoFBCorrecto: false,
          telefonoFB: {
            ...feedback.telefonoFB,
            isValid: false,
            text: 'Solo numeros, minimo 7',
            color: '#CC3636',
          },
        })
        shouldIStartDisabled && (nextInput.disabled = true)
      }
    }
  }

  const handleChangeValorHora = (e, checkDisabled) => {
    const shouldIStartDisabled = checkDisabled;
    const valorHora = parseFloat(e.target.value); // Convertir a número flotante
    setProfesorForm({ ...profesorForm, [e.target.name]: valorHora, isValid: false });

    if (valorHora > 0 && Number.isInteger(valorHora)) { // Validar que sea mayor que 0 y entero
      setFeedback({
        ...feedback,
        valorHoraFB: { isValid: true, text: 'Valor válido', color: '#7CBD1E' },
      });
    } else if (valorHora <= 0) {
      setFeedback({
        ...feedback,
        valorHoraFB: {
          isValid: false,
          text: 'El valor debe ser mayor que 0',
          color: '#CC3636',
        },
      });
    } else {
      setFeedback({
        ...feedback,
        valorHoraFB: {
          isValid: false,
          text: 'El valor debe ser un número entero',
          color: '#CC3636',
        },
      });
    }
  };

  // Si todos los feefbacks son correctos entonces habilito boton para AGREGAR PROFESOR
  useEffect(() => {
    if (
      feedback.nombreFBCorrecto &&
      feedback.emailFBCorrecto &&
      feedback.telefonoFBCorrecto &&
      feedback.valorHoraFB &&
      document.getElementById('profesor-add-form-addBtn') !== null
    ) {
      let addBtn = document.getElementById('profesor-add-form-addBtn')
      addBtn.disabled = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback])

  const submitProfesorForm = (e) => {
    e.preventDefault()
    // Verificar el estado de profesorForm en consola antes de continuar
    console.log("Datos del formulario:", profesorForm);

    setFeedback({
      nombreFB: feedbackStructure,
      telefonoFB: feedbackStructure,
      emailFB: feedbackStructure,
      valorHoraFB: feedbackStructure,
    })

    setProfesoresLoader((prevValue) => !prevValue)
    setActive(false)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: profesorForm.nombre,
        telefono: profesorForm.telefono,
        email: profesorForm.email,
        valorHora: profesorForm.valorHora,
      }),
    }

    fetch(`${URL_BASE}profesorr/add`, requestOptions)
      .then((response) => response.json())
      .then(() => setActProfesores((v) => !v))
  }

  const handleCloseForm = () => {
    setActive(false)
    clearState()
  }

  const clearState = () => {
    setProfesorForm({
      nombre: '',
      telefono: '',
      email: '',
      valorHora: '',
    });

    setFeedback({
      nombreFB: feedbackStructure,
      telefonoFB: feedbackStructure,
      emailFB: feedbackStructure,
      valorHoraFB: feedbackStructure,
      telefonoFBCorrecto: null,
      nombreFBCorrecto: null,
      emailFBCorrecto: null,
      valorHoraFB: { isValid: false, text: '', color: '' },
    })
  }

  return (
    <div id="profesores-component">
      <NavBar title={'Profesores'} />
      {profesoresLoader ? (
        <LoaderSpinner
          active={profesoresLoader}
          containerClass={'canchasLoader'}
          loaderClass={'canchasLoaderSpinner'}
        />
      ) : (
        <div id="profesores-component-mainContent">
          <GenericLargeButton
            title={'Crear nuevo profesor'}
            doSomething={() => setActive(true)}
          />
          <AgregarProfesor
            active={active}
            handleCloseForm={handleCloseForm}
            handleChangeName={handleChangeName}
            handleChangeEmail={handleChangeEmail}
            handleChangePhone={handleChangePhone}
            handleChangeValorHora={handleChangeValorHora}
            feedback={feedback}
            submitProfesorForm={submitProfesorForm}
          />


          <div id="profesores-list-component">
            <ProfesorDetail
              activeDetail={activeDetail}
              setActiveDetail={setActiveDetail}
              setProfeDetail={setProfeDetail}
              profeDetail={profeDetail}
              handleChangeName={handleChangeName}
              handleChangePhone={handleChangePhone}
              handleChangeEmail={handleChangeEmail}
              handleChangeValorHora={handleChangeValorHora}
              feedback={feedback}
              setProfesorForm={setProfesorForm}
              profesorForm={profesorForm}
              clearState={clearState}
              setWillEdit={setWillEdit}
              setActProfesores={setActProfesores}
            />
            <ProfesoresList
              profesores={profesores}
              setProfeDetail={setProfeDetail}
              profeDetail={profeDetail}
              setWillEdit={setWillEdit}
              setLoadingDetails={setLoadingDetails}
              loadingDetails={loadingDetails}
            />
          </div>

        </div>)}
    </div>
  )
}
