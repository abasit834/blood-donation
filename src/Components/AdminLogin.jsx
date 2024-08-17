import React, { useState } from "react";
import adminIcon from '../Assets/admin.png';
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
    const [username, setUsername] = useState(sessionStorage.getItem("Username") || '');
    const [password, setPassword] = useState(sessionStorage.getItem("password") || '');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(username === "admin" && password==="admin@123")  
        navigate("/admin/dashboard")
    
        if (username !== "admin" || password !== "admin@123") {
            alert("Incorrect Credentials");
            return;
        }
        
        if (username === "" || password === "") {
            alert("Please fill all input fields");
            return;
        }

        if (password.length < 6) {
            alert("Password should be at least 6 characters long");
            return;
        }
        
    
        // try{
        // const response = await axios.post("http://localhost:3005/admin/login",{username : username , password : password});
        // console.log(response);

        // if(response.status === 200)
        //     navigate("/admin/dashboard");
        // else
        // {
        //     alert("Invalid Credentials");
        //     return;
        // }


        // setUsername("");
        // setPassword("");

        // sessionStorage.clear();

        // console.log("Username:", username);
        // console.log("Password:", password);
        // }
        // catch(err){
        //     alert("Invalid Credentials");
        //     console.log(err);
        // }
    };

    return (
        <div className="admin-login-container">
            <h1>ADMIN LOGIN</h1>
            <div className="admin-login-card">
                <img src={adminIcon} alt="Admin Icon" className="admin-icon" />
                <h2>Admin Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                const value = e.target.value;
                                setUsername(value);
                                sessionStorage.setItem('Username', value);
                            }}
                            required
                        />
                        <span style={{ color: 'red' }}>
                            {username.length < 1 ? 'Username field is empty' : ''}
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                const value = e.target.value;
                                setPassword(value);
                                sessionStorage.setItem('password', value);
                            }}
                            required
                        />
                        <span style={{ color: password.length < 6 ? 'red' : 'green' }}>
                            {password.length < 6 ? 'Password should be at least 6 characters long' : 'Password length is sufficient!'}
                        </span>
                    </div>
                    <button
                        disabled={username.length < 1 || password.length < 6}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
