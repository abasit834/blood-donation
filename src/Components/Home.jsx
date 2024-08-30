import React, { useState } from "react";
import backgroundImage from '../Assets/patient.jpg'
import './Home.css'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faX } from '@fortawesome/free-solid-svg-icons';



function HomePage(){
    const navigate = useNavigate();
    const [show,setShow] = useState(false);
return (
<>
    <header>
        <FontAwesomeIcon id="bars" icon={faBars} onClick={()=>setShow(true)}/>
        <div className={show ? "home show":"home"}>
        <FontAwesomeIcon icon={faX} id="close" onClick={()=>setShow(false)}/>
            <ul>
            <li onClick={()=>{
                if(localStorage.getItem("token"))
                {
                    navigate("/admin/dashboard");    
                }
                else{
                navigate("/admin/login");
                }
            }}>Admin</li>   
            <li onClick={()=>{
               navigate('/become-a-donor');
            }}>Become A Donor</li>
            <li onClick={()=>{
                navigate('/recipent');
            }}>Find Donor</li>
            </ul>

        </div>
        <nav>
            <ul>
            <li onClick={()=>{
                navigate("/admin/login");
            }}>Admin</li>   
            <li onClick={()=>{
               navigate('/become-a-donor');
            }}>Become A Donor</li>
            <li onClick={()=>{
                navigate('/recipent');
            }}>Find Donor</li>
            </ul>
        </nav>
    </header>
    
    <section>
        <div className="image">
            <img src={backgroundImage} alt="" />
        </div>
        <div>
            <h1>Every Drop Counts <br />Donate Now, Save A Life
            </h1>
        </div>
    </section>

</>
);
}

export default HomePage;