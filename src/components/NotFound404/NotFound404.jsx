import PelotitaTristre from 'Img/pelotita-triste.png'

import './NotFound404.css'

function NotFound404({ title, description, btnText, onCallToAction }) {
  return (
    <div className="not-found-container">
      <div className="not-found__text">
        <h3 className="not-found__title">{title}</h3>
        <p className="not-found__description">{description}</p>
        <div className="not-found__btn-container">
          <button className="not-found__btn" onClick={onCallToAction}>
            {btnText}
          </button>
        </div>
      </div>
      <div className="not-found__img">
        <img src={PelotitaTristre} alt="Pelotita triste" />
      </div>
    </div>
  )
}
export default NotFound404
