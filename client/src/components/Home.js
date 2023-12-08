import NavBar from './NavBar'
import Header from './Header'


const Home = ({loginType, setCurrentUser, setLoginType}) => {
  const title = loginType === 'user' ? 'User Home' : 'Business Home'
  return (
    <div className='container'>
      <Header title={title} setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default Home