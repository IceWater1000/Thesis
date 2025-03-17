import React, { useEffect, useState } from "react";
import "../mainContent/MainContentAreaDashboard.css";

interface Announcement {
  activityDate: string;
  date: string;
  description: string;
  id: number;
  image: string[];
  title: string;
  uploader: string;
}
interface DataToBeDisplayed {
  id: number;
  title: string;
  activityDate: string;
  Countdown: number;
}
//Current Date
const getCurrentFormattedDate = (): string => {
  const today = new Date();
  return today.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

console.log(getCurrentFormattedDate()); // Example Output: "March 17, 2025"
//Date Difference Calculator
const getDateDifferenceFromToday = (item: string) => {
  const targetDate: Date = new Date(item);
  const today: Date = new Date();

  // Calculate the difference in milliseconds
  const differenceInTime: number = targetDate.getTime() - today.getTime();

  // Convert milliseconds to days
  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
};

const ActivitiesToday = () => {
  const [announcementData, setAnnouncementData] = useState<Announcement[]>([]);
  const [dataToBeDisplayed, setDataToBeDisplayed] = useState<
    DataToBeDisplayed[]
  >([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/Announcements/projects"
      );
      const data = await response.json();
      setAnnouncementData(data);
      console.log(data);
    };

    fetchProjects();
  }, []);
  useEffect(() => {
    setDataToBeDisplayed(
      announcementData
        .filter(
          (item) =>
            item.activityDate !== "" &&
            getDateDifferenceFromToday(item.activityDate) == 0
        ) // Remove empty dates
        .map((item, index) => ({
          id: index + 1,
          title: item.title,
          activityDate: item.activityDate,
          Countdown: getDateDifferenceFromToday(item.activityDate),
        }))
        .sort((a, b) => a.Countdown - b.Countdown) // Sort by Countdown (ascending)
    );
  }, [announcementData]);
  return (
    <div className="ActivitiesCard">
      <div style={{ display: "flex", flexDirection: "row", gap: "80px" }}>
        <div className="CardHeader">Activities Today</div>
        <div className="CardHeader">{getCurrentFormattedDate()}</div>
      </div>

      <div className="BlueLine"></div>
      <div className="QualifiedTable">
        <ul>
          {dataToBeDisplayed.map((item) => (
            <li>
              <div className="CurrentActivityText">{item.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivitiesToday;
