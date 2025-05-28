import React, { useEffect, useState } from "react";
import "./Announcements.css";
import AnnouncementsBox from "./AnnouncementsBox";
import ScrollReveal from "../Home/ScrollReveal";
interface Project {
  id: string;
  title: string;
  uploader: string;
  date: string;
  description: string;
  image: string;
  activityDate: string;
}

const AnnouncementsContainer = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "",
      title: "",
      uploader: "",
      description: "",
      image: "",
      date: "",
      activityDate: "",
    },
  ]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/Announcements/projects"
      );
      const data: Project[] = await response.json();
      data.sort(
        (a, b) =>
          new Date(a.activityDate).getTime() -
          new Date(b.activityDate).getTime()
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingActivities = data.filter((activity) => {
        const activityDate = new Date(activity.activityDate);
        activityDate.setHours(0, 0, 0, 0); // Make sure to compare only the date part
        return activityDate >= today;
      });
      setProjects(upcomingActivities);
    };

    fetchProjects();
  }, []);

  return (
    <div className="announcementsContainer">
      {projects.map((item, index) => (
        <ScrollReveal direction="Bottom">
          <AnnouncementsBox
            date={item.date}
            title={item.title}
            image={item.image}
            uploader={item.uploader}
            activityDate={item.activityDate}
            description={item.description}
          />
        </ScrollReveal>
      ))}
    </div>
  );
};

export default AnnouncementsContainer;
