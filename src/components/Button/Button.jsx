import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Button.css'

// No se pueden separar las uniones en varias líneas porque se rompe el
// intellisense de vscode.
/**
 * @typedef {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'} ButtonColor
 * Define el color del botón, eligiendo entre estilos predefinidos.
 *
 * @typedef {'normal' | 'outline' | 'link'} ButtonVariant
 * Define la variante visual del botón:
 * - `normal` para un botón sólido
 * - `outline` para uno con borde
 * - `link` para un botón que luce como un enlace.
 *
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 * Define el tamaño del botón, permitiendo las siguientes opciones: `sm` (pequeño), `md` (mediano), `lg` (grande)
 *
 * @typedef {'center' | 'between'} ButtonAlignment
 * Controla la alineación del contenido del botón, donde `center` centra los elementos y `between` los distribuye con espacio entre ellos.
 *
 * @typedef {Object} CustomButtonProps
 * @property {ButtonColor} [color='primary'] Color del botón, predeterminado a `primary`.
 * @property {ButtonVariant} [variant='normal'] Variante del botón, predeterminado a `normal`.
 * @property {ButtonSize} [size='md'] Tamaño del botón, predeterminado a `md`.
 * @property {ButtonAlignment} [alignment='center'] Alineación del contenido, predeterminado a `center`.
 * @property {import('@fortawesome/fontawesome-svg-core').IconProp} [faIconStart] Icono de FontAwesome que se muestra al inicio del botón, si se proporciona.
 * @property {import('@fortawesome/fontawesome-svg-core').IconProp} [faIconEnd] Icono de FontAwesome que se muestra al final del botón, si se proporciona.
 * @property {React.ReactNode} children Contenido del botón, generalmente texto o componentes React.
 *
 * @typedef {CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps
 * Extiende las propiedades estándar de HTML para botones, permitiendo el uso de atributos como `onClick`, `disabled`, `style`, etc.
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
