import React from "react";
import Card from "./bloodCard";
import "./Card.css";
import bloodimg from "../Assets/blood-drop (1).svg";

function CardDisplay() {
    const arr = [
        {
          src:bloodimg,
          title: "Blood Donor",
          name: "Ali",
          city:"Islamabad",
          blood: "B+",
        },
        {
          src:bloodimg,
          title: "Blood Donor",
          name: "Ali",
          city:"Islamabad",
          blood: "B+",
        },
        {
          src:bloodimg,
          title: "Blood Donor",
          name: "Ali",
          city:"Islamabad",
          blood: "B+",
        }, {
          src:bloodimg,
          title: "Blood Donor",
          name: "Ali",
          city:"Islamabad",
          blood: "B+",
        }, {
          src:bloodimg,
          title: "Blood Donor",
          name: "Ali",
          city:"Islamabad",
          blood: "B+",
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
            name={item.name}
            city={item.city}
            blood={item.blood}
            
          />
        ))}
      </div>
    </div>
  );
}

export default CardDisplay;
