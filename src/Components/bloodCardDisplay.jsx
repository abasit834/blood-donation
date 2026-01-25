import React, { useState, useEffect } from "react";
import { Phone, MapPin, Droplet, User } from "lucide-react";
import "./Card.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Card({ src, title, name, city, blood, contact }) {
    const handleCall = () => {
        if (contact) {
            window.location.href = `tel:${contact}`;
        }
    };

    return (
        <div className="donor-card">
            <div className="donor-card-header">
                <div className="donor-card-icon">
                    <Droplet fill="currentColor" className="blood-icon" />
                </div>
                <div className="donor-blood-type">{blood}</div>
            </div>
            
            <div className="donor-card-body">
                <h3 className="donor-card-title">{title}</h3>
                
                <div className="donor-info">
                    <div className="donor-info-item">
                        <User className="info-icon" />
                        <span className="info-label">Name:</span>
                        <span className="info-value">{name}</span>
                    </div>
                    
                    <div className="donor-info-item">
                        <MapPin className="info-icon" />
                        <span className="info-label">City:</span>
                        <span className="info-value">{city}</span>
                    </div>

                    <div className="donor-info-item">
                        <Phone className="info-icon" />
                        <span className="info-label">Phone:</span>
                        <span className="info-value">{contact || 'Not available'}</span>
                    </div>
                </div>
            </div>
            
            <div className="donor-card-footer">
                <button className="donor-contact-btn" onClick={handleCall} disabled={!contact}>
                    <Phone className="btn-icon" />
                    Contact Donor
                </button>
            </div>
        </div>
    );
}


function CardDisplay() {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    if(location.state === null) navigate('/recipent')
    const { bloodGroup , city } = location.state || {};

    

    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://blood-donation-backend-z7gr.vercel.app/donors/retrieveDonors?bloodgroup=${encodeURIComponent(bloodGroup)}&city=${encodeURIComponent(city)}`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" }
                }
              );

            const data = await response.json();
            
            if (Array.isArray(data)) {
                setDonors(data);
                setError(null);
            } else {
                setError("No donors found");
                setDonors([]);
            }
        } catch (error) {
            console.error("Error fetching donors:", error);
            setError("Failed to fetch donors");
            setDonors([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="donor-display-container">
            <div className="donor-display-header">
                <h1 className="donor-display-title">
                    <Droplet className="title-icon" fill="currentColor" />
                    Available Blood Donors
                </h1>
                <p className="donor-display-subtitle">Connect with donors in your area</p>
            </div>

            {loading && (
                <div className="donor-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading donors...</p>
                </div>
            )}

            {error && !loading && (
                <div className="donor-error">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && donors.length === 0 && (
                <div className="donor-empty">
                    <Droplet className="empty-icon" />
                    <p>No donors available at the moment</p>
                </div>
            )}
            {!loading && donors.length > 0 && (
                <div className="donor-cards-grid">
                    {donors.map((item, index) => (
                        <Card
                            key={index}
                            src={item.src}
                            title={item.title || "Blood Donor"}
                            name={item.name}
                            city={item.city}
                            blood={item.bloodgroup}
                            contact={item.contactNumber}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardDisplay;