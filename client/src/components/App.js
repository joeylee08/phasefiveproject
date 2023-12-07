import React, { useEffect, useState, createContext, useContext } from "react";
import Router from './Router'
import Login from "./Login";

export const UserContext = createContext(null)

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loginType, setLoginType] = useState('')

  useEffect(() => {
    fetch('/currentuser')
      .then(res => res.json())
      .then(user => {
        setCurrentUser(user)
        setLoginType(user['login_type'])
      })
  }, [])

  const handleSetCurrentUser = (userObj) => {
    setCurrentUser(userObj)
  }

  const handleSetLoginType = (loginType) => {
    setLoginType(loginType)
  }

  return (
    <UserContext.Provider value={{ currentUser, loginType }}>
      <Router currentUser={currentUser} loginType={loginType} setCurrentUser={handleSetCurrentUser} setLoginType={handleSetLoginType} />
    </UserContext.Provider>
    
  )
}

export default App;
