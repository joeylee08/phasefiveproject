import NavBar from './NavBar'
import Header from './Header'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const Profile = () => {
  const { currentUser, loginType, handleSetUser } = useContext(UserContext)

  const fsU = yup.object().shape({
    email: yup.string(),
    username: yup.string(),
    location: yup.string(),
  })

  const formikProfileU = useFormik({
    initialValues: {
      email: currentUser.email,
      username: currentUser.username,
      location: currentUser.location
    },
    validationSchema: fsU,
    onSubmit: (values) => {
      fetch(`/userbyid/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        handleSetUser(data)
        alert('user updated')
      })
    }     
  })
  
  const fsB = yup.object().shape({
    email: yup.string(),
    business_name: yup.string(),
    username: yup.string(),
    location: yup.string(),
  })

  const formikProfileB = useFormik({
    initialValues: {
      email: currentUser.email,
      business_name: currentUser.business_name,
      username: currentUser.username,
      location: currentUser.location
    },
    validationSchema: fsB,
    onSubmit: (values) => {
      fetch(`/businessbyid/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        handleSetUser(data)
        alert('user updated')
      })
    }     
  })

  const formik = loginType === 'user' ? formikProfileU : formikProfileB

  return (
    <div className='container'>
      <Header title={'My Manna Profile'} />
      <NavBar />
      <div className='profileContent'>
        <div className='profileInfo'>
          <div className='form'>
          <form className='loginForm' onSubmit={formik.handleSubmit}>
            <h3 className='formTag'>Update your account information.</h3>
            <label htmlFor='email'>Updated Email:</label>
            <input id='email' className='loginInput' type='text' onChange={formik.handleChange} value={formik.values.email} placeholder="Enter Email"></input>
            { 
              loginType === 'business' ?
              <>
                <label htmlFor='business_name'>Updated Business Name:</label>
                <input id='business_name' className='loginInput' type='text' onChange={formik.handleChange} value={formik.values.business_name} placeholder="Enter Business Name"></input>
              </> 
              : null
            }
           
            
            <label htmlFor='username'>Updated Username:</label>
            <input id='username' className='loginInput' type='text' onChange={formik.handleChange} value={formik.values.username} placeholder="Enter Username"></input>
            <label htmlFor='username'>Updated Location:</label>
            <input id='location' className='loginInput' type='text' onChange={formik.handleChange} value={formik.values.location} placeholder="Enter Location"></input>
            <div id='loginButtons'>
              <button className='modalBtn' type='submit'>UPDATE</button>
            </div>
          </form>
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile