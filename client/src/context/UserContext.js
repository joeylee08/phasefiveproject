import { useState, useEffect, createContext } from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({})
  const [loginType, setLoginType] = useState('')

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
    <UserContext.Provider value={{currentUser, loginType, handleSetUser, handleSetLogin}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider