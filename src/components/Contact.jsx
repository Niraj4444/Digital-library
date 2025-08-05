// src/components/Contact.jsx

import React from 'react';

function Contact() {
  // A simple handler to prevent page reload on form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thank you for your message! (This is a demo)");
  }

  return (
    // We use the new .content-card class for the container
    <div className="content-card" id="contact">
      <h2>Contact Us</h2>
      <p>Have questions? Please fill out the form below.</p>

      {/* This form now uses your main theme's styles automatically! */}
      <form onSubmit={handleSubmit}>
        <p><input className="form-input" type="text" placeholder="Your Name" required name="Name" /></p>
        <p><input className="form-input" type="email" placeholder="Your Email" required name="Email" /></p>
        <p><textarea className="form-input" placeholder="Your Message" required name="Message"></textarea></p>

        {/* This button will be styled by your .btn and .btn-primary classes */}
        <p><button className="btn btn-primary" type="submit">Send Message</button></p>
      </form>
    </div>
  );
}

export default Contact;