import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState, useContext, useEffect } from 'react'
import UserContext from './App'

const Login = ({ setCurrentUser, setLoginType }) => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)

  const fsLogin = yup.object().shape({
    login_type: yup.string().required('Please select an account type.').min(1),
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password.").min(5)
  })

  const fsSignup= yup.object().shape({
    login_type: yup.string().required('Please select an account type.').min(1),
    email: yup.string().email('Please enter a valid email.').required('Please enter an email.'),
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password.").min(5)
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
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data)
        setLoginType(data['login_type'])
        formikLogin.resetForm();
        navigate('/')
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
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data)
        setLoginType(data['login_type'])
        formikSignup.resetForm();
        navigate('/')
      })
    }
  })

  const handleToggleform = () => {
    setIsLogin(isLogin => !isLogin)
  }

  if (isLogin) {
    return (
      <>
        <div className='form'>
          <form className='loginForm' onSubmit={formikLogin.handleSubmit}>
            <div id='loginSignup'>
            <button className='modalBtn' type='button' onClick={() => handleToggleform()}>{isLogin ? 'to Signup' : 'to Login'}</button>
            </div>
            <h1 className='formTitle'>Login</h1>
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
              <button className='modalBtn' type='submit'>Login</button>
            </div>
          </form>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='form'>
          <form className='loginForm' onSubmit={formikSignup.handleSubmit}>
            <div id='loginSignup'>
              <button className='modalBtn' type='button' onClick={() => handleToggleform()}>{isLogin ? 'to Signup' : 'to Login'}</button>
            </div>
            <h1 className='formTitle'>Signup</h1>
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
              <button className='modalBtn' type='submit'>Signup</button>
            </div>
          </form>
        </div>
      </>
    )
  }
  
}

export default Login