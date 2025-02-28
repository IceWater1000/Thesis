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
}

const AnnouncementsContainer = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: "", title: "", uploader: "", description: "", image: "", date: "" },
  ]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/Announcements/projects"
      );
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);
  console.log(projects);
  return (
    <div className="announcementsContainer">
      {projects.map((item, index) => (
        <ScrollReveal direction="Bottom">
          <AnnouncementsBox
            date={item.date}
            title={item.title}
            image={item.image}
            uploader={item.uploader}
            description={item.description}
          />
        </ScrollReveal>
      ))}
    </div>
  );
};

export default AnnouncementsContainer;
