import React from "react";
import "./Job.css";
import Meta from "../../components/pages/Meta";
import PageHeader from "../../components/ui/PageHeader";
import SearchJob from "./SearchJob";

const Job = () => {
  return (
    <>
      <Meta title={"Explore Jobs - J4U"} />

      <PageHeader
        title="Find Your Next Opportunity"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Jobs" },
        ]}
      />

      <div className="container pb-5">
        <SearchJob />
      </div>
    </>
  );
};

export default Job;