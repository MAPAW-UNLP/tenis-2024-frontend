import React, { useState, useEffect } from 'react'
import { BalanceTable } from '../../components/Movimiento/BalanceTable'
import InputReComponent from '../../components/Utils/InputReComponent'
import { ordenarPorNombre } from '../../components/Utils/Functions'
import LoaderSpinner from '../../components/LoaderSpinner'
import NavBar from '../Navbar/NavBar'

import '../../styles/movimiento/movimiento.css'
import NoData from '../../Img/noData.png'

export const Balance = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [actMovimientos, setActMovimientos] = useState(false);

  // Estado para 'movimientos' y 'total' de balance
  const [balance, setBalance] = useState();

  const [movimientosLoader, setMovimientosLoader] = useState(true); // Spinner
  const [filtrarSpinner, setFiltarSpinner] = useState(false)

  // Dia formateado para HTML
  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const año = new Date().getFullYear();
  const today = `${año}-${mes}-${day}`;

  // Datos usados para el filtro de busqueda en balance
  const [datos, setDatos] = useState({
    fechaInicio: today,
    fechaFin: today,
    descripcion: ''
  })

  // Funcion para manejar el ingreso (input) de opciones en el filtrado
  const handleFiltro = (event) => {
    setDatos({ ...datos, [event.target.name]: event.target.value })
  }

  // Funcion para manejar el envio de datos en el filtrado
  const handleFiltrado = () => {
    if (!datos.fechaInicio) datos.fechaInicio = today
    if (!datos.fechaFin) datos.fechaFin = today
    setActMovimientos((value) => !value)
    setFiltarSpinner(true)
  }

  // Trae los datos necesarios desde la BD
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(`${URL_BASE}balance-en-fecha?fecha_inicio=${datos.fechaInicio}&fecha_fin=${datos.fechaFin}&descripcion=${datos.descripcion}`,
      requestOptions)
      .then((response) => response.json())
      .then((data) => setBalance(data))
      .then(() => setMovimientosLoader(() => false))
      .then(() => setFiltarSpinner(() => false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actMovimientos]);

  // Spinner filtrado
  const LoadingSpinner = () => {
    return (
      <div style={{display:'inline-block', width:'24px', height:'24px',
      borderTopColor:'rgb(255, 255, 255)', borderRightColor:'rgba(255, 255, 255, 0.4)', borderBottomColor:'rgba(255, 255, 255, 0.4)',
      borderLeftColor:'rgba(255, 255, 255, 0.4)', borderWidth:'3px', borderStyle:'solid', borderImage:'none', borderRadius: '50%',
      animation: 'spin 1s ease-in-out infinite', WebkitAnimation:'spin 1s ease-in-out infinte'}} />
    )
  }


  return (
    <div className='movimiento-component'>
      <NavBar title={'Balance general'} setSesion={setSesion} />
      <div className='movimiento-component-mainContent'>
        {movimientosLoader ?
          <LoaderSpinner active={movimientosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
          :
          <>
            <div className="balance-container">
              <div className='balance-head'>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%' }}>
                  <span style={{ marginRight: '.5em' }}>Filtros</span>
                  <InputReComponent type={'date'} name={'fechaInicio'} id={'fechaInicio'} className={'input-date-balance'} placeholder={'Fecha'}
                    onChangeFuncion={handleFiltro}
                  />
                  <InputReComponent type={'date'} name={'fechaFin'} id={'fechaFin'} className={'input-date-balance'} placeholder={'Fecha'}
                    onChangeFuncion={handleFiltro}
                  />
                  <InputReComponent type={'text'} name={'descripcion'} id={'balanceDesc'} className={'input-text-balance'} placeholder={'Descripcion'}
                    onChangeFuncion={handleFiltro}
                  />
                </div>
                <button className='button-balance-head' onClick={handleFiltrado}>
                  {filtrarSpinner
                    ? <LoadingSpinner/>
                    : 'Filtar'
                  }
                </button>
              </div>
            </div>

            {balance.movimientos.length === 0
              ?
              <div style={{ marginBottom: '10em', marginTop: '1.3em' }}>
                <img alt="Balance sin datos" style={{ height: "25em" }} src={NoData} />
                <p style={{ textAlign: 'center', fontSize: '1.4em', fontFamily: 'var(--normal-text)', color: 'white', marginTop: '-1em' }}>
                  No hay movimientos registrados en el rango ingresado
                </p>
                <p style={{ textAlign: 'center', marginTop: '.2em', fontSize: '1.1em', fontWeight: 'bold', fontFamily: 'var(--normal-text)', color: 'white' }}>
                  {datos.fechaInicio} ---- {datos.fechaFin}
                </p>
              </div>
              : <BalanceTable balance={balance} />
            }
          </>
        }
      </div>
    </div>
  )
}
