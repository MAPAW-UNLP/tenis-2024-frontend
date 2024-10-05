import './Dashboard.css'

function Dashboard({ children }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard">{children}</div>
      </div>
    </div>
  )
}

/**
 * @typedef {React.HTMLProps<HTMLDivElement> & {
 *   first?: boolean;
 *   sticky?: boolean;
 *   children: React.ReactNode;
 * }} ColProps
 *
 * Componente Col
 * @param {ColProps} props - Props del componente.
 */
function Col({ first, sticky, children, ...props }) {
  return (
    <div
      {...props}
      className={`dashboard__col ${props.className ?? ''}`}
      data-first={first}
      data-sticky={sticky}
    >
      {children}
    </div>
  )
}

/**
 * @typedef {React.HTMLProps<HTMLDivElement> & {
 *   header?: boolean;
 *   sticky?: boolean;
 *   start?: number;
 *   end?: number;
 *   children?: React.ReactNode;
 * }} RowProps
 *
 * Componente Row
 * @param {RowProps} props - Props del componente.
 */
function Row({ header, sticky, start, end, children, ...props }) {
  return (
    <div
      {...props}
      className={`dashboard__row ${props.className ?? ''}`}
      data-header={header}
      data-sticky={sticky}
      style={{ ...props.style, gridRowStart: start, gridRowEnd: end }}
    >
      {children}
    </div>
  )
}

Dashboard.Col = Col
Dashboard.Row = Row

export default Dashboard
