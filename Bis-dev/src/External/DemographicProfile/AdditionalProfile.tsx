import React from "react";
import AdditionalProfileText from "./AdditionalProfileText";

const AdditionalProfile = () => {
  return (
    <div className="additionalProfile">
      <AdditionalProfileText
        Text="Total Barangay Residents"
        url="http://localhost:5000/api/demographic/totalResident"
      />
      <AdditionalProfileText
        Text="Number of Houses"
        url="http://localhost:5000/api/demographic/totalHouse"
      />
      <AdditionalProfileText
        Text="Number of Youth Residents"
        url="http://localhost:5000/api/demographic/totalYouthResident"
      />
      <AdditionalProfileText
        Text="Number of Senior Citizen"
        url="http://localhost:5000/api/demographic/totalSenior"
      />
      <AdditionalProfileText
        Text="Average Number of Household Inhabitants"
        url="http://localhost:5000/api/demographic/aveHoushold"
      />
      <AdditionalProfileText
        Text="Average Age of Residents"
        url="http://localhost:5000/api/demographic/aveAge"
      />
    </div>
  );
};

export default AdditionalProfile;
