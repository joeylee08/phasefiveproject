import NavBar from './NavBar'
import Header from './Header'


const CreateListing = ({loginType}) => {
  return (
    <div className='container'>
      <Header title={'Create Listing'}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default CreateListing