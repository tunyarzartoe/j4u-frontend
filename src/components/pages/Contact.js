import React, { useState } from "react";
import "./Contact.css";
import Meta from "./Meta";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <>
      <Meta title={"Contact Us - J4U"} />

      <section className="container py-5 my-4" id="contact">
        <div className="text-center section-title">
          <span className="stat-badge mb-2">Get In Touch</span>
          <h2>Have Any Questions?</h2>
          <p>We are here to support your hiring needs or assist with your application process</p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-10">
            <div className="contact-card">
              <div className="row g-5">
                <div className="col-md-5">
                  <div className="contact-info-box d-flex flex-column justify-content-between">
                    <div>
                      <h4 className="fw-bold mb-3 text-dark">Contact Information</h4>
                      <p className="text-muted small mb-4">
                        Reach out to our team directly. We typically reply within 24 business hours.
                      </p>

                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="rounded-circle p-2 bg-white text-primary shadow-sm">
                          <i className="fa fa-envelope"></i>
                        </div>
                        <div>
                          <div className="small text-muted">Email Us</div>
                          <div className="fw-semibold text-dark">contact@j4u-careers.com</div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="rounded-circle p-2 bg-white text-primary shadow-sm">
                          <i className="fa fa-phone-alt"></i>
                        </div>
                        <div>
                          <div className="small text-muted">Call Us</div>
                          <div className="fw-semibold text-dark">+95 9 878 787 878</div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle p-2 bg-white text-primary shadow-sm">
                          <i className="fa fa-map-marker-alt"></i>
                        </div>
                        <div>
                          <div className="small text-muted">Office Location</div>
                          <div className="fw-semibold text-dark">Mandalay & Yangon, Myanmar</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-top">
                      <div className="small text-muted mb-2">Follow our announcements</div>
                      <div className="d-flex gap-2">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light border">
                          <i className="fab fa-linkedin-in text-primary"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light border">
                          <i className="fab fa-facebook-f text-primary"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light border">
                          <i className="fab fa-twitter text-primary"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-7">
                  {submitted ? (
                    <div className="alert alert-success d-flex align-items-center gap-3 p-4 rounded-4" role="alert">
                      <i className="fas fa-check-circle fa-2x"></i>
                      <div>
                        <h5 className="alert-heading mb-1">Message Sent!</h5>
                        <p className="mb-0 small">Thank you for reaching out. We will get back to you shortly.</p>
                      </div>
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label className="form-label small fw-semibold text-muted">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          className="contact-input"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-sm-6">
                        <label className="form-label small fw-semibold text-muted">Your Email *</label>
                        <input
                          type="email"
                          name="email"
                          className="contact-input"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-semibold text-muted">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          className="contact-input"
                          placeholder="Inquiry about hiring / job listing"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-semibold text-muted">Message *</label>
                        <textarea
                          name="message"
                          className="contact-input"
                          placeholder="Write your message here..."
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <div className="col-12 mt-4">
                        <button type="submit" className="btn-primary-custom w-100">
                          <i className="fas fa-paper-plane me-2"></i> Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
