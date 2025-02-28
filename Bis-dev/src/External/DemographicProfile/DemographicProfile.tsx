import React from "react";
import Footer from "../Footer";
import DemographicProfileContainer from "./DemographicProfileContainer";

const DemographicProfile = () => {
  return (
    <>
      <DemographicProfileContainer />
      <Footer />
      <div
        style={{ width: "100%", height: "46px", backgroundColor: "white" }}
      ></div>
    </>
  );
};

export default DemographicProfile;
