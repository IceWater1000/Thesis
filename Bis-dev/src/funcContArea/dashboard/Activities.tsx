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
const getDateDifferenceFromToday = (item: string) => {
  const targetDate: Date = new Date(item);
  const today: Date = new Date();

  // Calculate the difference in milliseconds
  const differenceInTime: number = targetDate.getTime() - today.getTime();

  // Convert milliseconds to days
  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
};

const Activities = () => {
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
            getDateDifferenceFromToday(item.activityDate) > 0
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
      <div className="CardHeader">Upcoming Activities from Announcements</div>
      <div className="BlueLine"></div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Days Until Event</th>
          </tr>
        </thead>
        <tbody>
          {dataToBeDisplayed.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.activityDate}</td>
              <td>{item.Countdown} Days Left</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;
