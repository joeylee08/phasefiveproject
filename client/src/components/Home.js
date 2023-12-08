import NavBar from './NavBar'
import Header from './Header'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Home = () => {
  const { loginType } = useContext(UserContext)
  const title = loginType === 'user' ? 'Manna User Home' : 'Manna Business Home'

  return (
    <div className='container'>
      <Header title={title}/>
      <NavBar/>
      <div className='content'>

      </div>
    </div>
  )
}

export default Home