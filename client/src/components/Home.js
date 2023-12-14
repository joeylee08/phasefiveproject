import NavBar from './NavBar'
import Header from './Header'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import UserInfo from './UserInfo'
import Map from './Map'

const Home = () => {
  const { loginType, currentUser } = useContext(UserContext)
  const title = loginType === 'user' ? 'Manna Foods Home' : 'Manna Foods Business Home'

  const address = currentUser.location || '3 United Nations Plaza, New York, NY 10017'

  return (
    <div className='container'>
      <Header title={title}/>
      <NavBar/>
      <div className='content'>
        <UserInfo />
        <Map mapClass={'homeMap'} center={address} items={[]} />
      </div>
    </div>
  )
}

export default Home