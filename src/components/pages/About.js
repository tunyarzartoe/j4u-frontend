import React, { useEffect } from "react";
import Meta from "./Meta";
import "./About.css";
import { Link, useLocation } from "react-router-dom";
import Aos from "aos";
import PageHeader from "../ui/PageHeader";

const About = () => {
  const location = useLocation();
  const isStandalonePage = location.pathname === "/about";

  useEffect(() => {
    Aos.init({ duration: 600, once: true });
  }, []);

  return (
    <section data-aos="fade-up">
      <Meta title={"About Us - J4U"} />

      {isStandalonePage && (
        <PageHeader
          title="About Us"
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "About Us" },
          ]}
        />
      )}

      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="position-relative rounded-4 overflow-hidden shadow-lg" style={{ minHeight: "380px" }}>
              <img
                className="img-fluid w-100 h-100"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="J4U Team collaboration"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-left">
            <span className="stat-badge mb-3">Our Mission</span>
            <h2 className="display-6 fw-bold mb-3" style={{ color: "#0f172a" }}>
              Bridging Job Seekers with Visionary Employers
            </h2>
            <p className="text-secondary mb-4" style={{ lineHeight: 1.7 }}>
              J4U was built to remove friction from modern career growth. We empower job seekers with transparent information, verified job openings, and direct access to company cultures, while helping organizations find exceptional talent faster.
            </p>

            <div className="row gy-3 mb-4">
              <div className="col-sm-12 d-flex align-items-center gap-3">
                <div className="rounded-circle p-2 bg-primary-subtle text-primary">
                  <i className="fa fa-check"></i>
                </div>
                <span className="fw-medium text-dark">Verified company profiles and authentic vacancies</span>
              </div>
              <div className="col-sm-12 d-flex align-items-center gap-3">
                <div className="rounded-circle p-2 bg-primary-subtle text-primary">
                  <i className="fa fa-check"></i>
                </div>
                <span className="fw-medium text-dark">Seamless job matching algorithms tailored to your skills</span>
              </div>
              <div className="col-sm-12 d-flex align-items-center gap-3">
                <div className="rounded-circle p-2 bg-primary-subtle text-primary">
                  <i className="fa fa-check"></i>
                </div>
                <span className="fw-medium text-dark">Transparent compensation, benefits, and workplace insights</span>
              </div>
            </div>

            <Link to="/jobPost" className="btn-primary-custom">
              Explore Available Jobs <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-5 my-3">
        <div className="text-center section-title" data-aos="fade-up">
          <span className="stat-badge mb-2">Leadership</span>
          <h2>Our Leadership Team</h2>
          <p>Passionate professionals committed to reforming hiring experiences</p>
        </div>

        <div className="row g-4 justify-content-center" data-aos="fade-up">
          <div className="col-lg-4 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">
              <div className="mx-auto mb-3 rounded-circle overflow-hidden" style={{ width: "120px", height: "120px" }}>
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt="Elena Vance"
                />
              </div>
              <h5 className="fw-bold mb-1">Elena Vance</h5>
              <span className="text-primary fw-medium small mb-3">Founder & CEO</span>
              <p className="text-muted small">
                Former tech talent lead passionate about building accessible career infrastructure.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">
              <div className="mx-auto mb-3 rounded-circle overflow-hidden" style={{ width: "120px", height: "120px" }}>
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                  alt="Robert Jordan"
                />
              </div>
              <h5 className="fw-bold mb-1">Robert Jordan</h5>
              <span className="text-primary fw-medium small mb-3">Head of Partnerships</span>
              <p className="text-muted small">
                Oversees corporate employer relationships and recruitment quality assurance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
