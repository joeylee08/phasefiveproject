import NavBar from './NavBar'
import Header from './Header'
import { useState, useEffect, useContext } from 'react'
import Modal from './Modal'
import { UserContext } from '../context/UserContext'
import Map from './Map'

const FindListing = () => {
  const [isModal, setIsModal] = useState(false)
  const [activeListings, setActiveListings] = useState([])
  const [selectedListing, setSelectedListing] = useState({})

  const {currentUser, loginType} = useContext(UserContext)

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
    .then(res => res.json())
    .then(() => {
      setIsModal(false)
      alert('added')
    })
  }

  const mapped = activeListings.map(item => (
    <div className='listingCard' listing_id={item.id} key={item.id}>
      <h3>{item.product}</h3>
      <h4>Quantity: {item.quantity}</h4>
      <p>Posted By: {item.posted_by}</p>
      <br/>
      <p>Expires: {item.expiration_date}</p>
      <div className='cardBtnWrapper'>
        <button type='button' id={item.id} className='cardBtn' onClick={() => handleDetails(item)}>DETAILS</button>
        <button type='button' id={item.id} className='cardBtn' onClick={() => handleAdd(item)}>ADD</button>
      </div>
    </div>
    )
  )

  return (
    <div className='container'>
      <Header title={'Find Listing'} />
      <NavBar />
      {isModal ? <Modal selectedListing={selectedListing} handleAdd={handleAdd} handleIsModal={handleIsModal} /> : null}
      <div className='content'>
        <Map />
        {mapped}
      </div>
    </div>
  )
}

export default FindListing