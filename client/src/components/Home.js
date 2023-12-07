import NavBar from './NavBar'
import Header from './Header'


const Home = ({loginType, setCurrentUser, setLoginType}) => {
  return (
    <div className='container'>
      <Header title={'Home'} setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default Home