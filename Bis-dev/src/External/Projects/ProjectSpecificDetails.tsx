import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ASpecificProject.css";
import "./Projects.css";
interface Project {
  id: string;
  title: string;
  uploader: string;
  date: string;
  description: string;
  image: string[];
}
const ProjectSpecificDetails = () => {
  //getting the id for use of fetching all the data about the project
  const location = useLocation();
  const ids = location.state.id;

  const [projectData, setProjectData] = useState<Project>({
    id: "",
    title: "",
    uploader: "",
    date: "",
    description: "",
    image: [],
  });
  // for the image slider
  const [currentImage, setCurrentImage] = useState(0);

  // when the previous button on the image slider is clicked
  const prevClick = () => {
    setCurrentImage(
      currentImage == 0 ? projectData.image.length - 1 : currentImage - 1
    );
  };
  // when the next biutton on the image slider is clicked
  const nextClick = () => {
    setCurrentImage(
      currentImage == projectData.image.length - 1 ? 0 : currentImage + 1
    );
  };

  //fetching all the data of the project  using the ID that was passed
  useEffect(() => {
    const fetchSpecificProject = async () => {
      const response = await fetch(
        `http://localhost:5000/api/dashboard/specific/${ids}`
      );
      const item = await response.json();
      setProjectData(item);
    };
    fetchSpecificProject();
  }, [ids]);

  return (
    <div className="specificProject">
      <div className="specificProjectImageContainer">
        <div className="prevButton" onClick={prevClick}>
          &#10094;
        </div>
        <div className="specificProjectImageCarousel">
          <img
            className="specificProjectImage"
            src={projectData.image[currentImage]}
          />
        </div>
        <div className="nextButton" onClick={nextClick}>
          &#10095;
        </div>
      </div>
      <div className="specificProjectDetailsContainer">
        <div className="topHeader">
          <img className="brgyLogo" src="/Images/asd.png" />
          <div className="uploaderNameContainer">
            <div className="uploaderNameText">{projectData.uploader}</div>
            <div className="uploadDateText">{projectData.date}</div>
          </div>
          <div className="uploaderNameText">{projectData.title}</div>
        </div>
        <div style={{ padding: "  0px 12px 0px 12px" }}>
          <hr className="blueLine"></hr>
        </div>

        <div className={`descriptionContainers`}>{projectData.description}</div>
      </div>
    </div>
  );
};

export default ProjectSpecificDetails;
