import React from 'react';
import './InfoPages.css'; // 引入样式文件

function AboutUs() {
  return (
    <div className="info-page-container">
      <h1>About Us</h1>
      <p>Welcome to the Know-Your-Neighborhood application. Our mission is to provide a comprehensive platform that allows users to explore and connect with their local community. Through this application, we aim to enhance the interaction and engagement within neighborhoods by providing essential services such as login and registration using existing APIs.</p>
      <p>Our mission is to create a user-friendly platform that facilitates the seamless integration of community services. We aim to provide users with easy access to information and resources about their neighborhood, ensuring they stay informed and connected.</p>
      <p>Key Features:</p>
      <ul>
        <li><strong>User Authentication:</strong> Our application supports user authentication through existing APIs, allowing for secure and efficient login and registration processes.</li>
        <li><strong>Information Access:</strong> Users can access basic information such as name and email from the API, ensuring that they have all the necessary details at their fingertips.</li>
        <li><strong>Community Engagement:</strong> We provide various features that encourage community engagement, including terms and conditions, and more.</li>
      </ul>
      <p>Why Choose Us?</p>
      <ul>
        <li><strong>Security:</strong> We prioritize the security of our users' information by implementing robust security measures and using trusted APIs for authentication.</li>
        <li><strong>User Experience:</strong> Our application is designed with the user in mind, ensuring a seamless and intuitive experience for all users.</li>
        <li><strong>Reliability:</strong> We strive to provide a reliable platform that users can depend on for accurate and up-to-date information about their neighborhood.</li>
      </ul>
      <p>Our Commitment:</p>
      <p>We are committed to continuously improving our application to meet the needs of our users. We value user feedback and are always looking for ways to enhance the functionality and usability of our platform.</p>
      <p>Thank You:</p>
      <p>Thank you for choosing Know-Your-Neighborhood. We look forward to serving you and helping you connect with your community.</p>
    </div>
  );
}

export default AboutUs;
