import React from "react";

import Card from "./bloodCard";
import "./Card.css";
import bloodimg from "../Assets/blood-drop (1).svg";

function CardDisplay() {
    const arr = [
        {
          src:bloodimg,
          title: "Blood Donar",
          Name: "Name",
          name: "Ali",
          City:"City",
          city:"Islamabad",
          Tools: "B+",
         
        }
      ];
      

  return (
    <div className="me-container">
      <div className="cards-container">
        {arr.map((item, index) => (
          <Card
            key={index}
            src={item.src}
            title={item.title}
            Name={item.Name}
            name={item.name}
            City={item.City}
            city={item.city}
            Tools={item.Tools}
            
          />
        ))}
      </div>
    </div>
  );
}

export default CardDisplay;
