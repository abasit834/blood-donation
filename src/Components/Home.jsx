import React, { useState } from "react";
import { Menu, X, Droplet } from "lucide-react";
import './Home.css';
import { useNavigate } from "react-router-dom";

function Home() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleDonorClick = () => {
        console.log('Navigate to become-a-donor');
        navigate('/become-a-donor')
        setShow(false);
    };

    const handleRecipientClick = () => {
        console.log('Navigate to recipient');
        navigate('/recipent');
        setShow(false);
    };

    return (
        <div className="home-page-wrapper">
            {/* Header */}
            <header className="home-header">
                <div className="home-header-container">
                    <div className="home-header-content">
                        {/* Logo */}
                        <div className="home-logo">
                            <div className="home-logo-icon">
                                <Droplet className="home-droplet-icon" fill="currentColor" />
                            </div>
                            <span className="home-logo-text">LifeBlood</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="home-desktop-nav">
                            <ul>
                                <li onClick={handleDonorClick}>Become A Donor</li>
                                <li onClick={handleRecipientClick}>Find Donor</li>
                            </ul>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setShow(true)} className="home-mobile-menu-btn">
                            <Menu className="home-menu-icon" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div 
                className={`home-mobile-overlay ${show ? 'home-show' : ''}`}
                onClick={() => setShow(false)}
            >
                <div 
                    className={`home-mobile-sidebar ${show ? 'home-show' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={() => setShow(false)} className="home-close-btn">
                        <X className="home-close-icon" />
                    </button>
                    
                    <ul className="home-mobile-menu">
                        <li onClick={handleDonorClick}>Become A Donor</li>
                        <li onClick={handleRecipientClick}>Find Donor</li>
                    </ul>
                </div>
            </div>

            {/* Hero Section */}
            <section className="home-hero-section">
                <div className="home-hero-container">
                    <div className="home-hero-grid">
                        {/* Text Content */}
                        <div className="home-hero-text">
                            <h1 className="home-hero-title">
                                <span className="home-title-gradient">Every Drop Counts</span>
                                <br />
                                <span className="home-title-dark">Donate Now, Save A Life</span>
                            </h1>
                            <p className="home-hero-description">
                                Your single donation can save up to three lives. Join our community of heroes today.
                            </p>
                            <div className="home-hero-buttons">
                                <button onClick={handleDonorClick} className="home-btn-primary">
                                    Become A Donor
                                </button>
                                <button onClick={handleRecipientClick} className="home-btn-secondary">
                                    Find Donor
                                </button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="home-hero-image">
                            <div className="home-image-wrapper">
                                <div className="home-image-glow"></div>
                                <div className="home-image-container">
                                    <div className="home-image-box">
                                        <Droplet className="home-hero-droplet" fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="home-stats-section">
                <div className="home-stats-container">
                    <div className="home-stats-grid">
                        <div className="home-stat-card">
                            <div className="home-stat-number">1M+</div>
                            <div className="home-stat-label">Lives Saved</div>
                        </div>
                        <div className="home-stat-card">
                            <div className="home-stat-number">50K+</div>
                            <div className="home-stat-label">Active Donors</div>
                        </div>
                        <div className="home-stat-card">
                            <div className="home-stat-number">24/7</div>
                            <div className="home-stat-label">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;