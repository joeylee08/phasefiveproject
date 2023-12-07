import NavBar from './NavBar'
import Header from './Header'
import { useState, useEffect } from 'react'

const MyListings = ({currentUser, loginType, setCurrentUser, setLoginType}) => {
  const [myListings, setMyListings] = useState([])

  useEffect(() => {
    fetch(`/userlistingbyid/${currentUser.id}`)
      .then(res => res.json())
      .then(data => {
        for (let ul of data) {
          fetch(`/listingbyid/${ul['listing_id']}`)
            .then(res => res.json())
            .then(data => {
              setMyListings(current => [...current, data])
            })
        }
      })
  }, [])

  const mapped = myListings.map(item => (
    <div className='listingCard' key={item.id}>
      <h3>{item.product}</h3>
      <h3>Quantity: {item.quantity}</h3>
      <p>Posted By: {item.posted_by}</p>
      <p>Expires: {item.expiration_date}</p>
    </div>
    )
  )
  return (
    <div className='container'>
      <Header title={'My Listings'} setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>
      <NavBar loginType={loginType}/>
      <div className='content'>
        {mapped}
      </div>
    </div>
  )
}

export default MyListings