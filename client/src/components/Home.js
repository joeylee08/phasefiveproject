import NavBar from './NavBar'
import Header from './Header'


const Home = () => {
  return (
    <div className='container'>
      <Header title={'Home'}/>
      <NavBar loginType={'user'}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default Home