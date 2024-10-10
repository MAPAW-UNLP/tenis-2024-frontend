import { getCanchas } from 'api/canchas'
import NotFound404 from 'components/NotFound404/NotFound404'
import NavBar from 'pages/Navbar/NavBar'
import { useEffect, useState } from 'react'

export default function HomeProfesor() {
  const [canchas, setCanchas] = useState([])
  const [clasesProfesor, setClasesProfesor] = useState([])

  useEffect(() => {
    getCanchas().then((data) => setCanchas(data.detail))
  })

  return (
    <div id="home-component">
      <NavBar title={'Profesor'} />
      <div style={{ marginTop: '6rem' }}>
        <NotFound404
          title="¡Oops! No encontramos canchas de tenis"
          description="Parece que todavía no hay canchas de tenis disponibles en este complejo. No te preocupes, puedes consultar con el administrador para más información."
        />
      </div>
    </div>
  )
}
