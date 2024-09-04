import React, {useState, useEffect} from 'react'
import NavBar from '../Navbar/NavBar'
import AgregarAlumno from '../../components/Alumno/AgregarAlumno'
import AlumnosList from '../../components/Alumno/AlumnosList'
import LoaderSpinner from '../../components/LoaderSpinner'
import { GenericLargeButton } from '../../components/Utils/GenericLargeButton'
 
import AlumnoDetail from '../../components/Alumno/AlumnoDetail' 

import '../../styles/alumnos.css';

const Users = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [alumnos, setAlumnos] = useState([]);
  const [alumnosLoader, setAlumnosLoader] = useState(true); //Spinner
  const [loadingDetails, setLoadingDetails] = useState(false) // Spinner opciones

  const [actAlumnos, setActAlumnos] = useState(false);

  const [alumnoForm, setAlumnoForm] = useState({
    nombre: '',
    telefono: '',
    nacimiento: ''
  })
  
  //feedback del input
  const [nombreFB, setNombreFB] = useState({ text: '', color: '' });
  const [telefonoFB, setTelefonoFB] = useState({ text: '', color: '' });
  
  const feedbackStructure = { text: '', color: '' }
  
  const [feedback, setFeedback] = useState({
    nombreFB: feedbackStructure,
    telefonoFB: feedbackStructure,
    nombreFBCorrecto: null,
    telefonoFBCorrecto: null
  })

  const [active, setActive] = useState(false);

  // ALUMNO DETAIL
  const [activeDetail, setActiveDetail] = useState(false);
  const [actAlu, setActAlu] = useState('');
  const [aluDetail, setAluDetail] = useState({});

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}alumnos`, requestOptions)
      .then((response) => response.json())
      .then((data) => {setAlumnos((data.length !== 0) ? ordenarPorNombre(data) : data)})
      .then(() => setAlumnosLoader((v) => false));

    /* Desactivar spinner */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actAlumnos]);

  // Este useEffect se dispara cuando traemos los datos para editar un alumno. Setea actAlu y mmuestra desplegable de edicion
  useEffect(() => {
    if (actAlu !== '') {
      fetch(`${URL_BASE}alumno?alumnoId=${actAlu.id}`)
        .then((response) => response.json())
        .then((data) => setAluDetail(data))
        .then(() => setActiveDetail(true))
        .then(() => setLoadingDetails(false))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actAlu]);

  // Metodo de ordenacion auxiliar
  const ordenarPorNombre = (datos) => {
    return datos.sort(function (a, b) {
      if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  // Metodos que son pasados a componente Agregar Alumno 
  const handleChangeName = (e, submitButtonName, telefonoInputName, checkDisabled) => {
    const pattern = new RegExp('^[A-Z]+$', 'i');
    const word = e.target.value.split(' ').join('');

    const submitBtn = document.getElementById(submitButtonName)
    const shouldIStartDisabled = checkDisabled; // Deberia considerar este valor?

    //validar que el nombre sea solo texto y que no exista repetidos
    setAlumnoForm({...alumnoForm, [e.target.name]: e.target.value});
    const nextInput = document.getElementById(telefonoInputName);

    if (e.target.value === '') {
      // setNombreFB({ ...nombreFB, text: '', color: '' });
      setFeedback({ ...feedback, nombreFBCorrecto:false, nombreFB:{...feedback.nombreFB, text:'', color:''}})
      if (shouldIStartDisabled) {
        nextInput.disabled = true;
        submitBtn.disabled = true;
      } 
    } else {
      //Cumple las expectativas de ser un nombre
      if (pattern.test(word)) {
        if (checkStudentExistence(e.target.value)) {
          setFeedback({...feedback, nombreFBCorrecto:true, nombreFB: {...feedback.nombreFB, text: 'El nombre de alumno es correcto', color: '#7CBD1E' }})
          // setNombreFB({
          //   ...nombreFB,
          //   text: 'El nombre de alumno es correcto',
          //   color: '#7CBD1E',
          // });
          shouldIStartDisabled && (nextInput.disabled = false);
        } else {
          setNombreFB({
            ...nombreFB,
            text: 'El nombre de usuario ya existe',
            color: '#CC3636',
          });
          setFeedback({...feedback, nombreFBCorrecto:false, nombreFB: {...feedback.nombreFB, text: 'El nombre de usuario ya existe', color: '#CC3636' }})
          if (shouldIStartDisabled) {
            nextInput.disabled = true;
            submitBtn.disabled = true;
          } 
        }
      } else {
        setFeedback({...feedback, nombreFBCorrecto:false, nombreFB: {...feedback.nombreFB, text: 'Escriba un nombre de usuario sin numeros', color: '#CC3636'}})
        // setNombreFB({
        //   ...nombreFB,
        //   text: 'Escriba un nombre de usuario sin numeros',
        //   color: '#CC3636',
        // });
      }
    }
  };

  const handleChangePhone = (e, submitButtonName, checkDisabled) => {
    const pattern = '^[0-9]+$';
    const tel = e.target.value;
    
    setAlumnoForm({...alumnoForm, [e.target.name]: e.target.value});
    const submitBtn = document.getElementById(submitButtonName)
    const shouldIStartDisabled = checkDisabled;

    if (tel === '') {
      setFeedback({...feedback, telefonoFB: feedbackStructure})
      // setTelefonoFB({ ...telefonoFB, text: '', color: '' });
      shouldIStartDisabled && (submitBtn.disabled = true);
    } else {
      if (tel.match(pattern) != null && tel.length >= 7) {
        setFeedback({...feedback, telefonoFBCorrecto: true, telefonoFB: {...feedback.telefonoFB, text: 'El numero de telefono es correcto', color: '#7CBD1E'}})
        // setTelefonoFB({
        //   ...telefonoFB,
        //   text: 'El nummero de telefono es correcto',
        //   color: '#7CBD1E',
        // });
        shouldIStartDisabled && (submitBtn.disabled = false);
      } else {
        setFeedback({...feedback,  telefonoFBCorrecto: false, telefonoFB: {...feedback.telefonoFB, text: 'Solo numeros, minimo 7', color: '#CC3636'}})
        // setTelefonoFB({
        //   ...telefonoFB,
        //   text: 'Solo numeros, minimo 7',
        //   color: '#CC3636',
        // });
        shouldIStartDisabled && (submitBtn.disabled = true);
      }
    }
  };

  // AGREGAR ALUMNO
  const handleSubmitAlumnoForm = (e) => {
    e.preventDefault();

    setNombreFB({ ...nombreFB, text: '', color: '' });
    setTelefonoFB({ ...telefonoFB, text: '', color: '' });
    
    setAlumnosLoader((prevValue) => !prevValue);
    setActive(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        nombre: alumnoForm.nombre,
        telefono: alumnoForm.telefono,
        fechaNac: alumnoForm.nacimiento,
      }),
    };

    fetch(`${URL_BASE}alumno`, requestOptions)
      .then((response) => response.json())
      .then(() => setActAlumnos((v) => !v))
      .then(clearState)
  };
  
  const clearState = () => {
    setAlumnoForm({ 
      nombre: '',
      telefono: '',
      nacimiento: ''
     });
    //  setNombreFB({
    //   text: '',
    //   color: ''
    //  })
    //  setTelefonoFB({
    //   text: '',
    //   color: ''
    //  })
    setFeedback({
      nombreFB: feedbackStructure,
      telefonoFB: feedbackStructure,
      telefonoFBCorrecto: null,
      nombreFBCorrecto: null,
    })
  };

  const checkStudentExistence = (student) => {
    return alumnos.map((each) => each.nombre.toUpperCase()).indexOf(student.toUpperCase()) === -1
   }

  return (
    <div id='alumnos-component'>
      <NavBar title={'Alumnos'} setSesion={setSesion}/> 
      <div id='alumnos-component-mainContent'>
        <GenericLargeButton title={"Crear nuevo alumno"} doSomething={() => setActive(true)}/>
        <AgregarAlumno 
          active={active} 
          setActive={setActive} 
          handleChangeName={handleChangeName}
          handleChangePhone={handleChangePhone}
          handleSubmitAlumnoForm={handleSubmitAlumnoForm}
          setAlumnoForm={setAlumnoForm}
          clearState={clearState}
          alumnoForm={alumnoForm}
          feedback={feedback}
        />
        {alumnosLoader ? 
          <LoaderSpinner active={alumnosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
        : 
          <>
            <div id="alumnos-list-component">
              <AlumnoDetail
                activeDetail={activeDetail}
                setActiveDetail={setActiveDetail}
                setAluDetail={setAluDetail}
                setActAlu={setActAlu}
                actAlu={actAlu}
                handleChangeName={handleChangeName}
                handleChangePhone={handleChangePhone}
                feedback={feedback}
                clearState={clearState}
                setAlumnoForm={setAlumnoForm}
                alumnoForm={alumnoForm}
                setActAlumnos={setActAlumnos}
              />
              <AlumnosList alumnos={alumnos} actAlu={actAlu} setActAlu={setActAlu} setLoadingDetails={setLoadingDetails}
                loadingDetails={loadingDetails} />
            </div>
          </>
        }
      </div>
    </div>
  ) 
}

export default Users