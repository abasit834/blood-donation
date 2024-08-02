import React from "react";
import backgroundImage from '../Assets/patient.jpg'
import './Home.css'
import home from '../Assets/home.png';
import { useNavigate } from "react-router-dom";


function HomePage(){
    const navigate = useNavigate();
return (
<>
    <header>
        <nav>
            <ul>
            <li onClick={()=>{
               navigate('/become-a-donor');
            }}>Become A Donor</li>
            <li>Find Donor</li>
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