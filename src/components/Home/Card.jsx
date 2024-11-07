import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

const Card = ({
  title,
  description,
  customColor = '#ee82ee',
  icon,
  className,
}) => {
  const navigate = useNavigate()

  const handleRedirect = (link) => {
    navigate(link)
  }

  return (
    <div
      className={`card ${className}`}
      onClick={() => handleRedirect(`../${title}`)}
    >
      <div
        className="image"
        style={{ backgroundColor: customColor, position: 'relative' }}
      >
        <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
      <div className="content">
        <span className="title" style={{ color: customColor }}>
          {title}
        </span>

        <p className="desc">{description}</p>
      </div>
    </div>
  )
}

export default Card
