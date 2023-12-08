import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Header = ({ title }) => {
  const navigate = useNavigate()

  const {handleSetUser, handleSetLogin} = useContext(UserContext)

  const logout = () => {
    fetch('/logout')
      .then(() => {
        handleSetUser({})
        handleSetLogin('')
        navigate('/')
      })
  }
  
  return (
    <>
      <h1 className='header'>{title}
        <button id='logoutBtn' onClick={logout}>LOGOUT</button>
      </h1>
    </>
  )
}

export default Header