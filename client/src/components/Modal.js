import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const Modal = ({currentUser, loginType, selectedListing, handleIsModal}) => {
  const navigate = useNavigate()
  
  const fsCreate = yup.object().shape({
    product: yup.string().required('Please enter a product name.'),
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

  const formikCreate = useFormik({
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
    validationSchema: fsCreate,
    onSubmit: (values) => {
      const submitted = {
        ...values,
        "business_id": currentUser.id,
        "posted_by": currentUser.business_name
      }
      fetch('/listings', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitted, null, 2)
      })
      .then(res => res.json())
      .then(() => {
        formikCreate.resetForm()
        navigate('/mylistings')
      })
    }
  })

  if (loginType === 'user') {
    return (
      <>
      <div className='modal'>
        <div className="modalDetails">
          <h1>{selectedListing.product}</h1>
          <div className='modalBar'></div>
          <h3>Quantity: {selectedListing.quantity}</h3>
          <h3>Expiration Date: {selectedListing.expiration_date}</h3>
          <h3>Posted By: {selectedListing.posted_by}</h3>
          <h3>Location: {selectedListing.location}</h3>
          <h3>Additional Notes: {selectedListing.notes}</h3>
          <img className='map' src='https://cdn.serc.carleton.edu/images/sp/library/google_earth/google_maps_hello_world.webp'></img>
          <br/>
          <button className='modalBtn' onClick={handleIsModal}>CLOSE</button>
        </div>
      </div>
      </>
    )
  } else {
    return (
      <>
        <div className='modal'>
          <form className='loginForm' onSubmit={formikCreate.handleSubmit}>
            <h1 className='formTitle'>Edit Listing</h1>
            <div className='loginBar'></div>
            <h3 className='formTag'>Please enter your listing information.</h3>
            <label htmlFor='product'>Product:</label>
            <input id='product' className='loginInput' type='text' onChange={formikCreate.handleChange} value={formikCreate.values.product} placeholder="Enter Product"></input>
            <label htmlFor='quantity'>Quantity:</label>
            <input id='quantity' className='loginInput' type='number' onChange={formikCreate.handleChange} value={formikCreate.values.quantity} placeholder="Enter Password"></input>
            <label htmlFor='expiration_date'>Expiration Date:</label>
            <input id='expiration_date' className='loginInput' type='text' onChange={formikCreate.handleChange} value={formikCreate.values.expiration_date} placeholder="MM/DD/YY"></input>
            <label htmlFor='location'>Location:</label>
            <input id='location' className='loginInput' type='text' onChange={formikCreate.handleChange} value={formikCreate.values.location} placeholder="Enter Location"></input>
            <label htmlFor='notes'>Enter Details:</label>
            <input id='notes' className='loginInput' type='text' onChange={formikCreate.handleChange} value={formikCreate.values.notes} placeholder="Pickup Times, Contact Info."></input>
            <div className='checkBoxes'>
              <label htmlFor='vegan_safe'>Vegan Safe:</label>
              <input id='vegan_safe' className='loginInput' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.vegan_safe} checked={formikCreate.values.vegan_safe}></input>
              <label htmlFor='non_dairy'>Non Dairy:</label>
              <input id='non_dairy' className='loginInput' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.vegan_safe} checked={formikCreate.values.non_dairy}></input>
              <label htmlFor='gluten_free'>Gluten Free:</label>
              <input id='gluten_free' className='loginInput' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.vegan_safe} checked={formikCreate.values.gluten_free}></input>
              <label htmlFor='nut_free'>Nut Free:</label>
              <input id='nut_free' className='loginInput' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.vegan_safe} checked={formikCreate.values.nut_free}></input>
              <label htmlFor='soy_free'>Soy Free:</label>
              <input id='soy_free' className='loginInput' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.vegan_safe} checked={formikCreate.values.soy_free}></input>
            </div>
            <div id='loginButtons'>
              <button className='modalBtn' type='submit'>Create</button>
              <button className='modalBtn' onClick={handleIsModal}>Cancel</button>
            </div>
          </form>
          </div>
      </>
    )
  }
}

export default Modal