import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './Modal.css'
import React, { useEffect } from 'react'

/**
 * @typedef {Object} ModalProps
 * @property {boolean} isVisible
 * @property {() => void} onClose
 * @property {boolean} [showHeader]
 * @property {string | React.ReactNode} [title]
 * @property {string} [bodyClassName]
 * @property {React.CSSProperties} [bodyStyle]
 * @property {React.ReactNode} children
 *
 * @param {ModalProps} props
 * @returns
 */
function Modal({
  isVisible,
  onClose,
  showHeader = true,
  title,
  bodyClassName = '',
  bodyStyle = {},
  children,
}) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') onClose()
    }

    if (isVisible) {
      // Evita que se pueda hacer scroll en el body:
      document.body.style.overflow = 'hidden'
      // Permite cerrar el modal presionando la tecla 'esc':
      window.addEventListener('keydown', handleEsc)
    }

    // Limpia los estilos y el evento al cerrar el modal
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  function handleWrapperClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="modal-wrapper"
      onClick={handleWrapperClick}
      // Para mejorar la accesibilidad:
      role="button"
      tabIndex="0"
    >
      <div className="modal">
        {showHeader && (
          <div className="modal__header">
            {typeof title === 'string' ? (
              <h3 className="modal__title">{title}</h3>
            ) : (
              title
            )}
            <button className="modal__close-btn" onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        )}
        <div
          style={{ ...bodyStyle }}
          className={`modal__body ${bodyClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
