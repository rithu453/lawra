// import React from 'react';
// import './AboutUs.css';

// const AboutUsPage = () => {
//   return (
//     <div className="about-us-page">
//       <h2>About Us:</h2>
//       <p>
//         Welcome to Legal Assistance, your online destination for essential legal knowledge and assistance. We're dedicated to demystifying the law and equipping individuals with the knowledge they need to navigate legal matters confidently.
//       </p>
//       <h3>Our Mission:</h3>
//       <p>
//         At Legal Assistance, we're on a mission to bridge the gap between the law and the people. Our goal is simple: to empower individuals with the basic legal knowledge necessary to protect their rights. Through our platform, we aim to break down legal concepts into easily understandable language, making the law more accessible to all.
//       </p>
//       <h3>What We Offer:</h3>
//       <ul>
//         <li>
//           <strong>Simplified Legal Information:</strong> We break down complex legal concepts into clear, jargon-free explanations, making the law accessible to everyone. Whether you're facing a legal issue or seeking to understand your rights, our resources are designed to provide clarity and guidance.
//         </li>
//         <li>
//           <strong>Guidance and Resources:</strong> While we can't provide personalized legal advice, we offer practical guidance and direct you to reputable resources to address your legal needs.
//         </li>
//         <li>
//           <strong>Community Support:</strong> We believe in the strength of community and encourage engagement and collaboration. Join our community forums to connect with others and share experiences.
//         </li>
//       </ul>

//       <h3>Contact Us:</h3>
//       <p>
//         We're here to help! If you have any questions, comments, or suggestions, don't hesitate to reach out to us. You can contact us via email at [Contact Email] or connect with us on social media [Links to Social Media Profiles].
//       </p>
//       <p>
//         Thank you for choosing Legal Assistance as your trusted resource for legal empowerment.
//       </p>
//     </div>
//   );
// };

// export default AboutUsPage;


import React, { useState } from 'react';
import './AboutUs.css';

const AboutUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:rithwik@yahoo.com?subject=Contact from ${formData.name}&body=${formData.message}%0D%0AFrom: ${formData.email}`;
  };

  return (
    <div className="about-us-page">
      <h2>About Us:</h2>
      <p>
        Welcome to Legal Assistance, your online destination for essential legal knowledge and assistance. We're dedicated to demystifying the law and equipping individuals with the knowledge they need to navigate legal matters confidently.
      </p>

      <h3>Our Mission:</h3>
      <p>
        At Legal Assistance, we're on a mission to bridge the gap between the law and the people. Our goal is simple: to empower individuals with the basic legal knowledge necessary to protect their rights. Through our platform, we aim to break down legal concepts into easily understandable language, making the law more accessible to all.
      </p>

      <h3>What We Offer:</h3>
      <ul>
        <li>
          <strong>Simplified Legal Information:</strong> We break down complex legal concepts into clear, jargon-free explanations, making the law accessible to everyone. Whether you're facing a legal issue or seeking to understand your rights, our resources are designed to provide clarity and guidance.
        </li>
        <li>
          <strong>Guidance and Resources:</strong> While we can't provide personalized legal advice, we offer practical guidance and direct you to reputable resources to address your legal needs.
        </li>
        <li>
          <strong>Community Support:</strong> We believe in the strength of community and encourage engagement and collaboration. Join our community forums to connect with others and share experiences.
        </li>
      </ul>

      <h3>Founders:</h3>
      <div className="founders">
        <div className="founder-card">
          <img src="/Rithwik.jpg" alt="Rithwik" className="founder-photo" />
          <h4>Rithwik - Founder</h4>
          <p>
            3rd-year undergraduate student at KMIT, pursuing B.Tech.<br />
            Full Stack Developer | AI Developer | Blockchain Developer | Entrepreneur<br />
            Contact: 8143962706<br />
            Email: rithwik@charakan.info
          </p>
        </div>
        <div className="founder-card">
          <img src="/abhivamsh.jpg" alt="Co-Founder" className="founder-photo" />
          <h4>K.Abhivamsh - Co-Founder</h4>
          <p>
            3rd-year undergraduate student at KMIT, pursuing B.Tech.<br />
            Full Stack Developer | Entrepreneur<br />
            Contact: 7396003326<br />
            Email: kalwala.abhivamsh2@gmail.com
          </p>
        </div>
      </div>

      <h3>Contact Us:</h3>
      <p>We're here to help! If you have any questions, comments, or suggestions, don't hesitate to reach out.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>

      <p>Thank you for choosing Legal Assistance as your trusted resource for legal empowerment.</p>
    </div>
  );
};

export default AboutUsPage;
