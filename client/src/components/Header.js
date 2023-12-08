import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Header = ({ title }) => {
  const navigate = useNavigate()

  const {handleSetCurrentUser, handleSetLoginType} = useContext(UserContext)

  const logout = () => {
    fetch('/logout')
      .then(() => {
        handleSetCurrentUser({})
        handleSetLoginType('')
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