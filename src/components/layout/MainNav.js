import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MainNav.css";
import logo from "../../images/j4u-logo.svg";
import { getToken, logout, getRoles } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const MainNav = () => {
  const token = useSelector(getToken);
  const roles = useSelector(getRoles);
  const loginUser = useSelector((state) => state.auths?.user || {});
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsNavOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isAdmin = Array.isArray(roles)
    ? roles.includes("ROLE_ADMIN")
    : roles === "ROLE_ADMIN";

  const displayName =
    loginUser?.fullname || loginUser?.username || "Account";

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="J4U" className="brand-logo" />
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`fas ${isNavOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto align-items-center gap-1 my-2 my-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link-custom ${isActive("/") ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link-custom ${
                  isActive("/jobPost") || isActive("/jobList") ? "active" : ""
                }`}
                to="/jobPost"
              >
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link-custom ${
                  isActive("/company") ? "active" : ""
                }`}
                to="/company"
              >
                Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link-custom ${
                  isActive("/about") ? "active" : ""
                }`}
                to="/about"
              >
                About Us
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {token ? (
              <div className="position-relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="nav-user-dropdown-toggle"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="nav-user-avatar">
                    <i className="fas fa-user"></i>
                  </span>
                  <span>{displayName}</span>
                  <i className="fas fa-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
                </button>

                {isDropdownOpen && (
                  <div className="nav-dropdown-menu">
                    <div className="px-3 py-2 text-muted" style={{ fontSize: "0.8rem" }}>
                      Signed in as <strong>{displayName}</strong>
                    </div>
                    <div className="nav-dropdown-divider"></div>
                    <Link to="/profile" className="nav-dropdown-item">
                      <i className="fas fa-user-circle"></i> My Profile
                    </Link>
                    <Link to="/app" className="nav-dropdown-item">
                      <i className="fas fa-file-alt"></i> My Applications
                    </Link>
                    {isAdmin && (
                      <Link to="/admin/" className="nav-dropdown-item text-primary fw-semibold">
                        <i className="fas fa-shield-alt"></i> Admin Panel
                      </Link>
                    )}
                    <div className="nav-dropdown-divider"></div>
                    <button
                      type="button"
                      className="nav-dropdown-item text-danger border-0 bg-transparent w-100 text-start"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt"></i> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="nav-btn-login">
                  Log in
                </Link>
                <Link to="/signup" className="nav-btn-signup">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
