import { useNavigate } from 'react-router-dom';

const Header = ({ title, setCurrentUser, setLoginType }) => {
  const navigate = useNavigate()

  const logout = () => {
    fetch('/logout')
      .then(() => {
        setCurrentUser({})
        setLoginType('')
        navigate('/')
      })
  }
  
  return (
    <>
      <h1 className='header'>{title}<button id='logoutBtn' onClick={logout}>Logout User</button></h1>
    </>
  )
}

export default Header