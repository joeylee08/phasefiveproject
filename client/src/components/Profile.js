import NavBar from './NavBar'
import Header from './Header'


const Profile = ({loginType}) => {
  return (
    <div className='container'>
      <Header title={'Profile'}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default Profile