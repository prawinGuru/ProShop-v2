import React from 'react'
import {Outlet,Navigate} from "react-router-dom"
import {useSelector} from 'react-redux'

// as we can type /shipping in th url ,it automatically pick us to that screen but that shouldnt be done,,
//we have to manage that with private route to restrict that
const PrivateRoute = () => {

    const {userInfo} =useSelector((state)=>state.auth)
  
    return userInfo?<Outlet/>:<Navigate to='/login' replace />//The replace prop in <Navigate /> replaces the current entry in the browser history with the new one, so the user can’t use the back button to return to the protected page. 
    
  
}

export default PrivateRoute