import NavBar from './NavBar'
import Header from './Header'


const Profile = ({loginType, setCurrentUser, setLoginType}) => {
  return (
    <div className='container'>
      <Header title={'Profile'} setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default Profile