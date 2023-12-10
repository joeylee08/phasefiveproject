import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const UserInfo = () => {
  const {loginType, currentUser} = useContext(UserContext)

  if (loginType === 'user') {
    return (
      <div className='homeDetails'>
        <h1>{currentUser.username}</h1>
        <p>Member Since: {currentUser.created_at}</p>
      </div>
    )
  } else {
    return (
      <div className='homeDetails'>
        <h1>{currentUser.business_name}</h1>
        <p>Member Since: {currentUser.created_at}</p>
      </div>
    )
  }
}

export default UserInfo