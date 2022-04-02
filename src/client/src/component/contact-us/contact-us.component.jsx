import React from "react";
import "./contact-us.style.scss";

// customer support page

const ContactUs = () => {
  return (
    <div className="contactus-container">
      <div className="heading">
        <h2>Contact US</h2>
      </div>
      <div className="content">
        <p>You can reach us out through customer support: </p>
        <br />
        <a href="mailto:someone@example.com">customer.support@gmail.com</a>
      </div>
    </div>
  );
};

export default ContactUs;
