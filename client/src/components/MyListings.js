import NavBar from './NavBar'
import Header from './Header'


const MyListings = ({loginType}) => {
  return (
    <div className='container'>
      <Header title={'My Listings'}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default MyListings