import NavBar from './NavBar'
import Header from './Header'
import { useState, useEffect, useContext } from 'react'
import Modal from './Modal'
import { UserContext } from '../context/UserContext'

const MyListings = () => {
  const [myListings, setMyListings] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [selectedListing, setSelectedListing] = useState({})

  const {currentUser, loginType} = useContext(UserContext)
  
  const handleIsModal = () => {
    setIsModal(isModal => !isModal)
  }

  const fetchListings = () => {
    if (loginType == 'user') {
      fetch(`/ulbyuserid/${currentUser['id']}`)
      .then(res => res.json())
      .then(data => {
        setMyListings([])
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
  }

  useEffect(() => {
    fetchListings()
  }, [])

  const handleDetails = (item) => {
    setIsModal(isModal => !isModal)
    setSelectedListing(item)
  }

  const handleDelete = (e) => {
    const listing_id = e.target.id
  
    if (loginType === 'user') {
      fetch(`/ulbyuserid/${currentUser.id}`)
      .then(res => res.json())
      .then(data => {
        data = data.filter(item => item.listing_id == listing_id)
        const target_id = data[0].id
        fetch(`/userlistingbyid/${target_id}`, {
          method: "DELETE"
        })
        .then(() => {
          if (isModal) setIsModal(false)
          fetchListings()
          alert('deleted')
        })
      })
   } else {
      fetch(`/listingbyid/${listing_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        if (isModal) setIsModal(false)
        fetchListings()
        alert('deleted')
      })
    }
  }

  const mapped = myListings.map(item => (
    <div className='listingCard' listing_id={item.id} key={item.id}>
      <h3>{item.product}</h3>
      <h4>Quantity: {item.quantity}</h4>
      <p>Posted By: {item.posted_by}</p>
      <br/>
      <p>Expires: {item.expiration_date}</p>
      <div className='cardBtnWrapper'>
        <button type='button' id={item.id} className='cardBtn' onClick={() => handleDetails(item)}>DETAILS</button>
        <button type='button' id={item.id} className='cardBtn' onClick={handleDelete}>REMOVE</button>
      </div>
    </div>
    )
  )
  return (
    <div className='container'>
      <Header title={loginType === 'user' ? 'Saved Listings' : 'Active Listings'} />
      <NavBar />
      {isModal ? <Modal selectedListing={selectedListing} handleIsModal={handleIsModal} handleDelete={handleDelete} fetchListings={fetchListings}/> : null}
      <div className='content'>
        {mapped}
      </div>
    </div>
  )
}

export default MyListings