import React from "react";

const Contact = () => {
  return (
    <div className="container mt-5 pt-5" style={{padding: "30px"}}>
      <h2 className="text-center mb-4">Contact Us</h2>

      <div className="row g-4">

        {/* Google Map */}
        <div className="col-md-6">
          <div className="ratio ratio-4x3 rounded shadow">
            <iframe
              title="E-Tree Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1892.138053813201!2d73.8213460382284!3d18.47114843968655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2954a73cbe899%3A0x27cca9a9d5ade693!2sE-Tree%20Association!5e0!3m2!1sen!2sin!4v1754231985783!5m2!1sen!2sin" 
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Info */}
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <div className="bg-light rounded shadow p-4 h-100">

            <h5 className="mb-3">Office Address</h5>
            <p className="mb-4">
              Sinhgad Rd, Uma Housing Society, Manik Baug, Anand Nagar, Pune, Maharashtra 411051
            </p>

            <h5 className="mb-3">Phone</h5>
            <p className="mb-4">
              <a href="tel:+919975822798" className="text-decoration-none text-dark">
                +91 9975822798
              </a>
            </p>

            <h5 className="mb-3">Email</h5>
            <p>
              <a href="mailto:messageetree@gmail.com" className="text-decoration-none text-dark">
                messageetree@gmail.com
              </a>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
