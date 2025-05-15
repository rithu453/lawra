import React from 'react';
import LawcardsF from './components/CardF';
import LegalNews from './components/news';
import './Home.css';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
      {/* About Indian Law Section */}
      <section className="about-section">
        <div className="section-header">
          <div className="section-line"></div>
          <h2>Understanding Indian Law</h2>
          <div className="section-line"></div>
        </div>
        <div className="about-content">
          <p>
            India follows a hybrid legal system with elements from common law, civil law, customary law, and religious law. 
            The Constitution of India, adopted on January 26, 1950, serves as the foundational document of Indian law, 
            establishing a federal structure with division of powers between the Union and State governments.
          </p>
          <p>
            The Indian legal system is structured with the Supreme Court at the apex, followed by High Courts at the state level,
            and District Courts at the district level. Specialized tribunals handle specific areas of law to ensure efficient 
            resolution of disputes.
          </p>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </section>


      {/* Law Cards Section */}
      <section className="law-categories-section">
        <div className="section-header">
          <div className="section-line"></div>
          <h2>Explore Legal Practice Areas</h2>
          <div className="section-line"></div>
        </div>
        <p className="section-intro">Navigate through our comprehensive collection of legal categories to find specific information tailored to your needs.</p>
        <LawcardsF />
      </section>

      {/* Legal News Section */}
      <section className="legal-news-section">
        <div className="section-header">
          <div className="section-line"></div>
          <h2>Legal Updates & News</h2>
          <div className="section-line"></div>
        </div>
        <p className="section-intro">Stay informed about the latest developments in Indian law and significant legal cases.</p>
        <LegalNews />
      </section>

      {/* Call to action */}
      <section className="cta-section">
        <h2>Need Personalized Legal Assistance?</h2>
        <p>Our Legal Chatbot Lawra is ready to help you navigate any legal challenge</p>
        <Link to="/chatbot">
          <button className="cta-button">Chat with Lawra <span className="arrow-right">→</span></button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
