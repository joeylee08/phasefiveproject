import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const Snackbar = ({}) => {
  const {snackText, handleCloseSnack} = useContext(UserContext)
  
  return (
    <>
        <div className='snackbar' onClick={handleCloseSnack}>
          <h2>{snackText}</h2>
        </div>
    </>
  )
}

export default Snackbar