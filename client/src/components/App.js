import React, { useEffect, useState, createContext, useContext } from "react";
import Router from './Router'
import Login from "./Login";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loginType, setLoginType] = useState('')

  const CurrentUser = createContext(currentUser)
  const LoginType = createContext(loginType)

  useEffect(() => {
    fetch('/currentuser')
      .then(res => res.json())
      .then(user => {
        setCurrentUser(user)
        setLoginType(user['login_type'])
      })
  }, [])

  return (
    <CurrentUser.Provider value={currentUser}>
      <LoginType.Provider value={loginType}>
        <Router currentUser={currentUser} loginType={loginType}/>
      </LoginType.Provider>
    </CurrentUser.Provider>
    
  )
}

export default App;
