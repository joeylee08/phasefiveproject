import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Map from './Map'

const Modal = ({selectedListing, fetchListings, handleIsModal, handleAdd, handleDelete}) => {
  const location = useLocation()
  const path = location.pathname

  const {currentUser, loginType} = useContext(UserContext)
  
  const fsEdit = yup.object().shape({
    product: yup.string().max(55).required('Please enter a product name.'),
    quantity: yup.number().required('Please enter a quantity.').min(1),
    expiration_date: yup.string().required("Please enter a username."),
    location: yup.string().required("Please enter a location.").min(5),
    notes: yup.string(),
    vegan_safe: yup.string(),
    non_dairy: yup.string(),
    gluten_free: yup.string(),
    nut_free: yup.string(),
    soy_free: yup.string()
  })

  const sl = selectedListing

  const formikEdit = useFormik({
    initialValues: {
      product: sl.product,
      quantity: sl.quantity,
      expiration_date: sl.expiration_date,
      location: sl.location,
      notes: sl.notes,
      vegan_safe: sl.vegan_safe,
      non_dairy: sl.non_dairy,
      gluten_free: sl.gluten_free,
      nut_free: sl.nut_free,
      soy_free: sl.soy_free
    },
    validationSchema: fsEdit,
    onSubmit: (values) => {
      const submitted = {
        ...values,
        "business_id": currentUser.id,
        "posted_by": currentUser.business_name
      }
      fetch(`/listingbyid/${sl.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitted, null, 2)
      })
      .then(res => res.json())
      .then(() => {
        handleIsModal()
        fetchListings()
      })
    }
  })

  if (loginType === 'user') {
    return (
      <>
        <div className='modal'>
          <div className="modalDetails">
            <h1>{sl.product}</h1>
            <div className='modalBar'></div>
            <h3>Quantity: {sl.quantity}</h3>
            <h3>Expiration Date: {sl.expiration_date}</h3>
            <h3>Posted By: {sl.posted_by}</h3>
            <h3>Location: {sl.location}</h3>
            <h3>Additional Notes: {sl.notes}</h3>
            <Map center={sl.location} items={[]} mapClass={'modalMap'}/>
            <p className='dietTag'>Vegan {sl.vegan_safe ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
            <p className='dietTag'>Non Dairy {sl.non_dairy ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
            <p className='dietTag'>Gluten Free {sl.gluten_free ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
            <p className='dietTag'>Nut Free {sl.nut_free ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
            <p className='dietTag'>Soy Free {sl.soy_free ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
            <div className='formBtnWrapper'>
            <button className='modalBtn' onClick={handleIsModal}>CLOSE</button>
              {path === '/mylistings' ? <button className='modalBtn' id={sl.id} onClick={handleDelete}>REMOVE</button> : <button className='modalBtn' onClick={() => handleAdd(sl)}>ADD</button>}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='modal'>
          <form className='loginForm' onSubmit={formikEdit.handleSubmit}>
            <h1 className='formTitle'>Edit Listing</h1>
            <div className='loginBar'></div>
            <h3 className='formTag'>Please enter your listing information.</h3>
            <label htmlFor='product'>Product:</label>
            <input id='product' className='loginInputProduct' type='text' onChange={formikEdit.handleChange} value={formikEdit.values.product} placeholder="Enter Product"></input>
            <label htmlFor='quantity'>Quantity:</label>
            <input id='quantity' className='loginInput' type='number' onChange={formikEdit.handleChange} value={formikEdit.values.quantity} placeholder="Enter Password"></input>
            <label htmlFor='expiration_date'>Expiration Date:</label>
            <input id='expiration_date' className='loginInput' type='text' onChange={formikEdit.handleChange} value={formikEdit.values.expiration_date} placeholder="MM/DD/YY"></input>
            <label htmlFor='location'>Location:</label>
            <input id='location' className='loginInputLocation' type='text' onChange={formikEdit.handleChange} value={formikEdit.values.location} placeholder="Enter Location"></input>
            <label htmlFor='notes'>Enter Details:</label>
            <textarea id='notes' className='loginInputTextarea' type='textarea' onChange={formikEdit.handleChange} value={formikEdit.values.notes} placeholder="Pickup Times, Contact Info, Additional Special Instructions."></textarea>
            <div className='checkBoxes'>
                <div className='checkboxPair'>
                  <label htmlFor='vegan_safe'>Vegan Safe:</label>
                  <input id='vegan_safe' className='loginCheckbox' type='checkbox' onChange={formikEdit.handleChange} checked={formikEdit.values.vegan_safe} value={formikEdit.values.vegan_safe}></input>
                </div>
                <div className='checkboxPair'>
                  <label htmlFor='non_dairy'>Non Dairy:</label>
                  <input id='non_dairy' className='loginCheckbox' type='checkbox' onChange={formikEdit.handleChange} checked={formikEdit.values.non_dairy} value={formikEdit.values.non_dairy}></input>
                </div>
                <div className='checkboxPair'>
                  <label htmlFor='gluten_free'>Gluten Free:</label>
                <input id='gluten_free' className='loginCheckbox' type='checkbox' onChange={formikEdit.handleChange} checked={formikEdit.values.gluten_free} value={formikEdit.values.gluten_free}></input>
                </div>
                <div className='checkboxPair'>
                  <label htmlFor='nut_free'>Nut Free:</label>
                <input id='nut_free' className='loginCheckbox' type='checkbox' onChange={formikEdit.handleChange} checked={formikEdit.values.nut_free} value={formikEdit.values.nut_free}></input>
                </div>
                <div className='checkboxPair'>
                  <label htmlFor='soy_free'>Soy Free:</label>
                  <input id='soy_free' className='loginCheckbox' type='checkbox' onChange={formikEdit.handleChange} checked={formikEdit.values.soy_free} value={formikEdit.values.soy_free}></input>
                </div>
              </div>
            <div className='formBtnWrapper'>
              <button className='modalBtn' type='submit'>EDIT</button>
              <button className='modalBtn' onClick={handleIsModal}>CANCEL</button>
            </div>
          </form>
          </div>
      </>
    )
  }
}

export default Modal