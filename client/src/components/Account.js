import NavBar from './NavBar'
import Header from './Header'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UserContext } from '../context/UserContext'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from './Snackbar'

const Account = () => {
  const { currentUser, loginType, handleSetUser, handleSetLogin } = useContext(UserContext)
  const {isSnack, snackText, handleCloseSnack, handleOpenSnack} = useContext(UserContext)

  
  const [isDelete, setIsDelete] = useState(false)

  const navigate = useNavigate()

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
      .then(res => {
        if (res.status === 200) return res.json()
      })
      .then(data => {
        handleSetUser(data)
        handleOpenSnack('User updated.')
      })
      .catch(() => handleOpenSnack('Username already in use.'))
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
      .then(res => {
        if (res.status === 200) return res.json()
      })
      .then(data => {
        handleSetUser(data)
        handleOpenSnack('User updated.')
      })
      .catch(() => handleOpenSnack('Unable to update user.'))
    }     
  })

  const fsD = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
    login_type: yup.string()
  })

  const formikProfileD = useFormik({
    initialValues: {
      username: '',
      password: '',
      login_type: loginType
    },
    validationSchema: fsD,
    onSubmit: (values) => {
      fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
      .then(res => {
        if (res.status === 200) return
        else throw Error
      })
      .then(() => {
        const deleteUrl = loginType === 'user' ? `/userbyid/${currentUser.id}` : `/businessbyid/${currentUser.id}`
        fetch(deleteUrl, {
          method: "DELETE"
        })
        .then(() => {
          fetch('/logout')
          .then(() => {
            handleOpenSnack('Thank you for using Manna Foods.')
            setTimeout(() => {
              navigate('/')
              handleSetUser({})
              handleSetLogin('')
            }, 2000)
          })
        })
        .catch(() => handleOpenSnack('Unable to delete account.'))
      })
      .catch(() => handleOpenSnack('Invalid user credentials.'))
    }
  })

  const formik = isDelete ?
    formikProfileD : 
    loginType === 'user' ?
    formikProfileU :
    formikProfileB

  const handleToggle = () => {
    setIsDelete(isDelete => !isDelete)
  }

  return (
    <div className='container'>
      <Header title={'My Manna Foods Account'} />
      <NavBar />
      {
      isDelete ? 
      <div className='profileContent'>
        <div className='profileInfo'>
          <div className='form'>
            <form className='loginForm' onSubmit={formik.handleSubmit}>
              <h1 className='formTitle'>Delete Account</h1>
              <div className='loginBar'></div>
              <h3 className='formTagDelete'>Please confirm your username and password to continue.</h3>
              <label htmlFor='username'>Confirm Username:</label>
              <input id='username' className='loginInput' type='text' onChange={formik.handleChange} value={formik.values.username} placeholder="Confirm Username"></input>
              <label htmlFor='password'>Confirm Password:</label>
              <input id='password' className='loginInput' type='password' onChange={formik.handleChange} value={formik.values.password} placeholder="Confirm Password"></input>
              <div className='profileBtnWrapper'>
                <button className='modalBtn' type='submit'>DELETE</button>
                <button className='modalBtn' type='button' onClick={handleToggle}>CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      </div> :
      <div className='profileContent'>
        <div className='profileInfo'>
          <div className='form'>
            <form className='loginForm' onSubmit={formik.handleSubmit}>
              <h1 className='formTitle'>Update or Delete Account</h1>
              <div className='loginBar'></div>
              <button className='modalBtn' type='button' onClick={handleToggle}>to Delete</button>
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
              <div className='profileBtnWrapper'>
                <button className='modalBtn' type='submit'>UPDATE</button>
              </div>
            </form>
          </div>
        </div>
      </div> 
      }  
      {isSnack ? <Snackbar message={snackText} handleCloseSnack={handleCloseSnack} /> : null}
    </div>
  )
}

export default Account