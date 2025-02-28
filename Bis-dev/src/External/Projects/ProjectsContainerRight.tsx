import React, { useEffect, useState } from "react";
import "./Projects.css";
import ProjectsInformation from "./ProjectsInformation";
import { image } from "framer-motion/client";
import ScrollReveal from "../Home/ScrollReveal";

interface Project {
  id: string;
  title: string;
  uploader: string;
  date: string;
  description: string;
  image: string[];
}
const ProjectsContainerRight = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: "", title: "", uploader: "", description: "", image: [""], date: "" },
  ]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/dashboard/projects"
      );
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);
  return (
    <div className="projectsContainerRight">
      {projects.map((item, index) => (
        <ScrollReveal direction="Bottom">
          <ProjectsInformation
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            uploader={item.uploader}
            date={item.date}
          />
        </ScrollReveal>
      ))}
    </div>
  );
};

export default ProjectsContainerRight;
