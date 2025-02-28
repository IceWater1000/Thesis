import React, { useEffect, useState } from "react";
import "./Projects.css";

interface Project {
  id: string;
  title: string;
  uploader: string;
  date: string;
  description: string;
  image: string[];
}
const ProjectsAdditionalPhotoConatiner = () => {
  const [listOfImages, setListOfImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/dashboard/projects"
      );
      const data = await response.json();

      const images = await data.map((item: Project) => item.image[0]);

      setListOfImages(images);
    };
    fetchProjects();
  }, []);

  return (
    <div className="projectsLeftBox">
      <div className="leftBoxTitleText">PHOTOS</div>
      <hr className="blueLine"></hr>

      <div className="leftPhotoContainer">
        {listOfImages.slice(0, 9).map((item, index) => (
          <img className="leftPhotoImages" key={index} src={item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsAdditionalPhotoConatiner;
