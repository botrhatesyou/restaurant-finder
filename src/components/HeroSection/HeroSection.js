import React from 'react';
import { Container } from 'react-bootstrap';
import './HeroSection.css';
import restphoto from './restphoto.jpeg';

// HeroSection component renders a hero section with a background image and some text
function HeroSection() {
    return (
        <div className="hero-section">
            {/* Display the background image */}
            <img src={restphoto} alt="Restaurant setting" className="hero-bg" />
            {/* Overlay to darken the background image */}
            <div className="hero-overlay"></div>
            {/* Container for the text content */}
            <Container className="hero-content text-center">
                {/* Welcome message */}
                <h2 className="welcome-message mb-5">Welcome to Restaurant Finder</h2>
                {/* Main heading */}
                <h1 className="display-3 mb-4">Discover the Best!</h1>
                {/* Subheading */}
                <p className="lead mb-4">Find, explore, and review the best dining experiences in Vancouver.</p>
            </Container>
        </div>
    );
}

export default HeroSection;
