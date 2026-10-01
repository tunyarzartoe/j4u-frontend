import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./JobList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllJobPosts,
  selectAllJobPosts,
  getJobPostStatus,
  getJobPostError,
} from "./jobSlice";
import Meta from "../../components/pages/Meta";
import Aos from "aos";
import JobCard from "../../components/ui/JobCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";

const JobList = () => {
  const dispatch = useDispatch();
  const jobPosts = useSelector(selectAllJobPosts);
  const status = useSelector(getJobPostStatus);
  const error = useSelector(getJobPostError);

  useEffect(() => {
    dispatch(getAllJobPosts());
    Aos.init({ duration: 500, once: true });
  }, [dispatch]);

  const isLoading = status === "loading";

  return (
    <>
      <Meta title={"Job Listings - J4U"} />

      <section className="container py-5 job-list-container" data-aos="fade-up">
        <div className="text-center section-title">
          <span className="stat-badge mb-2">Featured Listings</span>
          <h2>Latest Career Opportunities</h2>
          <p>Explore recently posted roles from top verified organizations</p>
        </div>

        {isLoading ? (
          <LoadingSpinner message="Fetching job opportunities..." />
        ) : error ? (
          <div className="alert alert-danger text-center my-4" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i> Failed to load jobs: {error}
          </div>
        ) : jobPosts && jobPosts.length > 0 ? (
          <div>
            <div className="mb-4">
              {jobPosts.map((jobPost) => (
                <JobCard key={jobPost.id} jobPost={jobPost} />
              ))}
            </div>

            <div className="text-center mt-5">
              <Link to="/jobPost" className="btn-outline-custom">
                Browse All Vacancies <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        ) : (
          <EmptyState
            icon="fa-briefcase"
            title="No open positions currently"
            message="Check back soon as new opportunities are posted continuously."
          />
        )}
      </section>
    </>
  );
};

export default JobList;