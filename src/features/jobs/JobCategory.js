import React, { useEffect } from "react";
import "./JobCategory.css";
import { Link } from "react-router-dom";
import Aos from "aos";
import Meta from "../../components/pages/Meta";

const CATEGORIES_DATA = [
  { icon: "fa-laptop-code", title: "Software Engineering", count: 48 },
  { icon: "fa-paint-brush", title: "Design & Creative", count: 26 },
  { icon: "fa-bullhorn", title: "Marketing & Growth", count: 34 },
  { icon: "fa-headset", title: "Customer Support", count: 19 },
  { icon: "fa-user-tie", title: "Human Resources", count: 15 },
  { icon: "fa-chart-line", title: "Finance & Accounting", count: 22 },
  { icon: "fa-tasks", title: "Project Management", count: 18 },
  { icon: "fa-hands-helping", title: "Sales & Partnerships", count: 29 },
];

const JobCategory = () => {
  useEffect(() => {
    Aos.init({ duration: 500, once: true });
  }, []);

  return (
    <>
      <Meta title={"Browse by Category - J4U"} />

      <section className="container py-5 my-2">
        <div className="text-center section-title" data-aos="fade-up">
          <span className="stat-badge mb-2">Job Sectors</span>
          <h2>Explore By Category</h2>
          <p>Find open roles tailored to your specialization and industry expertise</p>
        </div>

        <div className="row g-4" data-aos="fade-up">
          {CATEGORIES_DATA.map((cat, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6">
              <Link className="cat-card" to="/jobPost">
                <div className="cat-icon-wrapper">
                  <i className={`fa ${cat.icon}`}></i>
                </div>
                <h6 className="cat-title">{cat.title}</h6>
                <span className="cat-vacancy">{cat.count} Open Vacancies</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default JobCategory;