import NavBar from './NavBar'
import Header from './Header'


const Home = ({loginType}) => {
  return (
    <div className='container'>
      <Header title={'Home'}/>
      <NavBar loginType={loginType}/>
      <div className='content'>

      </div>
    </div>
  )
}

export default Home