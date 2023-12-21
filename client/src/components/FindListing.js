import NavBar from './NavBar'
import Header from './Header'
import { useState, useEffect, useContext } from 'react'
import Modal from './Modal'
import { UserContext } from '../context/UserContext'
import Map from './Map'
import Snackbar from './Snackbar'

const FindListing = () => {
  const [isModal, setIsModal] = useState(false)
  const [activeListings, setActiveListings] = useState([])
  const [selectedListing, setSelectedListing] = useState({})
  const [currentSaved, setCurrentSaved] = useState([])


  const {currentUser} = useContext(UserContext)
  const {isSnack, snackText, handleCloseSnack, handleOpenSnack} = useContext(UserContext)


  const handleIsModal = () => {
    setIsModal(isModal => !isModal)
  }

  const fetchListings = () => {
    fetch('/listings')
    .then(res => res.json())
    .then(data => {
      // filtering data here?
      setActiveListings(data)
    })
  }

  const fetchSaved = () => {
    const userId = currentUser.id
    fetch(`/ulbyuserid/${userId}`)
    .then(res => {
      if (res.status === 200) return res.json()
      else throw Error
    })
    .then(data => {
      const listings = data.map(item => item.listing_id)
      setCurrentSaved(listings)
    })
    .catch(() => handleOpenSnack('Unable to fetch saved listings.'))
  }

  useEffect(() => {
    fetchListings()
    fetchSaved()
  }, [])

  const handleDetails = (item) => {
    setIsModal(isModal => !isModal)
    setSelectedListing(item)
  }

  const handleAdd = (item) => {
    const userId = currentUser.id
    const listingId = item.id

    const request = {
      "user_id": userId,
      "listing_id": listingId
    }

    fetch('/userlistings', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
    .then(res => {
      if (res.status === 201) return res.json()
      else throw Error
    })
    .then(() => {
      setIsModal(false)
      handleOpenSnack('Listing saved.')
      fetchListings()
      fetchSaved()
    })
    .catch(() => handleOpenSnack('Already saved.'))
  }

  const handleDelete = (e) => {
    const listing_id = e.target.id

    fetch(`/ulbyuserid/${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
      data = data.filter(item => item.listing_id == listing_id)
      const target_id = data[0].id

      fetch(`/userlistingbyid/${target_id}`, {
        method: "DELETE"
      })
      .then(res => {
        if (res.status === 204) {
          if (isModal) setIsModal(false)
          fetchListings()
          fetchSaved()
          handleOpenSnack('Listing removed.')
        }
      })
      .catch(() => handleOpenSnack('Unable to remove listing.'))
    })
  }

  const mapped = activeListings.map(item => (
    <div className='listingCard' listing_id={item.id} key={item.id}>
      <h3>{item.product}</h3>
      <h4>Quantity: {item.quantity}</h4>
      <p id='poster'>Posted By: {item.posted_by}</p>
      <br/>
      <p id='expires'>Expires: {item.expiration_date}</p>
      <div className='cardBtnWrapper'>
        <button type='button' id={item.id} className='cardBtn' onClick={() => handleDetails(item)}>DETAILS</button>
        {
          currentSaved.includes(item.id) ? 
          <button type='button' id={item.id} className='cardBtn' onClick={handleDelete}>REMOVE</button> :
          <button type='button' id={item.id} className='cardBtn' onClick={() => handleAdd(item)}>SAVE</button>
        }
        
        
      </div>
    </div>
    )
  )

  const address = currentUser.location || 'Kiev, Ukraine'
  const items = [];

  //1. Filter the activeListings for
  //   a. keyword
  //   b. distance
  //   c. dietary restrictions

  return (
    <div className='container'>
      <Header title={'Find Listing'} />
      <NavBar />
      {isModal ? <Modal selectedListing={selectedListing} handleAdd={handleAdd} handleIsModal={handleIsModal} /> : null}
      <div className='content'>
        <Map mapClass={'listingsMap'} center={address} items={items}/>
        {mapped}
      </div>
      {isSnack ? <Snackbar message={snackText} handleCloseSnack={handleCloseSnack} /> : null}
    </div>
  )
}

export default FindListing