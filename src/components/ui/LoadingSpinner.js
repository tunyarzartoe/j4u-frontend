import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
      <PropagateLoader color="#1c5cff" size={16} aria-label="Loading Spinner" />
      <span className="text-muted mt-4 fw-medium" style={{ letterSpacing: "0.5px" }}>
        {message}
      </span>
    </div>
  );
};

export default LoadingSpinner;
