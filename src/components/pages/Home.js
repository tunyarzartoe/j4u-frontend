import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Meta from "./Meta";
import SearchJob from "../../features/jobs/SearchJob";
import JobCategory from "../../features/jobs/JobCategory";
import JobList from "../../features/jobs/JobList";
import CompanyLogo from "../../logo/CompanyLogo";
import About from "./About";
import Contact from "./Contact";

function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");

  const handleHeroSearch = (e) => {
    e.preventDefault();
    // Scroll smoothly to search section or navigate with query
    const searchSection = document.getElementById("search-job-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/jobPost");
    }
  };

  return (
    <>
      <Meta title={"Home - Find Your Dream Career"} />

      <div className="container">
        <section className="hero-section">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="stat-badge mb-3">
                <i className="fas fa-fire text-danger"></i> Trending Career Platform
              </span>
              <h1 className="hero-heading">
                The Best Offer For Your <span>Career Journey</span>
              </h1>
              <p className="hero-subtext">
                J4U connects ambitious candidates with top employers across Myanmar and worldwide. Explore thousands of active listings and find your next milestone.
              </p>

              <div className="hero-stats">
                <div className="hero-stat-item">
                  <span className="hero-stat-number">1,200+</span>
                  <span className="hero-stat-label">Verified Jobs</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">350+</span>
                  <span className="hero-stat-label">Companies</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">98%</span>
                  <span className="hero-stat-label">Hiring Rate</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-search-card">
                <h3>Start Your Search</h3>
                <form onSubmit={handleHeroSearch}>
                  <div className="hero-input-wrapper">
                    <i className="fas fa-search"></i>
                    <input
                      type="text"
                      className="hero-input"
                      placeholder="Job title, skill or keyword"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>

                  <div className="hero-input-wrapper">
                    <i className="far fa-clock"></i>
                    <select
                      className="hero-select"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                    >
                      <option value="">Any Job Type</option>
                      <option value="Full time">Full time</option>
                      <option value="Part time">Part time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div className="hero-input-wrapper">
                    <i className="fa fa-map-marker-alt"></i>
                    <select
                      className="hero-select"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">Any Location</option>
                      <option value="Remote">Remote</option>
                      <option value="Yangon">Yangon</option>
                      <option value="Mandalay">Mandalay</option>
                      <option value="Bagan">Bagan</option>
                    </select>
                  </div>

                  <button type="submit" className="hero-search-btn">
                    <i className="fas fa-search me-2"></i> Explore Opportunities
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="search-job-section">
        <SearchJob initialKeyword={keyword} initialJobType={jobType} initialLocation={location} />
      </div>

      <JobCategory />
      <JobList />
      <About />
      <CompanyLogo />
      <Contact />
    </>
  );
}

export default Home;
