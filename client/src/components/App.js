import React, { useEffect, useState, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from './Home';
import MyListings from './MyListings';
import FindListing from './FindListing';
import CreateListing from './CreateListing';
import Account from './Account';
import Error from './Error';
import { UserContext } from "../context/UserContext";

function App() {
  const {loginType} = useContext(UserContext)

  const base_routes = (
    <>
      <Route path='/' element={<Login />} />
    </>
  )
  const user_routes = (
    <>
      <Route path='/' element={<Home  />} />
      <Route path='/mylistings' element={<MyListings  />} />
      <Route path='/findlisting' element={<FindListing  />} />
      <Route path='/account' element={<Account  />} />
    </>
  )

  const business_routes = (
    <>
      <Route path='/' element={<Home/>}/>
      <Route path='/mylistings' element={<MyListings />}/>
      <Route path='/createlisting' element={<CreateListing />}/>
      <Route path='/account' element={<Account />}/>
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

export default App;
