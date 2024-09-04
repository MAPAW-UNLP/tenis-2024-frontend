import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//components
import FeedbackText from '../FeedbackText';
import LoaderSpinner from '../LoaderSpinner';

const LoginForm = ({ setSesion }) => {
  const URL_BASE = 'http://localhost:8083/api/';

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const [active, setActive] = useState(false);
  const [activeLoader, setActiveLoader] = useState(false);
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUser(e.target.value);
    const passInput = document.getElementById('input-pass');
    if (e.target.value === '') {
      passInput.disabled = true;
      setActive(false);
      setPass('');
      const loginBtn = document.getElementById('login-btn');
      e.target.value === ''
        ? (loginBtn.disabled = true)
        : (loginBtn.disabled = false);
    } else passInput.disabled = false;
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
    setActive(false);
    const loginBtn = document.getElementById('login-btn');
    e.target.value === ''
      ? (loginBtn.disabled = true)
      : (loginBtn.disabled = false);
  };

  const habldeSubmit = (e) => {
    e.preventDefault();

    setActiveLoader(true);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ user: user, password: pass }),
    };
    fetch(`${URL_BASE}usuario`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.rta === 'ok') {
          localStorage.setItem('sesion', 'sesionIniciada');
          setSesion('sesion Iniciada :D');
          setActiveLoader(false);
          navigate('../inicio');
        } else {
          setActive(true);
          const loginBtn = document.getElementById('login-btn');
          loginBtn.disabled = true;
          setActiveLoader(false);
        }
      });
  };

  return (
    <div id="login-form-div">
      <h2> Tennis app</h2>
      <form action="" id="login-form" onSubmit={habldeSubmit}>
        <input
          type="text"
          name=""
          id="input-name"
          className="login-form-input"
          value={user}
          placeholder="Nombre de usuario"
          onChange={handleUserNameChange}
        />
        <input
          type="password"
          name=""
          id="input-pass"
          className="login-form-input"
          value={pass}
          placeholder="Contraseña"
          onChange={handlePassChange}
          disabled
        />
        <FeedbackText
          text={'El usuario o contraseña es invalido'}
          color={'#F4F4F4'}
          backGroundColor={'#CC3636'}
          active={active}
        />

        <button
          type="submit"
          id="login-btn"
          className="login-form-btn"
          disabled
        >
          Iniciar Sesion
          {
            <LoaderSpinner
              active={activeLoader}
              containerClass={'contenedorLogin'}
              loaderClass={'loader'}
            />
          }
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
