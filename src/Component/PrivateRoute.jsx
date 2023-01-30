import React,{useContext} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

function PrivateRoute({component:Component,...rest}) {
    const {user} = useContext(AuthContext)

    if (!user) return <Navigate to="/login" replace />;
    return <Outlet />;
    
  
}

export default PrivateRoute
