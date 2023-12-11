import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const NavBar = () => {
  const {loginType} = useContext(UserContext)
  
  if (loginType == 'user') {
    return (
      <nav className='navbar'>
        <ul className='linksList'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/mylistings'>Saved Listings</NavLink></li>
          <li><NavLink to='/findlisting'>Find Listing</NavLink></li>
          <li><NavLink to='/account'>Account</NavLink></li>
        </ul>
      </nav>
    )
  } else if (loginType == 'business') {
    return (
      <nav className='navbar'>
        <ul className='linksList'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/mylistings'>Active Listings</NavLink></li>
          <li><NavLink to='/createlisting'>Create Listing</NavLink></li>
          <li><NavLink to='/account'>Account</NavLink></li>
        </ul>
      </nav>
    )
  } 
  
}

export default NavBar;