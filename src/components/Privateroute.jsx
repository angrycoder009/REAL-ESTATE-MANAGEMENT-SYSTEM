import React from 'react'
import { Outlet ,Navigate } from 'react-router';
import {UseAuthStatus} from '../hooks/UseAuthStatus';

export default function Privateroute() {
    const {loggedIn ,checkingStatus}= UseAuthStatus();
    if(checkingStatus){
        return <h3>loadding...</h3>;
    }
  return loggedIn ? <Outlet/> :<Navigate to = "/sign-in"/>
   
}
