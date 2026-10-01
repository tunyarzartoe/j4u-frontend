import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaveJob, selectSavedJobIds } from "../../features/jobs/jobSlice";
import { toast } from "react-toastify";
import "./JobCard.css";

const JobCard = ({ jobPost }) => {
  const dispatch = useDispatch();
  const savedJobIds = useSelector(selectSavedJobIds) || [];
  const isSaved = savedJobIds.includes(jobPost?.id);

  if (!jobPost) return null;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleSaveJob(jobPost.id));
    if (!isSaved) {
      toast.success(`"${jobPost.title}" saved to your bookmarks!`);
    } else {
      toast.info(`Removed "${jobPost.title}" from bookmarks.`);
    }
  };

  return (
    <Link to={`/jobPost/${jobPost.id}`} className="job-card">
      <div className="row align-items-center">
        <div className="col-12 col-md-8 d-flex align-items-center">
          <div className="job-card__logo-wrapper me-3">
            <img
              src={jobPost.company?.logo || "https://via.placeholder.com/80x80.png?text=Company"}
              alt={jobPost.company?.name || "Company"}
              className="job-card__logo"
            />
          </div>
          <div>
            <h5 className="job-card__title">{jobPost.title}</h5>
            <div className="job-card__company">{jobPost.company?.name}</div>
            <div className="job-card__meta">
              {jobPost.location?.name && (
                <span className="job-card__badge">
                  <i className="fa fa-map-marker-alt text-primary"></i>
                  {jobPost.location.name}
                </span>
              )}
              {jobPost.jobTypes?.type && (
                <span className="job-card__badge">
                  <i className="far fa-clock text-primary"></i>
                  {jobPost.jobTypes.type}
                </span>
              )}
              {jobPost.salary && (
                <span className="job-card__badge job-card__badge--salary">
                  <i className="far fa-money-bill-alt"></i>
                  {jobPost.salary}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 mt-3 mt-md-0 d-flex flex-column align-items-md-end justify-content-center">
          <div className="d-flex align-items-center gap-2 mb-2">
            <button
              type="button"
              className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center border"
              style={{ width: "38px", height: "38px" }}
              onClick={handleFavoriteClick}
              title={isSaved ? "Remove from bookmarks" : "Save this job"}
            >
              <i className={`fa-heart ${isSaved ? "fas text-danger" : "far text-secondary"}`}></i>
            </button>

            <span className="job-card__btn-view">
              <i className="fas fa-arrow-right"></i>
            </span>
          </div>
          {jobPost.deadLine && (
            <span className="job-card__deadline">
              <i className="far fa-calendar-alt text-primary"></i>
              Deadline: {jobPost.deadLine}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
