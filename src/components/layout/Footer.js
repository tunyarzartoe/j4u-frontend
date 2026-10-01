import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer-modern mt-5 pt-5">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <span className="footer-brand">
              J<span className="logo">4</span>U
            </span>
            <p className="pe-lg-4 text-secondary">
              Connecting talented candidates with premier companies. Discover career opportunities, compare salaries, and find your dream workplace.
            </p>
            <div className="d-flex gap-2 mt-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="footer-heading">Navigation</h5>
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/jobPost">Explore Jobs</Link>
            <Link className="footer-link" to="/company">Top Companies</Link>
            <Link className="footer-link" to="/about">About Us</Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Contact</h5>
            <p className="mb-2 d-flex align-items-center gap-2">
              <i className="fa fa-map-marker-alt text-primary"></i>
              Mandalay & Yangon, Myanmar
            </p>
            <p className="mb-2 d-flex align-items-center gap-2">
              <i className="fa fa-phone-alt text-primary"></i>
              +95 9 878 787 878
            </p>
            <p className="mb-2 d-flex align-items-center gap-2">
              <i className="fa fa-envelope text-primary"></i>
              contact@j4u-careers.com
            </p>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Newsletter</h5>
            <p className="text-secondary small">
              Subscribe to get notified whenever fresh job opportunities open.
            </p>
            <form onSubmit={handleSubscribe} className="position-relative">
              <input
                className="footer-newsletter-input pe-5"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn position-absolute top-50 end-0 translate-middle-y me-1 p-2 rounded-circle"
                style={{ width: "36px", height: "36px", background: "var(--primary, #1c5cff)", color: "#fff" }}
                aria-label="Subscribe"
              >
                <i className="fas fa-paper-plane" style={{ fontSize: "0.8rem" }}></i>
              </button>
            </form>
            {subscribed && (
              <small className="text-success mt-2 d-block">
                <i className="fas fa-check-circle me-1"></i> Thank you for subscribing!
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <div>
            &copy; {new Date().getFullYear()} J4U. All rights reserved.
          </div>
          <div className="d-flex gap-3">
            <Link to="/about" className="text-secondary text-decoration-none">Privacy Policy</Link>
            <Link to="/about" className="text-secondary text-decoration-none">Terms of Service</Link>
            <Link to="/about" className="text-secondary text-decoration-none">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;