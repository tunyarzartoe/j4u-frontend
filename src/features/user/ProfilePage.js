import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Meta from "../../components/pages/Meta";
import PageHeader from "../../components/ui/PageHeader";
import JobCard from "../../components/ui/JobCard";
import EmptyState from "../../components/ui/EmptyState";
import { selectAllJobPosts, selectSavedJobIds } from "../jobs/jobSlice";
import { selectAllApplications } from "../application/applicationSlice";
import { storageService } from "../../services/storageService";
import { toast } from "react-toastify";
import "./ProfilePage.css";

const ProfilePage = () => {

  const authUser = useSelector((state) => state.auths?.user || {});
  const allJobs = useSelector(selectAllJobPosts) || [];
  const savedJobIds = useSelector(selectSavedJobIds) || [];
  const allApplications = useSelector(selectAllApplications) || [];

  // Local state initialized with user details from auth/storage
  const [userProfile, setUserProfile] = useState(() => {
    const existing = storageService.getUsers().find(
      (u) => u.username === authUser.username || u.id === authUser.id
    );
    return existing || {
      ...authUser,
      headline: authUser.headline || "Full Stack Developer",
      bio: authUser.bio || "Passionate software engineer building web applications and exploring innovative technologies.",
      skills: authUser.skills || ["React", "JavaScript", "TypeScript", "Node.js", "CSS"],
      experience: authUser.experience || [
        {
          company: "Nexus Digital",
          role: "Frontend Developer",
          period: "2023 - Present",
          description: "Building responsive web interfaces and design systems.",
        },
      ],
      education: authUser.education || [
        {
          institution: "University of Yangon",
          degree: "B.S. in Computer Science",
          period: "2018 - 2022",
        },
      ],
    };
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...userProfile });
  const [newSkill, setNewSkill] = useState("");

  // Applications for this user
  const userApplications = allApplications.filter(
    (app) => app.userEmail === userProfile.username || app.userId === userProfile.id
  );

  // Saved jobs
  const savedJobs = allJobs.filter((job) => savedJobIds.includes(job.id));

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...userProfile,
      ...editFormData,
    };
    setUserProfile(updated);
    storageService.updateUserProfile(updated);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !userProfile.skills?.includes(newSkill.trim())) {
      const updatedSkills = [...(userProfile.skills || []), newSkill.trim()];
      const updated = { ...userProfile, skills: updatedSkills };
      setUserProfile(updated);
      storageService.updateUserProfile(updated);
      setNewSkill("");
      toast.success(`Skill "${newSkill.trim()}" added.`);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = (userProfile.skills || []).filter(
      (s) => s !== skillToRemove
    );
    const updated = { ...userProfile, skills: updatedSkills };
    setUserProfile(updated);
    storageService.updateUserProfile(updated);
  };

  const initials = (userProfile.fullname || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <Meta title={`${userProfile.fullname} - Candidate Profile`} />

      <PageHeader
        title="Candidate Profile"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Profile" },
        ]}
      />

      <div className="container py-4">
        {/* Profile Header Card */}
        <div className="profile-header-card">
          <div className="profile-cover"></div>
          <div className="p-4 pt-0">
            <div className="d-flex justify-content-between align-items-end flex-wrap gap-3">
              <div className="d-flex align-items-end gap-3 flex-wrap">
                <div className="profile-avatar-container">
                  <div className="profile-avatar-placeholder">{initials}</div>
                </div>
                <div className="mt-3">
                  <h3 className="fw-bold mb-1 text-dark">
                    {userProfile.fullname}
                  </h3>
                  <div className="text-primary fw-medium mb-1">
                    {userProfile.headline}
                  </div>
                  <div className="text-muted small d-flex flex-wrap gap-3">
                    <span>
                      <i className="fa fa-envelope text-primary me-1"></i>
                      {userProfile.username}
                    </span>
                    <span>
                      <i className="fa fa-phone text-primary me-1"></i>
                      {userProfile.phone || "+95 9 123 456 789"}
                    </span>
                    <span>
                      <i className="fa fa-map-marker-alt text-primary me-1"></i>
                      {userProfile.address || "Yangon, Myanmar"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 mb-2">
                <button
                  type="button"
                  className="btn btn-outline-custom"
                  onClick={() => {
                    setEditFormData({ ...userProfile });
                    setIsEditing(true);
                  }}
                >
                  <i className="fas fa-edit me-1"></i> Edit Profile
                </button>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="d-flex border-top mt-4 pt-2 gap-2 flex-wrap">
              <button
                type="button"
                className={`profile-nav-tab ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <i className="fas fa-user me-2"></i> Overview
              </button>
              <button
                type="button"
                className={`profile-nav-tab ${activeTab === "applications" ? "active" : ""}`}
                onClick={() => setActiveTab("applications")}
              >
                <i className="fas fa-file-alt me-2"></i> My Applications ({userApplications.length})
              </button>
              <button
                type="button"
                className={`profile-nav-tab ${activeTab === "saved" ? "active" : ""}`}
                onClick={() => setActiveTab("saved")}
              >
                <i className="fas fa-heart me-2"></i> Saved Jobs ({savedJobs.length})
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="row g-4">
            <div className="col-lg-8">
              {/* Bio */}
              <div className="profile-section-card">
                <h5 className="fw-bold mb-3 text-dark">About Me</h5>
                <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                  {userProfile.bio}
                </p>
              </div>

              {/* Experience */}
              <div className="profile-section-card">
                <h5 className="fw-bold mb-4 text-dark">Work Experience</h5>
                <div>
                  {(userProfile.experience || []).map((exp, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <h6 className="fw-bold mb-1 text-dark">{exp.role}</h6>
                      <div className="text-primary small fw-semibold mb-1">
                        {exp.company} • {exp.period}
                      </div>
                      <p className="text-muted small mb-0">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="profile-section-card">
                <h5 className="fw-bold mb-4 text-dark">Education</h5>
                <div>
                  {(userProfile.education || []).map((edu, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <h6 className="fw-bold mb-1 text-dark">{edu.degree}</h6>
                      <div className="text-primary small fw-semibold mb-1">
                        {edu.institution} • {edu.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              {/* Skills */}
              <div className="profile-section-card mb-4">
                <h5 className="fw-bold mb-3 text-dark">Core Skills & Tools</h5>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {(userProfile.skills || []).map((skill, idx) => (
                    <span key={idx} className="skill-chip">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        title="Remove skill"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddSkill} className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-pill px-3"
                    placeholder="Add a new skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary-custom btn-sm py-1 px-3">
                    Add
                  </button>
                </form>
              </div>

              {/* Resume */}
              <div className="profile-section-card">
                <h5 className="fw-bold mb-3 text-dark">Curriculum Vitae</h5>
                <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between mb-3 border">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fas fa-file-pdf text-danger fa-2x"></i>
                    <div>
                      <div className="fw-semibold small text-dark">Resume_2026.pdf</div>
                      <div className="text-muted" style={{ fontSize: "0.75rem" }}>Updated recently</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary rounded-pill"
                    onClick={() => toast.info("Downloading resume preview...")}
                  >
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Applications */}
        {activeTab === "applications" && (
          <div>
            {userApplications.length > 0 ? (
              <div className="row g-3">
                {userApplications.map((app) => (
                  <div key={app.id} className="col-12">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={app.companyLogo || "https://via.placeholder.com/60x60.png?text=Logo"}
                            alt={app.companyName}
                            className="rounded-3 border p-1"
                            style={{ width: "55px", height: "55px", objectFit: "cover" }}
                          />
                          <div>
                            <h5 className="fw-bold mb-1 text-dark">{app.jobTitle}</h5>
                            <span className="text-muted small">
                              {app.companyName} • Applied on {app.appliedDate}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold">
                            {app.status}
                          </span>
                          <Link to={`/jobPost/${app.jobId}`} className="btn btn-sm btn-outline-custom">
                            View Job
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="fa-paper-plane"
                title="No Applications Yet"
                message="You haven't submitted any job applications yet. Browse open positions and submit your profile today!"
                action={
                  <Link to="/jobPost" className="btn-primary-custom mt-2">
                    Browse Jobs
                  </Link>
                }
              />
            )}
          </div>
        )}

        {/* Tab 3: Saved Jobs */}
        {activeTab === "saved" && (
          <div>
            {savedJobs.length > 0 ? (
              <div>
                {savedJobs.map((job) => (
                  <JobCard key={job.id} jobPost={job} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="fa-heart"
                title="No Saved Jobs"
                message="Click the heart icon on any job card to save opportunities you want to apply to later."
                action={
                  <Link to="/jobPost" className="btn-primary-custom mt-2">
                    Find Jobs to Bookmark
                  </Link>
                }
              />
            )}
          </div>
        )}

        {/* Edit Profile Modal */}
        {isEditing && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 1060 }}
          >
            <div
              className="bg-white rounded-4 p-4 shadow-lg"
              style={{ width: "95%", maxWidth: "560px", maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold m-0 text-dark">Edit Candidate Profile</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsEditing(false)}
                ></button>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    className="form-control rounded-3 py-2"
                    value={editFormData.fullname || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">Professional Headline</label>
                  <input
                    type="text"
                    name="headline"
                    className="form-control rounded-3 py-2"
                    placeholder="e.g. Senior Frontend Developer"
                    value={editFormData.headline || ""}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-muted">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control rounded-3 py-2"
                      value={editFormData.phone || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-muted">Location / City</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control rounded-3 py-2"
                      value={editFormData.address || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-muted">Bio Summary</label>
                  <textarea
                    name="bio"
                    className="form-control rounded-3 p-3"
                    rows="4"
                    value={editFormData.bio || ""}
                    onChange={handleEditChange}
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-light border rounded-pill px-4"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-custom px-4">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
