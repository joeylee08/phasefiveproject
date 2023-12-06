import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState, useContext } from 'react'
import UserContext from './App'

const Login = ({ setCurrentUser, setLoginType }) => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const currentUser = useContext(UserContext)

  const fsLogin = yup.object().shape({
    login_type: yup.string().required('Please select an account type.').min(1),
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password.").min(5)
  })

  const fsSignup= yup.object().shape({
    login_type: yup.string().required('Please select an account type.').min(1),
    email: yup.string().email('Please enter a valid email.').required('Please enter an email.'),
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password.").min(5),
    confirmpassword: yup.string().required("Please confirm your password.").min(5),
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
        body: JSON.stringify(values, null, 2),
      })
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data)
        setLoginType(data['login_type'])
        navigate('/')
      })
    }
  })

  const formikSignup = useFormik({
    initialValues: {
      login_type: '',
      email: '',
      username: '',
      password: '',
      confirmpassword: ''
    },
    validationSchema: fsSignup,
    onSubmit: (values) => {
      fetch('/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data)
        setLoginType(data['login_type'])
        navigate('/')
      })
    }
  })

  const handleToggleform = (state) => {
    if (state == 'login') setIsLogin(true)
    else setIsLogin(false)
  }

  if (isLogin) {
    return (
      <>
        <div className='form'>
          <form onSubmit={formikLogin.handleSubmit} id='loginForm'>
            <div id='loginSignup'>
              <button className='modalButton' onClick={() => handleToggleform('login')}>Login</button>
              <button className='modalButton' onClick={() => handleToggleform('signup')}>Signup</button>
            </div>
            <h1 className='formTitle'>Login</h1>
            <h3 className='formTag'>Please enter your account type, username, and password.</h3>
            <select id='login_type' className='loginInput' onChange={formikLogin.handleChange} value={formikLogin.values.login_type}>
              <option value=''>Select an Account Type</option>
              <option value='user'>User</option>
              <option value='business'>Business</option>
            </select>
            <input id='username' className='loginInput' type='text' onChange={formikLogin.handleChange} value={formikLogin.values.username} placeholder="Enter Username"></input>
            <input id='password' className='loginInput' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.password} placeholder="Enter Password"></input>
            <div id='loginButtons'>
              <button className='modalButton' type='submit'>Login</button>
              <button className='modalButton' onClick={() => navigate('/')}>Cancel</button>
            </div>
          </form>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='form'>
          <form onSubmit={formikSignup.handleSubmit} id='signupForm'>
            <div id='loginSignup'>
              <button className='modalButton' onClick={() => handleToggleform('login')}>Login</button>
              <button className='modalButton' onClick={() => handleToggleform('signup')}>Signup</button>
            </div>
            <h1 className='formTitle'>Signup</h1>
            <h3 className='formTag'>Please enter your account type, username, and password.</h3>
            <select id='login_type' className='loginInput' onChange={formikSignup.handleChange} value={formikSignup.values.login_type}>
              <option value=''>Select an Account Type</option>
              <option value='user'>User</option>
              <option value='business'>Business</option>
            </select>
            <input id='username' className='loginInput' type='text' onChange={formikSignup.handleChange} value={formikSignup.values.username} placeholder="Enter Username"></input>
            <input id='email' className='loginInput' type='email' onChange={formikSignup.handleChange} value={formikSignup.values.email} placeholder="Enter Email"></input>
            <input id='password' className='loginInput' type='password' onChange={formikSignup.handleChange} value={formikSignup.values.password} placeholder="Enter Password"></input>
            <input id='confirmpassword' className='loginInput' type='password' onChange={formikSignup.handleChange} value={formikSignup.values.confirmpassword} placeholder="Confirm Password"></input>
            <div id='loginButtons'>
              <button className='modalButton' type='submit'>Signup</button>
              <button className='modalButton' onClick={() => navigate('/')}>Cancel</button>
            </div>
          </form>
        </div>
      </>
    )
  }
  
}

export default Login