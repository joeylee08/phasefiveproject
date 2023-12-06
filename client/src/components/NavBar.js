import { NavLink } from 'react-router-dom'

const NavBar = ({ loginType }) => {

  if (loginType == 'user') {
    return (
      <nav className='navbar'>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/profile'>Profile</NavLink></li>
          <li><NavLink to='/connections'>Connections</NavLink></li>
          <li><NavLink to='/meetusers'>Meet Users</NavLink></li>
          <li><NavLink to='/usersnearme'>Map of Users</NavLink></li>
          <li><NavLink to='/createevent'>Create Event</NavLink></li>
          <li><NavLink to='/myevents'>My Events</NavLink></li>
        </ul>
      </nav>
    )
  } else if (loginType == 'business') {
    return (
      <nav className='navbar'>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/profile'>Profile</NavLink></li>
          <li><NavLink to='/connections'>Connections</NavLink></li>
          <li><NavLink to='/meetusers'>Meet Users</NavLink></li>
          <li><NavLink to='/usersnearme'>Map of Users</NavLink></li>
          <li><NavLink to='/createevent'>Create Event</NavLink></li>
          <li><NavLink to='/myevents'>My Events</NavLink></li>
        </ul>
      </nav>
    )
  }
  
}

export default NavBar;