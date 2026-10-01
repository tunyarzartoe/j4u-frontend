import React, { useEffect } from "react";
import "./Company.css";
import SearchCompany from "./SearchCompany";
import Aos from "aos";
import Meta from "../../components/pages/Meta";
import PageHeader from "../../components/ui/PageHeader";

const Company = () => {
  useEffect(() => {
    Aos.init({ duration: 500, once: true });
  }, []);

  return (
    <>
      <Meta title={"Explore Companies - J4U"} />

      <PageHeader
        title="Explore Companies"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Companies" },
        ]}
      />

      <div className="container pb-5">
        <SearchCompany />
      </div>
    </>
  );
};

export default Company;