import NavBar from './NavBar'
import Header from './Header'
import { useState, useEffect } from 'react'

const MyListings = ({currentUser, loginType, setCurrentUser, setLoginType}) => {
  const [myListings, setMyListings] = useState([])

  useEffect(() => {
    fetch(`/userlistingbyid/${currentUser.id}`)
      .then(res => res.json())
      .then(data => console.log(data))
  })
  return (
    <div className='container'>
      <Header title={'My Listings'} setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default MyListings