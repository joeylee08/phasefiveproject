import NavBar from './NavBar'
import Header from './Header'


const CreateListing = ({ loginType, setCurrentUser, setLoginType }) => {
  return (
    <div className='container'>
      <Header title={'Create Listing'} setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default CreateListing