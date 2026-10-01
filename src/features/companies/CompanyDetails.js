import React, { useEffect } from "react";
import "./CompanyDetails.css";
import { Link, useParams } from "react-router-dom";
import { selectCompanyById } from "./companySlice";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../../components/pages/Meta";
import { getAllJobPosts, selectJobPostByCompanyId } from "../jobs/jobSlice";
import PageHeader from "../../components/ui/PageHeader";
import JobCard from "../../components/ui/JobCard";
import EmptyState from "../../components/ui/EmptyState";

const CompanyDetails = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobPosts());
  }, [dispatch]);

  const company = useSelector((state) =>
    selectCompanyById(state, Number(companyId))
  );
  const jobPosts = useSelector((state) =>
    selectJobPostByCompanyId(state, Number(companyId))
  ) || [];

  if (!company) {
    return (
      <>
        <PageHeader
          title="Company Details"
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Companies", to: "/company" },
            { label: "Not Found" },
          ]}
        />
        <div className="container py-5">
          <EmptyState
            icon="fa-building"
            title="Company Not Found"
            message="The organization profile you are seeking is unavailable or does not exist."
            action={
              <Link to="/company" className="btn-primary-custom mt-3">
                <i className="fas fa-arrow-left me-2"></i> Browse Companies
              </Link>
            }
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Meta title={`${company.name} - Profile & Jobs`} />

      <PageHeader
        title={company.name}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Companies", to: "/company" },
          { label: company.name },
        ]}
      />

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <div className="d-flex align-items-center mb-4 flex-wrap gap-3">
                <div
                  className="rounded-3 overflow-hidden border p-1 bg-white shadow-sm"
                  style={{ width: "90px", height: "90px" }}
                >
                  <img
                    src={company.logo || "https://via.placeholder.com/90x90.png?text=Company"}
                    alt={company.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div>
                  <h3 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
                    {company.name}
                  </h3>
                  <div className="text-muted d-flex align-items-center gap-2">
                    <i className="fa fa-map-marker-alt text-primary"></i>
                    {company.address}
                  </div>
                </div>
              </div>

              <hr className="my-4 text-muted opacity-25" />

              <div className="mb-4">
                <h5 className="fw-bold text-dark mb-3">About the Company</h5>
                <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                  {company.description}
                </p>
              </div>

              {company.jobPost && (
                <div className="mb-4">
                  <h5 className="fw-bold text-dark mb-2">Hiring Overview</h5>
                  <p className="text-secondary">{company.jobPost}</p>
                </div>
              )}
            </div>

            <div className="mt-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-dark m-0">Open Positions at {company.name}</h4>
                <span className="badge rounded-pill bg-light text-dark px-3 py-2 border">
                  {jobPosts.length} {jobPosts.length === 1 ? "Job" : "Jobs"}
                </span>
              </div>

              {jobPosts.length > 0 ? (
                jobPosts.map((job) => <JobCard key={job.id} jobPost={job} />)
              ) : (
                <EmptyState
                  icon="fa-briefcase"
                  title="No Current Openings"
                  message="This company does not currently have any active vacancies posted. Check back later!"
                />
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 position-sticky" style={{ top: "100px" }}>
              <h5 className="fw-bold mb-4 text-dark">Company Information</h5>

              <div className="py-2 border-bottom">
                <span className="text-muted small d-block">Company Name</span>
                <span className="fw-semibold text-dark">{company.name}</span>
              </div>

              <div className="py-2 border-bottom">
                <span className="text-muted small d-block">Headquarters</span>
                <span className="fw-semibold text-dark">{company.address}</span>
              </div>

              <div className="py-2 border-bottom">
                <span className="text-muted small d-block">Phone Number</span>
                <span className="fw-semibold text-dark">{company.phone || "Not specified"}</span>
              </div>

              <div className="py-2 mb-3">
                <span className="text-muted small d-block">Direct Email</span>
                <span className="fw-semibold text-primary">{company.email || "careers@" + company.name.toLowerCase().replace(/\s+/g, "") + ".com"}</span>
              </div>

              <Link to="/jobPost" className="btn-outline-custom w-100 text-center">
                <i className="fas fa-search me-1"></i> Browse More Companies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;