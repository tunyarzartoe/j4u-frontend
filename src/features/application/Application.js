import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllApplications,
  submitApplication,
  withdrawApplication,
  selectAllApplications,
} from "./applicationSlice";
import { selectAllJobPosts } from "../jobs/jobSlice";
import Meta from "../../components/pages/Meta";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import { toast } from "react-toastify";
import "./Application.css";

const Application = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryJobId = searchParams.get("jobId");
  const loginUser = useSelector((state) => state.auths?.user || {});
  const allJobs = useSelector(selectAllJobPosts) || [];
  const applications = useSelector(selectAllApplications) || [];

  // Filter applications for current user
  const userApplications = applications.filter(
    (app) => app.userEmail === loginUser.username || app.userId === loginUser.id
  );

  const [activeTab, setActiveTab] = useState(queryJobId ? "apply" : "list");

  // Form State
  const [formData, setFormData] = useState({
    jobId: queryJobId || (allJobs[0]?.id || 1),
    applicantName: loginUser.fullname || "",
    email: loginUser.username || "",
    phone: loginUser.phone || "",
    experienceYears: "1-3 years",
    expectedSalary: "",
    noticePeriod: "Immediate",
    portfolioUrl: "",
    resumeName: "My_Resume.pdf",
    coverLetter: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllApplications());
  }, [dispatch]);

  useEffect(() => {
    if (queryJobId) {
      setActiveTab("apply");
      setFormData((prev) => ({ ...prev, jobId: queryJobId }));
    }
  }, [queryJobId]);

  const selectedJob =
    allJobs.find((j) => j.id === Number(formData.jobId)) || allJobs[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resumeName: e.target.files[0].name,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required contact details.");
      return;
    }

    setSubmitting(true);

    const appPayload = {
      userId: loginUser.id || 2,
      userEmail: loginUser.username || formData.email,
      applicantName: formData.applicantName,
      phone: formData.phone,
      jobId: selectedJob?.id || 1,
      jobTitle: selectedJob?.title || "Job Position",
      companyName: selectedJob?.company?.name || "Company",
      companyLogo: selectedJob?.company?.logo || "",
      salary: selectedJob?.salary || "",
      location: selectedJob?.location?.name || "Remote",
      experienceYears: formData.experienceYears,
      expectedSalary: formData.expectedSalary || "Negotiable",
      noticePeriod: formData.noticePeriod,
      portfolioUrl: formData.portfolioUrl,
      resumeName: formData.resumeName,
      coverLetter: formData.coverLetter,
    };

    try {
      await dispatch(submitApplication(appPayload)).unwrap();
      toast.success(`Application for "${selectedJob?.title}" submitted successfully!`);
      setActiveTab("list");
      navigate("/app", { replace: true });
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWithdraw = (appId, jobTitle) => {
    if (window.confirm(`Are you sure you want to withdraw your application for "${jobTitle}"?`)) {
      dispatch(withdrawApplication(appId));
      toast.info(`Application for "${jobTitle}" withdrawn.`);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "under review":
        return <span className="status-badge status-badge--review"><i className="fas fa-clock"></i> Under Review</span>;
      case "shortlisted":
        return <span className="status-badge status-badge--shortlisted"><i className="fas fa-star"></i> Shortlisted</span>;
      case "interview scheduled":
        return <span className="status-badge status-badge--interview"><i className="fas fa-calendar-check"></i> Interview</span>;
      default:
        return <span className="status-badge status-badge--submitted"><i className="fas fa-paper-plane"></i> Submitted</span>;
    }
  };

  return (
    <>
      <Meta title={"Applications Dashboard - J4U"} />

      <PageHeader
        title="Application Center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Jobs", to: "/jobPost" },
          { label: "Application Center" },
        ]}
      />

      <div className="container py-4">
        {/* Navigation Tabs */}
        <div className="d-flex gap-3 mb-4 border-bottom pb-2">
          <button
            type="button"
            className={`btn ${activeTab === "list" ? "btn-primary-custom" : "btn-light border"}`}
            onClick={() => setActiveTab("list")}
          >
            <i className="fas fa-layer-group me-2"></i> My Applications ({userApplications.length})
          </button>
          <button
            type="button"
            className={`btn ${activeTab === "apply" ? "btn-primary-custom" : "btn-light border"}`}
            onClick={() => setActiveTab("apply")}
          >
            <i className="fas fa-file-signature me-2"></i> Submit Application
          </button>
        </div>

        {/* Tab 1: Application List */}
        {activeTab === "list" && (
          <div>
            {userApplications.length > 0 ? (
              <div className="row g-4">
                <div className="col-12">
                  <div className="alert alert-info d-flex align-items-center gap-3 rounded-4 mb-4">
                    <i className="fas fa-info-circle fa-lg"></i>
                    <div>
                      <strong>Track Your Progress:</strong> Review the active status of jobs you have applied for. Employers will notify you directly when moving your candidacy forward.
                    </div>
                  </div>
                </div>

                {userApplications.map((app) => (
                  <div key={app.id} className="col-12">
                    <div className="application-card">
                      <div className="row align-items-center g-3">
                        <div className="col-md-7 d-flex align-items-center gap-3">
                          <div
                            className="rounded-3 overflow-hidden border p-1 bg-white shadow-sm flex-shrink-0"
                            style={{ width: "64px", height: "64px" }}
                          >
                            <img
                              src={app.companyLogo || "https://via.placeholder.com/64x64.png?text=Logo"}
                              alt={app.companyName}
                              className="w-100 h-100 object-fit-cover"
                            />
                          </div>
                          <div>
                            <h5 className="fw-bold mb-1 text-dark">
                              <Link to={`/jobPost/${app.jobId}`} className="text-decoration-none text-dark">
                                {app.jobTitle}
                              </Link>
                            </h5>
                            <div className="text-secondary small mb-1">
                              <strong>{app.companyName}</strong> • {app.location}
                            </div>
                            <div className="text-muted small">
                              Applied on {app.appliedDate}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-5 d-flex flex-column flex-md-row align-items-md-center justify-content-md-end gap-3">
                          <div>{getStatusBadge(app.status)}</div>

                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                            onClick={() => handleWithdraw(app.id, app.jobTitle)}
                          >
                            <i className="fas fa-trash-alt me-1"></i> Withdraw
                          </button>
                        </div>

                        {app.coverLetter && (
                          <div className="col-12 mt-2 pt-2 border-top">
                            <details className="small text-muted">
                              <summary className="cursor-pointer text-primary fw-medium">
                                View Submitted Cover Letter & Details
                              </summary>
                              <div className="p-3 bg-light rounded-3 mt-2">
                                <p className="mb-2 text-dark">{app.coverLetter}</p>
                                <div className="d-flex flex-wrap gap-3 small text-muted pt-2 border-top">
                                  <span><strong>Resume:</strong> {app.resumeName || "Attached"}</span>
                                  {app.expectedSalary && <span><strong>Expected:</strong> {app.expectedSalary}</span>}
                                  {app.noticePeriod && <span><strong>Notice Period:</strong> {app.noticePeriod}</span>}
                                </div>
                              </div>
                            </details>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="fa-file-alt"
                title="No Applications Submitted Yet"
                message="You haven't submitted any job applications yet. Discover open opportunities and apply with your profile!"
                action={
                  <Link to="/jobPost" className="btn-primary-custom mt-2">
                    <i className="fas fa-search me-2"></i> Browse Open Jobs
                  </Link>
                }
              />
            )}
          </div>
        )}

        {/* Tab 2: Submit Application Form */}
        {activeTab === "apply" && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="app-form-card">
                {/* Job Summary Banner */}
                {selectedJob && (
                  <div className="job-apply-banner d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-3 overflow-hidden border p-1 bg-white"
                        style={{ width: "54px", height: "54px" }}
                      >
                        <img
                          src={selectedJob.company?.logo || "https://via.placeholder.com/54x54.png?text=Logo"}
                          alt={selectedJob.company?.name}
                          className="w-100 h-100 object-fit-cover"
                        />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0 text-dark">
                          Applying for: {selectedJob.title}
                        </h5>
                        <span className="text-muted small">
                          {selectedJob.company?.name} • {selectedJob.location?.name} • {selectedJob.salary}
                        </span>
                      </div>
                    </div>

                    {!queryJobId && (
                      <div style={{ minWidth: "220px" }}>
                        <select
                          className="form-select form-select-sm"
                          value={formData.jobId}
                          onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
                        >
                          {allJobs.map((j) => (
                            <option key={j.id} value={j.id}>
                              {j.title} ({j.company?.name})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <h5 className="fw-bold mb-3 text-dark">1. Candidate Information</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Full Name *</label>
                      <input
                        type="text"
                        name="applicantName"
                        className="form-control rounded-3 py-2"
                        value={formData.applicantName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control rounded-3 py-2"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control rounded-3 py-2"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <h5 className="fw-bold mb-3 text-dark">2. Professional Details</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Years of Experience</label>
                      <select
                        name="experienceYears"
                        className="form-select rounded-3 py-2"
                        value={formData.experienceYears}
                        onChange={handleInputChange}
                      >
                        <option value="Entry (< 1 year)">Entry (&lt; 1 year)</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Expected Salary</label>
                      <input
                        type="text"
                        name="expectedSalary"
                        className="form-control rounded-3 py-2"
                        placeholder="e.g. $90,000 / year"
                        value={formData.expectedSalary}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Notice Period</label>
                      <select
                        name="noticePeriod"
                        className="form-select rounded-3 py-2"
                        value={formData.noticePeriod}
                        onChange={handleInputChange}
                      >
                        <option value="Immediate">Immediate Availability</option>
                        <option value="2 Weeks">2 Weeks Notice</option>
                        <option value="1 Month">1 Month Notice</option>
                        <option value="2 Months+">2 Months+</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Portfolio / LinkedIn / GitHub</label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        className="form-control rounded-3 py-2"
                        placeholder="https://linkedin.com/in/username"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Upload Resume (PDF, DOCX)</label>
                      <input
                        type="file"
                        className="form-control rounded-3 py-2"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      <small className="text-muted">Selected: {formData.resumeName}</small>
                    </div>
                  </div>

                  <h5 className="fw-bold mb-3 text-dark">3. Cover Letter</h5>
                  <div className="mb-4">
                    <textarea
                      name="coverLetter"
                      className="form-control rounded-3 p-3"
                      rows="5"
                      placeholder="Explain why your experience and skills make you a great fit for this position..."
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-end gap-3">
                    <button
                      type="button"
                      className="btn btn-light border px-4 py-2 rounded-pill"
                      onClick={() => setActiveTab("list")}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary-custom px-5 py-2"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin me-2"></i> Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i> Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Application;