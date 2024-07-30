import React from 'react';
import './InfoPages.css';
import mapImage from '../../resources/map.png';

function ContactUs() {
  return (
    <div className="info-page-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, please contact us at ohchiachun001@gmail.com.</p>
      <div className="contact-image">
        <a href="https://maps.app.goo.gl/vZPsPm3KwiBFwwRm8" target="_blank" rel="noopener noreferrer">
          <img src={mapImage} alt="Contact Us" />
        </a>
      </div>
      <p>Address: 7, Gat Lebuh China, Taman Dhoby Ghaut, 10300 George Town, Pulau Pinang</p>
    </div>
  );
}

export default ContactUs;