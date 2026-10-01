import React from "react";

const EmptyState = ({
  icon = "fa-folder-open",
  title = "No results found",
  message = "Try adjusting your search criteria or check back later.",
  action = null,
}) => {
  return (
    <div className="text-center py-5 my-4 px-3">
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
        style={{
          width: "72px",
          height: "72px",
          background: "var(--primary-soft, #eef4ff)",
          color: "var(--primary, #1c5cff)",
          fontSize: "1.75rem",
        }}
      >
        <i className={`fa ${icon}`}></i>
      </div>
      <h4 className="fw-bold mb-2 text-dark">{title}</h4>
      <p className="text-muted mx-auto" style={{ maxWidth: "450px" }}>
        {message}
      </p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
};

export default EmptyState;
