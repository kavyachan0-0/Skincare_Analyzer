import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section with Logo and Single Image */}
      <header className="hero">
        <div className="logo-container">
          <img 
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=150" 
            alt="Beauty Advisor Logo" 
            className="logo"
          />
          <h1>Beauty Advisor</h1>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h2>Your Personal Skincare Expert</h2>
            <p>Discover the perfect skincare routine with AI-powered analysis</p>
            <Link to="/analyzer" className="cta-button">
              Try Skin Analysis
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800"
              alt="Collection of various skincare products"
              className="main-image"
            />
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="about" id="about">
        <h2>About Beauty Advisor</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Beauty Advisor is your intelligent skincare companion, powered by advanced AI technology. We help you understand your skin's needs and make informed decisions about skincare products.</p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">✨</span>
                <h3>Ingredient Analysis</h3>
                <p>Detailed breakdown of skincare ingredients</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🔍</span>
                <h3>Safety Assessment</h3>
                <p>Comprehensive safety evaluation</p>
              </div>
              <div className="feature">
                <span className="feature-icon">💡</span>
                <h3>Smart Recommendations</h3>
                <p>Personalized product suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How does Beauty Advisor work?</h3>
            <p>Our AI analyzes skincare ingredients and provides detailed information about their safety, benefits, and potential concerns based on your skin type.</p>
          </div>
          <div className="faq-item">
            <h3>Is it free to use?</h3>
            <p>Yes! Beauty Advisor is completely free to use. Simply input your skincare ingredients or upload a product image to get started.</p>
          </div>
          <div className="faq-item">
            <h3>How accurate is the analysis?</h3>
            <p>Our analysis is based on scientific research and dermatological data. However, always consult with a healthcare professional for medical advice.</p>
          </div>
          <div className="faq-item">
            <h3>Can I analyze multiple ingredients?</h3>
            <p>Yes, you can analyze multiple ingredients or entire product formulations at once.</p>
          </div>
          <div className="faq-item">
            <h3>What skin types are supported?</h3>
            <p>We support all skin types including normal, oily, dry, combination, and sensitive skin.</p>
          </div>
          <div className="faq-item">
            <h3>How do I get personalized recommendations?</h3>
            <p>Select your skin type and concerns during analysis to receive tailored product recommendations.</p>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="contact" id="contact">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p>Have questions or feedback? We'd love to hear from you!</p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <p>contact@beautyadvisor.com</p>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <p>123 Beauty Street, Skincare City, SC 12345</p>
              </div>
            </div>
          </div>
          <div className="social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">LinkedIn</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Beauty Advisor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 