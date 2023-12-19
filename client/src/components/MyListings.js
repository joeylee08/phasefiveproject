import NavBar from './NavBar'
import Header from './Header'
import { useState, useEffect, useContext } from 'react'
import Modal from './Modal'
import { UserContext } from '../context/UserContext'
import Snackbar from './Snackbar'

const MyListings = () => {
  const [myListings, setMyListings] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [selectedListing, setSelectedListing] = useState({})

  const {currentUser, loginType} = useContext(UserContext)
  const {isSnack, snackText, handleCloseSnack, handleOpenSnack} = useContext(UserContext)
  
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
        .then(res => {
          if (res.status === 204) {
            if (isModal) setIsModal(false)
            handleOpenSnack('Listing removed.')
            fetchListings()
          }
        })
        .catch(() => handleOpenSnack('Unable to remove listing.'))
      })
   } else {
      fetch(`/listingbyid/${listing_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.status === 204) {
          if (isModal) setIsModal(false)
          fetchListings()
          handleOpenSnack('Listing deleted.')
        }
      })
      .catch(() => handleOpenSnack('Unable to delete listing.'))
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
        {
          loginType === 'user' ? <button type='button' id={item.id} className='cardBtn' onClick={handleDelete}>REMOVE</button> : <button type='button' id={item.id} className='cardBtn' onClick={handleDelete}>DELETE</button>
        }
      </div>
    </div>
    )
  )
  return (
    <div className='container'>
      <Header title={loginType === 'user' ? 'Saved Listings' : 'Active Listings'} />
      <NavBar />
      {isModal ? <Modal selectedListing={selectedListing} handleIsModal={handleIsModal} handleOpenSnack={handleOpenSnack} handleDelete={handleDelete} fetchListings={fetchListings}/> : null}
      <div className='content'>
        {mapped}
      </div>
      {isSnack ? <Snackbar message={snackText} handleCloseSnack={handleCloseSnack} /> : null}
    </div>
  )
}

export default MyListings