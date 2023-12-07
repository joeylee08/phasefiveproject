const Header = ({ title, setCurrentUser, setLoginType }) => {
  const logout = () => {
    fetch('/logout')
      .then(() => {
        setCurrentUser({})
        setLoginType('')
      })
  }
  
  return (
    <>
      <h1 className='header'>{title}<button id='logoutBtn' onClick={logout}>Logout User</button></h1>
    </>
  )
}

export default Header