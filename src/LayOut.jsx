import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'


function LayOut({userData , setUserData}) {
  return <>
    <Navbar userData={userData} setUserData={setUserData} />

    <Outlet></Outlet>


  </>
}

export default LayOut