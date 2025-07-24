import React from 'react';
import Footer from './Footer';
import './Home.css';
import bgImage from './images/plufow-le-studio-loq_SHCuEyg-unsplash.jpg'; // Update the path if it's different

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage})`,
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>BPCL LPG Bottling</h1>
            <p className="hero-subtitle">
              Fueling India's Progress with Clean Energy
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Bharat Gas?</h2>
          <p className="section-description">
            Empowering industries and households with reliable LPG solutions across India
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="https://img.icons8.com/fluency/96/home.png" alt="Household" />
            </div>
            <h3>Household Reach</h3>
            <p>Trusted by over 8 crore Indian homes with our premium LPG services.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="https://img.icons8.com/color/96/hospital.png" alt="Commercial" />
            </div>
            <h3>Commercial Use</h3>
            <p>Reliable supply for hotels, hospitals, and industrial applications.</p>
          </div>

          
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="section-header">
          <h2>Our Bottling Facilities</h2>
          <p className="section-description">
            State-of-the-art plants ensuring safety and efficiency
          </p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1470&q=80"
              alt="BPCL Plant"
            />
            <div className="gallery-caption">Automated Bottling Line</div>
          </div>
          
          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1470&q=80"
              alt="BPCL Quality"
            />
            <div className="gallery-caption">Quality Control</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>50+</h3>
            <p>Bottling Plants</p>
          </div>
          <div className="stat-item">
            <h3>8 Crore+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Safety Compliance</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
