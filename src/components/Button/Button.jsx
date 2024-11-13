import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Button.css'

// No se pueden separar las uniones en varias líneas porque se rompe el
// intellisense de vscode.
/**
 * @typedef {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'} ButtonColor
 * @typedef {'normal' | 'outline' | 'link'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 * @typedef {'center' | 'between'} ButtonAlignment
 *
 * @typedef {Object} CustomButtonProps
 * @property {ButtonColor} [color]
 * @property {ButtonVariant} [variant]
 * @property {ButtonSize} [size]
 * @property {ButtonAlignment} [alignment]
 * @property {import('@fortawesome/fontawesome-svg-core').IconProp} [faIconStart]
 * @property {import('@fortawesome/fontawesome-svg-core').IconProp} [faIconEnd]
 * @property {React.ReactNode} children
 *
 * @typedef {CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps
 */

/**
 * @param {ButtonProps} props
 * @returns
 */
export default function Button({
  color = 'primary',
  variant = 'normal',
  size = 'md',
  alignment = 'center',
  faIconStart,
  faIconEnd,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      style={{
        ...props.style,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5em',
        justifyContent: alignment === 'center' ? 'center' : 'space-between',
      }}
      className={`btn btn--${variant} btn--${color} btn--${size} ${props?.className ?? ''}`}
    >
      {faIconStart && <FontAwesomeIcon icon={faIconStart} />}
      {children}
      {faIconEnd && <FontAwesomeIcon icon={faIconEnd} />}
    </button>
  )
}
