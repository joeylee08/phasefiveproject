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

function Router({ currentUser, loginType, setCurrentUser, setLoginType }) {

  const base_routes = (
    <>
      <Route path='/' element={<Login setCurrentUser={setCurrentUser} setLoginType={setLoginType}/>} />
    </>
  )
  const user_routes = (
    <>
      <Route path='/' element={<Home setCurrentUser={setCurrentUser} setLoginType={setLoginType} loginType={loginType}/>} />
      <Route path='/mylistings' element={<MyListings loginType={loginType}/>} />
      <Route path='/findlisting' element={<FindListing loginType={loginType}/>} />
      <Route path='/profile' element={<Profile loginType={loginType}/>} />
    </>
  )

  const business_routes = (
    <>
      <Route path='/' element={<Home setCurrentUser={setCurrentUser} setLoginType={setLoginType} loginType={loginType}/>} />
      <Route path='/mylistings' element={<MyListings loginType={loginType}/>} />
      <Route path='/createlisting' element={<CreateListing loginType={loginType}/>} />
      <Route path='/profile' element={<Profile loginType={loginType}/>} />
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