import { useState, useEffect, createContext } from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({})
  const [loginType, setLoginType] = useState('')
  const [isSnack, setIsSnack] = useState(false)
  const [snackText, setSnackText] = useState('')

  const handleCloseSnack = () => {
    setIsSnack(false)
    setSnackText('')
  }

  const handleOpenSnack = (message) => {
    setSnackText(message)
    setIsSnack(true)
    setTimeout(() => handleCloseSnack(), 1500)
  }

  useEffect(() => {
    // check for currentUser
    fetch('/currentuser')
      .then(res => res.json())
      .then(user => {
        setCurrentUser(user)
        setLoginType(user['login_type'])
      })
  }, [])

  const handleSetUser = (userObj) => {
    setCurrentUser(userObj)
  }

  const handleSetLogin = (loginType) => {
    setLoginType(loginType)
  }

  return (
    <UserContext.Provider value={{currentUser, loginType, handleSetUser, handleSetLogin, isSnack, snackText, handleOpenSnack, handleCloseSnack}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider