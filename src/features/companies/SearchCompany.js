import React, { useEffect, useState, useMemo } from "react";
import "./Company.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocations, selectAllLocations } from "../locations/locationSlice";
import { getAllCompanies, selectAllCompanies } from "./companySlice";
import { Link } from "react-router-dom";
import EmptyState from "../../components/ui/EmptyState";

const SearchCompany = () => {
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const [locationId, setLocationId] = useState("");

  useEffect(() => {
    dispatch(getAllLocations());
    dispatch(getAllCompanies());
  }, [dispatch]);

  const rawCompanies = useSelector(selectAllCompanies);
  const locations = useSelector(selectAllLocations) || [];

  const filteredCompanies = useMemo(() => {
    const list = rawCompanies || [];
    return list.filter((company) => {
      const matchName =
        !companyName.trim() ||
        company.name.toLowerCase().includes(companyName.toLowerCase().trim());
      const matchLoc =
        !locationId ||
        (company.location && company.location.id === parseInt(locationId));
      return matchName && matchLoc;
    });
  }, [rawCompanies, companyName, locationId]);

  const handleReset = () => {
    setCompanyName("");
    setLocationId("");
  };

  return (
    <div>
      {/* Search Header Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-6">
            <div className="position-relative">
              <input
                type="text"
                className="form-control rounded-3 py-2 px-3"
                placeholder="Search by company name..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <select
              className="form-select rounded-3 py-2"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            {(companyName || locationId) && (
              <button
                type="button"
                className="btn btn-light border w-100 rounded-3 py-2"
                onClick={handleReset}
              >
                <i className="fas fa-times me-1"></i> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0 text-dark">Top Hiring Organizations</h4>
        <span className="badge rounded-pill bg-light text-dark px-3 py-2 border">
          {filteredCompanies.length} {filteredCompanies.length === 1 ? "Company" : "Companies"}
        </span>
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="row g-4">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 transition-all">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-3 overflow-hidden border p-1 bg-white flex-shrink-0"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <img
                      src={company.logo || "https://via.placeholder.com/64x64.png?text=Logo"}
                      alt={company.name}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">{company.name}</h5>
                    <span className="stat-badge small">
                      <i className="fa fa-map-marker-alt"></i> {company.location?.name || company.address || "Yangon"}
                    </span>
                  </div>
                </div>

                <p className="text-secondary small mb-3 text-truncate-2" style={{ minHeight: "40px" }}>
                  {company.description}
                </p>

                <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                  <span className="text-primary fw-semibold small">
                    <i className="fas fa-briefcase me-1"></i> {company.jobOpening || 2} Open Jobs
                  </span>

                  <Link
                    to={`/company/${company.id}`}
                    className="btn btn-sm btn-outline-custom"
                  >
                    View Details <i className="fas fa-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="fa-building"
          title="No Companies Found"
          message="No companies match your current search criteria. Try clearing filters to see all available employers."
          action={
            <button
              type="button"
              className="btn btn-outline-custom mt-2"
              onClick={handleReset}
            >
              Clear filters
            </button>
          }
        />
      )}
    </div>
  );
};

export default SearchCompany;
