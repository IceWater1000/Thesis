import React, { useState } from "react";
import "./MainContentAreaDashboard.css";
import QualifiedCitizenForMembership from "../dashboard/QualifiedCitizenForMembership";
import Activities from "../dashboard/Activities";
import ActivitiesCompleted from "../dashboard/ActivitiesCompleted";
import ActivitiesToday from "../dashboard/ActivitiesToday";
const MainContentAreaDashboard = () => {
  return (
    <>
      <div className="DashboardContentArea">
        <div className="DashboardContentAreaLeft">
          <QualifiedCitizenForMembership
            gridArea="Senior"
            url="http://localhost:5000/api/inhabitants/residentsNotSeniorCitizenAndValid"
            headText="Qualified Residents for Senior Citizen Membership"
          />
          <QualifiedCitizenForMembership
            gridArea="Senior"
            url="http://localhost:5000/api/inhabitants/residentsNotKKAndValid"
            headText="Qualified Residents for KK Membership"
          />
          <QualifiedCitizenForMembership
            gridArea="Senior"
            url="http://localhost:5000/api/inhabitants/residentsNotHouseholdHeadAndMember"
            headText="Residents Not Assigned to a Household"
          />
        </div>
        <div className="DashboardContentAreaRight">
          <ActivitiesToday />
          <Activities />
          <ActivitiesCompleted />
        </div>
      </div>
    </>
  );
};

export default MainContentAreaDashboard;
