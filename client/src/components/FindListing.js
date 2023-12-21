import NavBar from './NavBar'
import Header from './Header'
import { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Modal from './Modal'
import { UserContext } from '../context/UserContext'
import Map from './Map'
import Snackbar from './Snackbar'

const FindListing = () => {
  const [isModal, setIsModal] = useState(false)
  const [activeListings, setActiveListings] = useState([])
  const [selectedListing, setSelectedListing] = useState({})
  const [currentSaved, setCurrentSaved] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const {currentUser} = useContext(UserContext)
  const {isSnack, snackText, handleCloseSnack, handleOpenSnack} = useContext(UserContext)

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

  const handleIsModal = () => {
    setIsModal(isModal => !isModal)
  }

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
          handleOpenSnack('Listing removed.')
          fetchSaved()
          fetchListings()
        }
      })
      .catch(() => handleOpenSnack('Unable to remove listing.'))
    })
  }

  const handleClearSearch = () => {
    formikSearch.resetForm()
    setSearchQuery('')
  }

  const fsSearch = yup.object().shape({
    searchQuery: yup.string()
  })

  const formikSearch = useFormik({
    initialValues: {
      searchQuery: ''
    },
    validationSchema: fsSearch,
    onSubmit: (values) => {
      setSearchQuery(values.searchQuery.trim().toLowerCase())
    }
  })

  const filtered = activeListings.filter(item => {
    return item.product.toLowerCase().includes(searchQuery)
  })

  const mapped = filtered.map(item => (
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
        {
          currentSaved.includes(item.id) ?
          <span id='savedCheck'>&nbsp;✔ saved</span> :
          null
        }
      </div>
    </div>
    )
  )

  const address = currentUser.location || 'Kiev, Ukraine'
  const items = [];

  return (
    <div className='container'>
      <Header title={'Find Listing'} />
      <NavBar />
      {isModal ? <Modal selectedListing={selectedListing} handleAdd={handleAdd} handleDelete={handleDelete} handleIsModal={handleIsModal} currentSaved={currentSaved}/> : null}
      <Map mapClass={'listingsMap'} center={address} items={items}/>
      <form className='searchForm' onSubmit={formikSearch.handleSubmit}>
        <label htmlFor='searchQuery' className='searchInput'>Search Listings:</label>  
        <input type='text' id='searchQuery' className='searchInput' onChange={formikSearch.handleChange} value={formikSearch.values.searchQuery} placeholder='Enter Keywords'></input>
        <button type='submit' className='searchInput'>GO</button>
        <button type='button' className='searchInput' onClick={handleClearSearch}>CLEAR</button>
      </form>
      <div className='content'>
        {mapped}
      </div>
      {isSnack ? <Snackbar message={snackText} handleCloseSnack={handleCloseSnack} /> : null}
    </div>
  )
}

export default FindListing