import React, { useState, useEffect, useMemo } from "react";
import "./SearchJob.css";
import { getAlljobTypes, selectAllJobTypes } from "../jobTypes/jobTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLocations,
  selectAllLocations,
} from "../locations/locationSlice";
import { getAllJobPosts, selectAllJobPosts } from "./jobSlice";
import JobCard from "../../components/ui/JobCard";
import EmptyState from "../../components/ui/EmptyState";

const SearchJob = ({ initialKeyword = "", initialJobType = "", initialLocation = "" }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(initialKeyword);
  const [selectedJobType, setSelectedJobType] = useState(initialJobType);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  useEffect(() => {
    if (initialKeyword) setTitle(initialKeyword);
    if (initialJobType) setSelectedJobType(initialJobType);
    if (initialLocation) setSelectedLocation(initialLocation);
  }, [initialKeyword, initialJobType, initialLocation]);

  useEffect(() => {
    dispatch(getAllLocations());
    dispatch(getAlljobTypes());
    dispatch(getAllJobPosts());
  }, [dispatch]);

  const rawJobPosts = useSelector(selectAllJobPosts);
  const locations = useSelector(selectAllLocations) || [];
  const jobTypes = useSelector(selectAllJobTypes) || [];

  // Reactive filtering
  const filteredJobs = useMemo(() => {
    const posts = rawJobPosts || [];
    return posts.filter((job) => {
      const matchTitle = !title.trim() ||
        (job.title && job.title.toLowerCase().includes(title.toLowerCase().trim()));
      const matchType = !selectedJobType ||
        (job.jobTypes && job.jobTypes.type === selectedJobType);
      const matchLoc = !selectedLocation ||
        (job.location && job.location.name === selectedLocation);
      return matchTitle && matchType && matchLoc;
    });
  }, [rawJobPosts, title, selectedJobType, selectedLocation]);

  const handleReset = () => {
    setTitle("");
    setSelectedJobType("");
    setSelectedLocation("");
  };

  const isFiltered = Boolean(title || selectedJobType || selectedLocation);

  return (
    <div className="container py-4">
      {/* Search Filter Bar */}
      <div className="search-filter-bar">
        <div className="row g-3 align-items-center">
          <div className="col-lg-4 col-md-6">
            <div className="position-relative">
              <input
                type="text"
                className="search-filter-input"
                placeholder="Search job title, role or skill..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <select
              className="search-filter-select"
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
            >
              <option value="">All Job Types</option>
              {jobTypes.map((type) => (
                <option key={type.id || type.type} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-3 col-md-6">
            <select
              className="search-filter-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc.id || loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-2 col-md-6">
            {isFiltered ? (
              <button
                type="button"
                className="search-reset-btn"
                onClick={handleReset}
              >
                <i className="fas fa-times me-1"></i> Reset
              </button>
            ) : (
              <button
                type="button"
                className="search-filter-btn"
                onClick={() => {}}
              >
                <i className="fas fa-filter me-1"></i> Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0" style={{ color: "#0f172a" }}>
          Available Positions
        </h3>
        <span className="badge rounded-pill bg-light text-dark px-3 py-2 border">
          {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
        </span>
      </div>

      {/* Results List */}
      <div>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} jobPost={job} />)
        ) : (
          <EmptyState
            icon="fa-briefcase"
            title="No matching jobs found"
            message="We couldn't find any opportunities matching your current filters. Try changing keywords or resetting your filter."
            action={
              <button
                type="button"
                className="btn btn-outline-custom mt-2"
                onClick={handleReset}
              >
                Clear all filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default SearchJob;
