import Chart from 'chart.js/auto'
import CalendarPicker from 'components/Reserva/CalendarComponent'
import React, { useEffect, useRef, useState } from 'react'
import './Estadisticas.css'
import Button from 'components/Button/Button'

function EstadisticasCobros({ type = 'cobros' }) {
  const URL_BASE = `http://localhost:8083/api/`

  const chartRef = useRef(null)
  const chartInstance = useRef(null) // Creamos un ref para almacenar la instancia del gráfico

  const [cobro, setCobro] = useState(null)
  const [fechaDesde, setFechaDesde] = useState(new Date())
  const [fechaHasta, setFechaHasta] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const obtenerEstadisticasCobro = async () => {
    let fd = typeof fechaDesde == 'number' ? new Date(fechaDesde) : fechaDesde
    let fh = typeof fechaHasta == 'number' ? new Date(fechaHasta) : fechaHasta
    const res = await fetch(
      `${URL_BASE}stats-${type}?fechaDesde=${fd.toISOString().split('T')[0]}&fechaHasta=${fh.toISOString().split('T')[0]}`
    )
    const result = await res.json()
    return result
  }

  useEffect(() => {
    if (cobro == null) {
      return
    }
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const data = {
      labels: Object.keys(cobro).filter((k) => k !== 'total'),
      datasets: [
        {
          label: msg,
          data: Object.values(cobro).filter(
            (_, i) => i !== Object.keys(cobro).length - 1
          ),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    }

    const config = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'white',
            },
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
  }, [cobro])

  const handleClickBuscar = (e) => {
    e.preventDefault()
    setLoading(true)
    obtenerEstadisticasCobro()
      .then(({ message, data }) => {
        setCobro(data[0])
        setMsg(message)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  return (
    <div>
      <div className="filtros-estadisticas">
        <>
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
      ) : cobro ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 750, height: 400 }}>
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

export default EstadisticasCobros
