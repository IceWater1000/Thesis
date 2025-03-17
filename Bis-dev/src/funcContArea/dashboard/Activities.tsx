import React, { useEffect } from "react";
import "../mainContent/MainContentAreaDashboard.css";
const Activities = () => {
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/Announcements/projects"
      );
      const data = await response.json();
      console.log(data);
    };

    fetchProjects();
  }, []);
  return (
    <div className="ActivitiesCard">
      <div className="CardHeader">Upcoming Activities from Announcements</div>
      <div className="BlueLine"></div>
      <table></table>
    </div>
  );
};

export default Activities;
