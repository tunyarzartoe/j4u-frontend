import React from "react";
import { Link } from "react-router-dom";
import "./PageHeader.css";

const PageHeader = ({ title, breadcrumbs = [] }) => {
  return (
    <div className="page-header-banner text-center">
      <div className="container">
        <h1 className="page-header-banner__title">{title}</h1>
        {breadcrumbs.length > 0 && (
          <nav className="page-header-banner__breadcrumb" aria-label="breadcrumb">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.label || idx}>
                  {crumb.to && !isLast ? (
                    <Link to={crumb.to}>{crumb.label}</Link>
                  ) : (
                    <span className="page-header-banner__breadcrumb-current">
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && <span className="page-header-banner__breadcrumb-separator">/</span>}
                </React.Fragment>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
