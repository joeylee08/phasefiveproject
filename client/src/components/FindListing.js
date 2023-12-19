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

  useEffect(() => {
    fetchListings()
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
    })
    .then(() => {
      setIsModal(false)
      handleOpenSnack('Listing saved.')
    })
    .catch(() => handleOpenSnack('Unable to save listing.'))
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
        <button type='button' id={item.id} className='cardBtn' onClick={() => handleAdd(item)}>SAVE</button>
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