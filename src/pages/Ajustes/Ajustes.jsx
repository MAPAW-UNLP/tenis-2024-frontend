import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar/NavBar';

import '../../styles/ajustes/ajustes.css';
import { GenericButton } from '../../components/Utils/GenericButton';
import LoaderSpinner from '../../components/LoaderSpinner';

export const Ajustes = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;
  const [profesores, setProfesores] = useState([]);
  const [tipoClases, setTipoClases] = useState([])
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_BASE}profesoress`, requestOptions);
        const data = await response.json();
        setProfesores(data);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener datos desde la BD', error);
        setCargando(false);
      }
    };

    const fetchTipoClases = async () => {
      try {
        const response = await fetch(`${URL_BASE}clases`, requestOptions);
        const data = await response.json();
        setTipoClases(data);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener datos desde la BD', error);
        setCargando(false);
      }
    }

    fetchTipoClases();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler para guardar los valores en el estado de profesor (con el nuevo valor en caso de ser cambiado)
  const handleProfesorChange = (nombre, valor) => {
    setProfesores((prevProfesores) => {
      const nuevosProfesores = prevProfesores.map((profesor) =>
        profesor.nombre === nombre.nombre ? { ...profesor, valor: valor.substring(1) } : profesor
      );
      return nuevosProfesores;
    });
  };

  // Handler para actualizar (de ser necesario) los valores de los importes de las clases
  const handleTipoClaseChange = (tipo, valor) => {
    setTipoClases((prevTipoClases) => {
      const nuevosTipoClase = prevTipoClases.map((tipoClase) =>
      tipoClase.tipo === tipo.tipo ? { ...tipoClase, importe: valor.substring(1) } : tipoClase
      );
      return nuevosTipoClase;
    });
  };

  // Handler para actualizar el valor por defecto que viene desde la configuracion
  const handleDefaultValueChange = (nombre, valor) => {

  };

  return (
    <>
      <div id='ajustes-component'>
        <NavBar title={'Ajustes'} setSesion={setSesion} />
        {cargando
          ? <LoaderSpinner active={cargando} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
          :

          <div className='container-ajustes' style={{ backgroundColor: '#ffffff' }}>
            <div className='table-head-ajustes'><span style={{ fontSize: '1.8em' }}>Valores</span></div>
            <div className='container-table-ajustes'>

              {/* Lista de tipos de clase */}
              <div style={{
                display: 'flex', justifyContent: 'space-around', backgroundColor: '#78a1ca', borderRadius: '1em', marginBottom: '.5em', height: '2.5em'
              }}>
                <div className='table-cell-ajustes' style={{ alignSelf: 'center', fontFamily: 'var(--title-text)', color: 'var(--neutral-white-text)', fontSize: '1.2em' }}>Tipo de clase</div>
                <div className='table-cell-ajustes' style={{ alignSelf: 'center', fontFamily: 'var(--title-text)', color: 'var(--neutral-white-text)', fontSize: '1.2em' }}>Valor</div>
              </div>

              {tipoClases.map((tipoClase) => (
                <div className='table-row-ajustes' key={`tipoClase-${tipoClase.id}`}>
                  <div className='table-cell-ajustes' style={{ color: '#5d5d5d' }}>{tipoClase.tipo}</div>
                  <div className='table-cell-ajustes' style={{ color: '#5d5d5d' }}>
                    <input type='text'
                      className='table-input-ajustes'
                      style={{ backgroundColor: '#d9d9d9', border: 'none', color: '#5d5d5d', fontSize: 'inherit' }}
                      value={'$' + (tipoClase.importe || '')}
                      onChange={(e) => handleTipoClaseChange(tipoClase, e.target.value)}
                    />
                  </div>
                </div>
              ))}

              {/* Lista de profesores */}
              <div style={{
                display: 'flex', justifyContent: 'space-around', backgroundColor: '#78a1ca', borderRadius: '1em', marginTop: '1em', marginBottom: '.5em', height: '2.5em'
              }}>
                <div className='table-cell-ajustes' style={{ alignSelf: 'center', fontFamily: 'var(--title-text)', color: 'var(--neutral-white-text)', fontSize: '1.2em' }} >Profesor</div>
                <div className='table-cell-ajustes' style={{ alignSelf: 'center', fontFamily: 'var(--title-text)', color: 'var(--neutral-white-text)', fontSize: '1.2em' }}>Valor de hora</div>
              </div>

              <div className='table-row-ajustes'>
                <div className='table-cell-ajustes' style={{ color: '#5d5d5d' }}>Valor por defecto</div>
                <div className='table-cell-ajustes' style={{ color: '#5d5d5d' }}>
                  <input type='text'
                    className='table-input-ajustes'
                    style={{ backgroundColor: '#d9d9d9', border: 'none', color: '#5d5d5d', fontSize: 'inherit' }}
                    value={'$1000'}
                    onChange={(e) => handleDefaultValueChange(e)}
                  />
                </div>
              </div>
              {profesores.map((profesor) => (
                <div className='table-row-ajustes' key={`profesor-${profesor.id}`}>
                  <div className='table-cell-ajustes' style={{ color: '#5d5d5d' }}>{profesor.nombre}</div>
                  <div className='table-cell-ajustes' style={{ color: '#5d5d5d' }}>
                    <input type='text'
                      className='table-input-ajustes'
                      style={{ backgroundColor: '#d9d9d9', border: 'none', color: '#5d5d5d', fontSize: 'inherit' }}
                      value={'$' + (profesor.valor || '')}
                      onChange={(e) => handleProfesorChange(profesor, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <GenericButton marginBottom={"1.5em"} backgroundColor={'#92bc1e'} color="white" borderRadius="1em" width="20em" 
              centrado onClick={() => console.log('Jeje')}>
              Confirmar cambios
            </GenericButton>
          </div>
        }
      </div>
    </>
  );
};
