import React, { useState, useEffect } from "react";
import Card from "./bloodCard";
import "./Card.css";
import bloodimg from "../Assets/blood-drop (1).svg";

function CardDisplay() {
    const [donors, setDonors] = useState([]);


    useEffect(() => {
      fetchDonors();
    }, []);

    
    const fetchDonors = async () => {
        try {
          const response = await fetch("http://localhost:3005/donors/retrieveDonors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bloodgroup: "B+",
                city: "Lahore"
            }),
        });
        
        console.log("API Response:", response);
        
        const data = await response.json();
        console.log("Fetched Data:", data);
        
            if (Array.isArray(data)) {
                setDonors(data);
            } else {
                console.log("No donor exists");
            }
        } catch (error) {
            console.error("Error fetching donors:", error);
        }
    };

   
  
    return (
        <div className="me-container">
            <div className="cards-container">
                {donors.map((item, index) => (
                    <Card
                        key={index}
                        src={item.src || bloodimg}
                        title={item.title || "Blood Donor"}
                        name={item.name}
                        city={item.city}
                        blood={item.bloodgroup}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardDisplay;
