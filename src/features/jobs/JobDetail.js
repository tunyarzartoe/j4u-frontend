import React from "react";
import "./JobDetail.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectJobPostById } from "./jobSlice";
import Meta from "../../components/pages/Meta";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";

const JobDetail = () => {
  const { jobPostId } = useParams();
  const jobPost = useSelector((state) =>
    selectJobPostById(state, Number(jobPostId))
  );

  if (!jobPost) {
    return (
      <>
        <PageHeader
          title="Job Detail"
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Jobs", to: "/jobPost" },
            { label: "Not Found" },
          ]}
        />
        <div className="container py-5">
          <EmptyState
            icon="fa-search"
            title="Job Opening Not Found"
            message="The job listing you are looking for may have expired or been removed."
            action={
              <Link to="/jobPost" className="btn-primary-custom mt-3">
                <i className="fas fa-arrow-left me-2"></i> Browse Other Jobs
              </Link>
            }
          />
        </div>
      </>
    );
  }

  const skillsList = Array.isArray(jobPost.skills)
    ? jobPost.skills
    : typeof jobPost.skills === "string"
    ? jobPost.skills.split(",").map((s) => s.trim())
    : [];

  return (
    <>
      <Meta title={`${jobPost.title} - J4U`} />

      <PageHeader
        title={jobPost.title}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Jobs", to: "/jobPost" },
          { label: jobPost.title },
        ]}
      />

      <div className="container py-4">
        <div className="row g-4">
          {/* Main Content */}
          <div className="col-lg-8">
            <div className="job-detail-card mb-4">
              <div className="d-flex align-items-center mb-4 flex-wrap gap-3">
                <div
                  className="rounded-3 overflow-hidden border p-1 bg-white shadow-sm"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    className="w-100 h-100 object-fit-cover"
                    src={jobPost.company?.logo || "https://via.placeholder.com/80x80.png?text=Company"}
                    alt={jobPost.company?.name || "Company"}
                  />
                </div>
                <div>
                  <h3 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
                    {jobPost.title}
                  </h3>
                  <div className="text-secondary fw-medium mb-2">
                    <Link to={`/company/${jobPost.company?.id}`} className="text-primary text-decoration-none">
                      {jobPost.company?.name}
                    </Link>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {jobPost.location?.name && (
                      <span className="stat-badge">
                        <i className="fa fa-map-marker-alt"></i> {jobPost.location.name}
                      </span>
                    )}
                    {jobPost.jobTypes?.type && (
                      <span className="stat-badge">
                        <i className="far fa-clock"></i> {jobPost.jobTypes.type}
                      </span>
                    )}
                    {jobPost.salary && (
                      <span className="stat-badge secondary">
                        <i className="far fa-money-bill-alt"></i> {jobPost.salary}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <hr className="my-4 text-muted opacity-25" />

              <div className="mb-4">
                <h5 className="fw-bold text-dark mb-3">Job Description</h5>
                <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                  {jobPost.descriptions}
                </p>
              </div>

              {jobPost.requirement && (
                <div className="mb-4">
                  <h5 className="fw-bold text-dark mb-3">Key Requirements</h5>
                  <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                    {jobPost.requirement}
                  </p>
                </div>
              )}

              {skillsList.length > 0 && (
                <div className="mb-4">
                  <h5 className="fw-bold text-dark mb-3">Required Skills & Expertise</h5>
                  <div>
                    {skillsList.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {jobPost.company && (
                <div className="p-4 rounded-4 mt-4" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <h5 className="fw-bold text-dark mb-2">About {jobPost.company.name}</h5>
                  <p className="text-secondary small mb-3">
                    {jobPost.company.description}
                  </p>
                  <Link to={`/company/${jobPost.company.id}`} className="btn btn-sm btn-outline-custom">
                    View Company Profile <i className="fas fa-arrow-right ms-1"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="col-lg-4">
            <div className="job-detail-summary-card">
              <h5 className="fw-bold mb-4 text-dark">Job Overview</h5>

              <div className="job-detail-summary-item">
                <span className="text-muted"><i className="far fa-calendar-check text-primary me-2"></i> Published:</span>
                <span className="fw-medium text-dark">{jobPost.publishedOn || "Recently"}</span>
              </div>

              <div className="job-detail-summary-item">
                <span className="text-muted"><i className="fa fa-users text-primary me-2"></i> Vacancies:</span>
                <span className="fw-medium text-dark">{jobPost.vancy ?? 1} Openings</span>
              </div>

              <div className="job-detail-summary-item">
                <span className="text-muted"><i className="far fa-clock text-primary me-2"></i> Job Nature:</span>
                <span className="fw-medium text-dark">{jobPost.jobTypes?.type || "Full time"}</span>
              </div>

              <div className="job-detail-summary-item">
                <span className="text-muted"><i className="far fa-money-bill-alt text-primary me-2"></i> Salary:</span>
                <span className="fw-medium text-dark">{jobPost.salary || "Competitive"}</span>
              </div>

              <div className="job-detail-summary-item">
                <span className="text-muted"><i className="fa fa-map-marker-alt text-primary me-2"></i> Location:</span>
                <span className="fw-medium text-dark">{jobPost.location?.name || "Remote"}</span>
              </div>

              <div className="job-detail-summary-item">
                <span className="text-muted"><i className="far fa-calendar-times text-danger me-2"></i> Deadline:</span>
                <span className="fw-medium text-danger">{jobPost.deadLine || "Open until filled"}</span>
              </div>

              <div className="mt-4">
                <Link to="/app" className="btn-primary-custom w-100 py-3 text-center">
                  <i className="fas fa-paper-plane me-2"></i> Apply For This Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;