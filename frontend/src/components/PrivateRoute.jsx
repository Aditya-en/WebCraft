import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({isloggedin,children}) => {
    if(isloggedin){
        return children;
    }
    else{
        return <Navigate to="/login"/>
    }
  
}

export default PrivateRoute
