import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const {Component} = props;
    const navigate = useNavigate();
    const isLoggedIn = true;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/admin/login");
        }
    });

    return (
    <div>
    <Component/>
    </div>
    )
    
}

export default ProtectedRoute;