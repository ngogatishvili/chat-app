import React from 'react';
import {Navigate} from "react-router-dom"

export const PrivateRoute = ({children}) => {
    
    
        
        if(!localStorage.getItem("user")) {
             return <Navigate to="/login"/>
        }else{
          return children;
        }
 

   
   

}

