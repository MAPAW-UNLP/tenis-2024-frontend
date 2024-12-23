import Chart from 'chart.js/auto'
import CalendarPicker from 'components/Reserva/CalendarComponent'
import React, { useEffect, useRef, useState } from 'react'
import './Estadisticas.css'
import Button from 'components/Button/Button'

function Estadisticas() {
  const URL_BASE = `http://localhost:8083/api/`

  const chartRef = useRef(null)
  const chartInstance = useRef(null) // Creamos un ref para almacenar la instancia del gráfico

  const [clases, setClases] = useState(null)
  const [fechaDesde, setFechaDesde] = useState(new Date())
  const [fechaHasta, setFechaHasta] = useState(new Date())
  const [profesores, setProfesores] = useState([])
  const [profesor, setProfesor] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    }
    setLoading(true)
    fetch(`${URL_BASE}profesoress`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProfesores(data)
        if (data.length > 0) {
          setProfesor('-1')
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const obtenerEstadisticasProfesor = async (profesorId) => {
    let fd = typeof fechaDesde == 'number' ? new Date(fechaDesde) : fechaDesde
    let fh = typeof fechaHasta == 'number' ? new Date(fechaHasta) : fechaHasta
    const res = await fetch(
      `http://localhost:8083/api/historial-profesor-mes?fechaDesde=${fd.toISOString().split('T')[0]}&fechaHasta=${fh.toISOString().split('T')[0]}&profesor_id=${profesorId}`
    )
    const result = await res.json()
    return result.data
  }

  useEffect(() => {
    if (clases == null) {
      return
    }
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // const labels = clases.map(c => c.nombre)
    const nombres = clases.map((d) => d.nombre)

    // Extraer las clases individuales y grupales
    const clasesIndividuales = clases.map((d) => d.individual)
    const clasesGrupales = clases.map((d) => d.grupal)

    // Definir los colores de las barras
    const backgroundColors = [
      'rgba(255, 99, 132, 0.2)', // Individual
      'rgba(54, 162, 235, 0.2)', // Grupal
    ]
    const borderColors = [
      'rgb(255, 99, 132)', // Individual
      'rgb(54, 162, 235)', // Grupal
    ]
    const data = {
      labels: nombres,
      datasets: [
        {
          label: 'Clases Individuales',
          data: clasesIndividuales, // Datos de las clases individuales
          backgroundColor: backgroundColors[0],
          borderColor: borderColors[0],
          borderWidth: 1,
        },
        {
          label: 'Clases Grupales',
          data: clasesGrupales, // Datos de las clases grupales
          backgroundColor: backgroundColors[1],
          borderColor: borderColors[1],
          borderWidth: 1,
        },
      ],
    }

    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      chartInstance.current = new Chart(ctx, config)
    }

    // Limpieza del gráfico cuando el componente se desmonta
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [clases])

  const handleClickBuscar = (e) => {
    e.preventDefault()
    console.log('hola')
    setLoading(true)
    obtenerEstadisticasProfesor(profesor)
      .then((data) => {
        setClases(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  return (
    <div>
      <div className="filtros-estadisticas">
        {profesor ? (
          <>
            <div>
              <label htmlFor="entidad" style={{ color: 'white' }}>
                Profesor:
              </label>
              <select
                style={{ padding: 5 }}
                name="entidad"
                value={profesor}
                onChange={(e) => setProfesor(e.target.value)}
              >
                <option value="-1">Todos los profesores</option>
                {profesores.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <label style={{ color: 'white' }}>Fecha desde:</label>
              <CalendarPicker
                selectedDate={fechaDesde}
                setSelectedDate={setFechaDesde}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <label style={{ color: 'white' }}>Fecha desde:</label>
              <CalendarPicker
                selectedDate={fechaHasta}
                setSelectedDate={setFechaHasta}
              />
            </div>
            <Button onClick={handleClickBuscar}>Buscar</Button>
          </>
        ) : !loading ? (
          <p>No hay profesores registrados</p>
        ) : (
          <></>
        )}
      </div>

      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="spinner"></div>
        </div>
      ) : clases ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{ width: 750, height: 400, backgroundColor: 'whitesmoke' }}
          >
            <div style={{ width: 700, height: 400 }}>
              <canvas ref={chartRef} id="myChart"></canvas>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Estadisticas
