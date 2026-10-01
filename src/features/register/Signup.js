import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../user/userSlice";
import Meta from "../../components/pages/Meta";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signUpRequestStatus, setSignUpRequestStatus] = useState("idle");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const canCreate =
    [fullname, email, phone, password].every(Boolean) &&
    signUpRequestStatus === "idle";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canCreate) return;

    setSignUpRequestStatus("pending");
    setError("");

    try {
      const nameParts = fullname.trim().split(" ");
      const firstname = nameParts[0] || fullname;
      const lastname = nameParts.slice(1).join(" ") || "";

      await dispatch(
        register({
          firstname,
          lastname,
          fullname,
          username: email,
          phone,
          password,
        })
      ).unwrap();

      setSuccessMsg("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setSignUpRequestStatus("idle");
    }
  };

  return (
    <>
      <Meta title={"Sign Up - J4U"} />
      <div className="auth-page">
        <div className="auth-page__image-side" style={{
          background: `linear-gradient(135deg, rgba(13, 27, 62, 0.85) 0%, rgba(28, 92, 255, 0.75) 100%),
          url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat`
        }}>
          <div className="auth-page__image-overlay">
            <h2>Accelerate Your Career with J4U</h2>
            <p>
              Join thousands of job seekers who found their ideal career paths with our trusted platform.
            </p>
          </div>
        </div>

        <div className="auth-page__form-side">
          <div className="auth-page__form-wrapper">
            <div className="auth-page__brand">
              <h2>
                Create an Account with J<span className="logo">4</span>U
              </h2>
              <p className="auth-page__subtitle">
                Sign up to discover and apply for top opportunities
              </p>
            </div>

            {error && (
              <div className="auth-page__error">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            {successMsg && (
              <div className="alert alert-success d-flex align-items-center gap-2 p-3 rounded-3" role="alert">
                <i className="fas fa-check-circle"></i> {successMsg}
              </div>
            )}

            <form className="auth-page__form" onSubmit={onSubmit}>
              <div className="auth-input-group">
                <label htmlFor="signup-name">Full Name</label>
                <div className="auth-input-wrapper">
                  <i className="fas fa-user"></i>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="signup-email">Email Address</label>
                <div className="auth-input-wrapper">
                  <i className="fas fa-envelope"></i>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="signup-phone">Phone Number</label>
                <div className="auth-input-wrapper">
                  <i className="fas fa-phone"></i>
                  <input
                    id="signup-phone"
                    type="tel"
                    placeholder="e.g. +95 9 123 456 789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="signup-password">Password</label>
                <div className="auth-input-wrapper">
                  <i className="fas fa-lock"></i>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-page__submit-btn"
                disabled={!canCreate}
              >
                {signUpRequestStatus === "pending" ? (
                  <span className="auth-page__loading">
                    <i className="fas fa-spinner fa-spin"></i> Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="auth-page__switch">
              <p>
                Already have an account?{" "}
                <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
