import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import MyListings from './MyListings';
import FindListing from './FindListing';
import CreateListing from './CreateListing';
import Profile from './Profile';
import Error from './Error';
import { useContext } from 'react';
import UserContext from './App';

function Router({ setCurrentUser, setLoginType }) {
  const loginType = 'user'

  const base_routes = (
    <>
      <Route path='/' element={<Login setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>} />
    </>
  )
  const user_routes = (
    <>
      <Route path='/' element={<Home loginType={loginType}/>} />
      <Route path='/mylistings' element={<MyListings/>} />
      <Route path='/findlisting' element={<FindListing/>} />
      <Route path='/profile' element={<Profile/>} />
    </>
  )

  const business_routes = (
    <>
      <Route path='/' element={<Home loginType={loginType}/>} />
      <Route path='/mylistings' element={<MyListings/>} />
      <Route path='/createlisting' element={<CreateListing/>} />
      <Route path='/profile' element={<Profile/>} />
    </>
  )

  let routes;

  if (loginType === 'user') routes = user_routes
  else if (loginType === 'business') routes = business_routes
  else routes = base_routes

  return (
    <>
      <Routes>
        {routes}
        <Route path="/:error" element={<Error />} />
      </Routes>
    </>
  )
}

export default Router;