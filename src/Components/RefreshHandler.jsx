import React, { useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

function RefreshHandler({setIsLoggedIn}) {
const location = useLocation();
const navigate = useNavigate();

useEffect(()=>{

    if(localStorage.getItem("token"))
    {
        setIsLoggedIn(true);
        if(location.pathname === "/admin/login")    
        navigate("/admin/dashboard",{replace : false});  
        
    }

},[location.pathname,navigate,setIsLoggedIn])



return (
    null
)
}

export default RefreshHandler