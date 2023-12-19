import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Snackbar from './Snackbar'

const Login = () => {
  const navigate = useNavigate()
  const {isSnack, snackText, handleCloseSnack, handleOpenSnack} = useContext(UserContext)
  const {handleSetUser, handleSetLogin} = useContext(UserContext)
  
  const [isLogin, setIsLogin] = useState(true)

  const handleToggleForm = () => {
    setIsLogin(isLogin => !isLogin)
  }

  const fsLogin = yup.object().shape({
    login_type: yup.string().required('Please select an account type.'),
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password.")
  })

  const fsSignup= yup.object().shape({
    login_type: yup.string().required('Please select an account type.'),
    email: yup.string().email('Please enter a valid email.').required('Please enter an email.'),
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password.")
  })

  const formikLogin = useFormik({
    initialValues: {
      login_type: '',
      username: '',
      password: '' 
    },
    validationSchema: fsLogin,
    onSubmit: (values) => {
      fetch('/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2)
      })
      .then(res => {
        if (res.status === 200) return res.json()
      })
      .then(data => {
        handleSetUser(data)
        handleSetLogin(data['login_type'])
        formikLogin.resetForm();
        navigate('/')
      })
      .catch(() => {
        handleOpenSnack("Invalid user credentials.")
      })
    }
  })

  const formikSignup = useFormik({
    initialValues: {
      login_type: '',
      business_name: '',
      email: '',
      username: '',
      password: ''
    },
    validationSchema: fsSignup,
    onSubmit: (values) => {
      fetch('/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2)
      })
      .then(res => {
        if (res.status === 201) return res.json()
      })
      .then(data => {
        handleSetUser(data)
        handleSetLogin(data['login_type'])
        formikSignup.resetForm();
        navigate('/')
      })
      .catch(() => {
        handleOpenSnack("That username already exists.")
      })
    }
  })

  if (isLogin) {
    return (
      <>
      <div className='loginContent'>
        <div className='form'>
          <form className='loginForm' onSubmit={formikLogin.handleSubmit}>
            <button className='modalBtn' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Signup' : 'to Login'}</button>
            <h1 className='formTitle'>Manna Foods Login</h1>
            <div className='loginBar'></div>
            <h3 className='formTag'>Please enter your account information.</h3>
            <label htmlFor='login_type'>Account Type:</label>
            <select id='login_type' className='loginInput' onChange={formikLogin.handleChange} value={formikLogin.values.login_type}>
              <option value=''>Select an Account Type</option>
              <option value='user'>User</option>
              <option value='business'>Business</option>
            </select>
            <label htmlFor='username'>Username:</label>
            <input id='username' className='loginInput' type='text' onChange={formikLogin.handleChange} value={formikLogin.values.username} placeholder="Enter Username"></input>
            <label htmlFor='username'>Password:</label>
            <input id='password' className='loginInput' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.password} placeholder="Enter Password"></input>
            <div id='loginButtons'>
              <button className='modalBtn' type='submit'>LOGIN</button>
            </div>
          </form>
        </div>
      </div>
      {isSnack ? <Snackbar /> : null}
      </>
    )
  } else {
    return (
      <>
      <div className='loginContent'>
        <div className='form'>
          <form className='loginForm' onSubmit={formikSignup.handleSubmit}>
            <button className='modalBtn' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Signup' : 'to Login'}</button>
            <h1 className='formTitle'>Manna Foods Signup</h1>
            <div className='loginBar'></div>
            <h3 className='formTag'>Please enter your account information.</h3>
            <label htmlFor='login_type'>Account Type:</label>
            <select id='login_type' className='loginInput' onChange={formikSignup.handleChange} value={formikSignup.values.login_type}>
              <option value=''>Select an Account Type</option>
              <option value='user'>User</option>
              <option value='business'>Business</option>
            </select>
            {formikSignup.values.login_type == 'business' ? <label htmlFor='email'>Business Name:</label> : null}
            {formikSignup.values.login_type == 'business' ? <input id='business_name' className='loginInput' type='text' onChange={formikSignup.handleChange} value={formikSignup.values.business_name} placeholder="Enter Business Name"></input> : null}
            <label htmlFor='email'>Email:</label>
            <input id='email' className='loginInput' type='email' onChange={formikSignup.handleChange} value={formikSignup.values.email} placeholder="Enter Email"></input>
            <label htmlFor='username'>Username:</label>
            <input id='username' className='loginInput' type='text' onChange={formikSignup.handleChange} value={formikSignup.values.username} placeholder="Enter Username"></input>
            <label htmlFor='password'>Password:</label>
            <input id='password' className='loginInput' type='password' onChange={formikSignup.handleChange} value={formikSignup.values.password} placeholder="Enter Password"></input>
            <div id='loginButtons'>
              <button className='modalBtn' type='submit'>SIGNUP</button>
            </div>
          </form>
        </div>
      </div>
      {isSnack ? <Snackbar message={snackText} handleCloseSnack={handleCloseSnack} /> : null}
      </>
    )
  }
  
}

export default Login