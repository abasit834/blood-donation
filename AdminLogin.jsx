import React, { useState } from "react";
import adminIcon from '../Assets/admin.png';
import "./AdminLogin.css";

function AdminLogin() {
    const [username, setUsername] = useState(sessionStorage.getItem("Username") || '');
    const [password, setPassword] = useState(sessionStorage.getItem("password") || '');

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "" || password === "") {
            alert("Please fill all input fields");
            return;
        }

        if (password.length < 6) {
            alert("Password should be at least 6 characters long");
            return;
        }

        setUsername("");
        setPassword("");

        sessionStorage.clear();

        console.log("Username:", username);
        console.log("Password:", password);
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
