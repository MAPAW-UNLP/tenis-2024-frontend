import '../styles/coverSpinner.css'

export const CoverSpinner = ({ loadingFetch }) => {
  return <>{loadingFetch && <div id="cover-spin" />}</>
}
