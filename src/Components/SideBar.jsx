import React from "react";
import "./Sidebar.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import blood from "../Assets/positive.png"
import recipent from "../Assets/blood-donation (1).png";
import log from "../Assets/logout.png";
import {NavLink,useNavigate } from "react-router-dom";


function SideBar() {
  const navigate = useNavigate();

  const handleLogout = (e) =>{
      e.preventDefault();
      localStorage.removeItem("token");
      navigate("/admin/login");
  }
  return (
    <>
        <div className="sidebar">
        <ul>

            <DashboardIcon style={{color :"white", position: "relative" ,top: "32px", right: "20px"}}/>
            <li><NavLink className="link" to="/admin/dashboard">Dashboard</NavLink></li>
            <li><img src={blood} alt="" /><span><NavLink className="link" to="/admin/donors">Donors</NavLink></span></li>
            <li><img src={recipent} alt="" /><span><NavLink className="link" to="/admin/recipents">Recipents</NavLink></span></li>
            <li> <img src={log} alt="" /><span id="logout" onClick={handleLogout}>Log Out</span></li>
        </ul>
        </div>
    </>
  );
}

export default SideBar;
