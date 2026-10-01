import React, { useState } from "react";
import Meta from "../../components/pages/Meta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRequestStatus, setLoginRequestStatus] = useState("idle");
  const [error, setError] = useState("");

  const canLogin =
    [email, password].every(Boolean) && loginRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onLogin = async (e) => {
    e.preventDefault();
    if (!canLogin) return;

    setLoginRequestStatus("pending");
    setError("");

    try {
      const result = await dispatch(
        login({ username: email, password })
      ).unwrap();

      if (result.success) {
        setEmail("");
        setPassword("");
        const roles = result.roleList || [];
        if (roles.includes("ROLE_ADMIN")) {
          navigate("/admin/", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoginRequestStatus("idle");
    }
  };

  return (
    <>
      <Meta title={"Login"} />
      <div className="auth-page">
        <div className="auth-page__form-side">
          <div className="auth-page__form-wrapper">
            <div className="auth-page__brand">
              <h2>
                Welcome to J<span className="logo">4</span>U
              </h2>
              <p className="auth-page__subtitle">
                Sign in to find your dream job
              </p>
            </div>

            {error && (
              <div className="auth-page__error">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <form className="auth-page__form" onSubmit={onLogin}>
              <div className="auth-input-group">
                <label htmlFor="login-email">Email Address</label>
                <div className="auth-input-wrapper">
                  <i className="fas fa-envelope"></i>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="login-password">Password</label>
                <div className="auth-input-wrapper">
                  <i className="fas fa-lock"></i>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-page__options">
                <Link to="/forgot-password" className="auth-page__forgot">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="auth-page__submit-btn"
                disabled={!canLogin}
              >
                {loginRequestStatus === "pending" ? (
                  <span className="auth-page__loading">
                    <i className="fas fa-spinner fa-spin"></i> Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="auth-page__switch">
              <p>
                Don't have an account?{" "}
                <Link to="/signup">Create Account</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="auth-page__image-side">
          <div className="auth-page__image-overlay">
            <h2>Find Your Dream Career</h2>
            <p>
              Connect with top companies and discover opportunities that match
              your skills and ambitions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
