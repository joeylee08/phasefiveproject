
const Snackbar = ({ message, handleCloseSnack}) => {

  return (
    <>
        <div className='snackbar' onClick={handleCloseSnack}>
          <h2>{message}</h2>
        </div>
    </>
  )
}

export default Snackbar