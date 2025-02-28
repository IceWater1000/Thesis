import React from "react";
import "./DemographicProfile.css";
import BarRight from "../BarRight";
import BarLeft from "../BarLeft";
import AGenderDistribution from "./AGenderDistribution";
import ACivilStatus from "./ACivilStatus";
import AAgeDistribution from "./AAgeDistribution";
import AHouseholdInhabitants from "./AHouseholdInhabitants";
import AdditionalProfile from "./AdditionalProfile";
const DemographicProfileContainer = () => {
  return (
    <div className="DemographciProfile">
      <div className="DemographicProfileMainText">
        BARANGAY BUTNGA DEMOGRAPHIC PROFILE
      </div>
      <div className="DemographciProfileRow">
        <BarRight width="1330" top="120" />
        <BarRight width="133" top="170" />
        <AGenderDistribution />
        <ACivilStatus />
      </div>
      <div className="DemographciProfileRow">
        <BarLeft width="600" top="120" />
        <BarLeft width="976" top="170" />
        <AHouseholdInhabitants />
        <AAgeDistribution />
        <div className="ChartContainer3"></div>
      </div>
      <AdditionalProfile />
    </div>
  );
};

export default DemographicProfileContainer;
