import React from 'react'
import { Navigate } from 'react-router-dom'


function Authentication(props) {
    if(localStorage.getItem("token") || localStorage.getItem("userToken")) {
        return props.children

    } else {
     return  <Navigate to='/login'/> 
    }


}

export default Authentication