import NavBar from './NavBar'
import Header from './Header'
import { useState, useEffect } from 'react'

const MyListings = ({currentUser, loginType, setCurrentUser, setLoginType}) => {
  const [myListings, setMyListings] = useState([])

  useEffect(() => {
    if (loginType == 'user') {
      fetch(`/ulbyuserid/${currentUser['id']}`)
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
    } else {
      fetch('/listings')
      .then(res => res.json())
      .then(data => {
        data = data.filter(item => item.business_id == currentUser.id)
        setMyListings(data)
      })
    }
    
  }, [])

  const handleDelete = (e) => {
    const listing_id = e.target.id

    if (loginType === 'user') {
      return
    } else {
      fetch(`/listingbyid/${listing_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
  }

  const handleEdit = () => {
    return
  }

  const mapped = myListings.map(item => (
    <div className='listingCard' key={item.id}>
      <h3>{item.product}</h3>
      <h4>Quantity: {item.quantity}</h4>
      <p>Posted By: {item.posted_by}</p>
      <p>Expires: {item.expiration_date}</p>
      <div className='btnWrapper'>
        <button type='button' id={item.id} className='deleteBtn' onClick={handleDelete}>DELETE</button>
        {loginType === 'business' ? <button type='button' id={item.id} className='editBtn' onClick={handleEdit}>EDIT</button> : null}
      </div>
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