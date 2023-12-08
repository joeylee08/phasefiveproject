import NavBar from './NavBar'
import Header from './Header'
import { useState, useEffect } from 'react'
import Modal from './Modal'

const FindListing = ({ currentUser, loginType, setCurrentUser, setLoginType }) => {
  const [activeListings, setActiveListings] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [selectedListing, setSelectedListing] = useState({})

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
    return 'poo'
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
      <Header title={'Find Listing'} setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>
      <NavBar loginType={loginType}/>
      {isModal ? <Modal loginType={loginType} selectedListing={selectedListing} handleIsModal={handleIsModal} /> : null}
      <div className='content'>
        {mapped}
      </div>
    </div>
  )
}

export default FindListing