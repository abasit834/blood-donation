import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-header">
          <div className="text-content">
            <h2 className="card-title">{props.title}</h2>
            <p className="card-details">
              <span className="card-name-label" id="Name">Name: </span>
              <span className="card-name-value">{props.name}</span>
            </p>
            <p className="card-detail">
              <span className="card-name-label" id="City">City : </span>
              <span className="card-name-value">{props.city}</span>
            </p>
            <h4 className="card-subtitle">{props.blood}</h4>
            <div className="button-container">
              <button className="card-button">View Ph#</button>
              <button className="card-button">Button 2</button>
            </div>
          </div>
          <img id="imgg" src={props.src} alt="Card Image" />
        </div>
      </div>
    </div>
  );
}

export default Card;
