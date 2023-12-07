import NavBar from './NavBar'
import Header from './Header'


const MyListings = ({ loginType, setCurrentUser, setLoginType }) => {
  return (
    <div className='container'>
      <Header title={'Find Listing'} setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default MyListings