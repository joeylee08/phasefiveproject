import NavBar from './NavBar'
import Header from './Header'
import Modal from './Modal'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const CreateListing = () => {
  const navigate = useNavigate()

  const {currentUser, loginType, setCurrentUser, setLoginType} = useContext(UserContext)

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

  const formikCreate = useFormik({
    initialValues: {
      product: '',
      quantity: 0,
      expiration_date: '',
      location: '',
      notes: '',
      vegan_safe: false,
      non_dairy: false,
      gluten_free: false,
      nut_free: false,
      soy_free: false
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
      .then(data => {
        formikCreate.resetForm();
        navigate('/mylistings')
      })
    }
  })
  return (
    <div className='container'>
      <Header title={'Create Listing'} />
      <NavBar />
      <div className='content'>
        <div className='form'>
            <form className='loginForm' onSubmit={formikCreate.handleSubmit}>
              <h1 className='formTitle'>Create Listing</h1>
              <div className='loginBar'></div>
              <h3 className='formTag'>Please enter your listing information.</h3>
              <label htmlFor='product'>Product:</label>
              <input id='product' className='loginInputProduct' type='text' onChange={formikCreate.handleChange} value={formikCreate.values.product} placeholder="Enter Product"></input>
              <label htmlFor='quantity'>Quantity:</label>
              <input id='quantity' className='loginInput' type='number' onChange={formikCreate.handleChange} value={formikCreate.values.quantity} placeholder="Enter Password"></input>
              <label htmlFor='expiration_date'>Expiration Date:</label>
              <input id='expiration_date' className='loginInput' type='text' onChange={formikCreate.handleChange} value={formikCreate.values.expiration_date} placeholder="MM/DD/YY"></input>
              <label htmlFor='location'>Location:</label>
              <input id='location' className='loginInputLocation' type='text' onChange={formikCreate.handleChange} value={formikCreate.values.location} placeholder="Enter Location"></input>
              <label htmlFor='notes'>Enter Details:</label>
              <textarea id='notes' className='loginInputTextarea' type='textarea' onChange={formikCreate.handleChange} value={formikCreate.values.notes} placeholder="Pickup Times, Contact Info, Additional Special Instructions."></textarea>
              <div className='checkBoxes'>
                <div className='checkboxPair'>
                  <label htmlFor='vegan_safe'>Vegan Safe:</label>
                  <input id='vegan_safe' className='loginCheckbox' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.vegan_safe}></input>
                </div>
                <div className='checkboxPair'>
                  <label htmlFor='non_dairy'>Non Dairy:</label>
                  <input id='non_dairy' className='loginCheckbox' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.non_dairy}></input>
                </div>
                <div className='checkboxPair'>
                  <label htmlFor='gluten_free'>Gluten Free:</label>
                <input id='gluten_free' className='loginCheckbox' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.gluten_free}></input>
                </div>
                <div className='checkboxPair'>
                  <label htmlFor='nut_free'>Nut Free:</label>
                <input id='nut_free' className='loginCheckbox' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.nut_free}></input>
                </div>
                <div className='checkboxPair'>
                  <label htmlFor='soy_free'>Soy Free:</label>
                  <input id='soy_free' className='loginCheckbox' type='checkbox' onChange={formikCreate.handleChange} value={formikCreate.values.soy_free}></input>
                </div>
              </div>
              <div id='loginButtons'>
                <button className='modalBtn' type='submit'>Create</button>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default CreateListing