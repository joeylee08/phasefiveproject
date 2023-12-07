import NavBar from './NavBar'
import Header from './Header'


const MyListings = ({loginType}) => {
  return (
    <div className='container'>
      <Header title={'Find Listing'}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default MyListings