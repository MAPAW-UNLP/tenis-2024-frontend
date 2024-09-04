import React from 'react'
//react tools
import {Link} from 'react-router-dom'
import { useEffect } from 'react';

/* Components */
import LinkItem from '../../components/LinkItem';

import '../../styles/navbar.css'
import { useState } from 'react';

const NavBar = ({title, setSesion}) => {
    const [active, setActive] = useState('link');
    
    useEffect(() =>{
        //cambia la clase active del nav y se las saca a los que no lo tienen
        var pathName = window.location.pathname.replace('/', '').split(" ").join(" ");
        pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);
        const links = Array.from(document.getElementsByClassName('link'));
        links.map(el => {
            if(el.innerHTML === pathName) el.className += ' active';
            else{ el.className = 'link'}
        })
    }, [active])

    const handleCloseSesion = ()=>{
        localStorage.setItem('sesion', '');
        setSesion('')
    }
  return (
      <div id='navBar-component'>
          <div id='navBar-transparent'></div>
          <nav id='navBar'>
              <ul id='navBar-list'  >
                  <LinkItem to={'/inicio'}  setActive={setActive} name={'Inicio'}/>
                  <LinkItem to={'/canchas'}  setActive={setActive} name={'Canchas'}/>
                  <LinkItem to={'/reservas'}  setActive={setActive} name={'Reservas'}/>
                  <LinkItem to={'/alumnos'} setActive={setActive} name={'Alumnos'} />
                  <LinkItem to={'/profesores'} setActive={setActive} name={'Profesores'} />
                  <LinkItem to={'/crearClase'}  setActive={setActive} name={'Crear clase'}/>
                  <LinkItem to={'/movimientos'} setActive={setActive} name={'Movimientos'} />
                  <LinkItem to={'/ajustes'} setActive={setActive} name={'Ajustes'} />
                  <li> <Link to="/" className='linkCerrarSesion' onClick={handleCloseSesion}>Cerrar Sesión </Link></li>
              </ul>
          </nav>
          <h1>{title}</h1>        
      </div>
  )
}

export default NavBar