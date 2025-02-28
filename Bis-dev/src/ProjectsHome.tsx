import React, { useEffect, useState, useRef } from "react";
import "./pao.css";
import axios from "axios";
interface Props {
  label: string;
  target: string;
  onItemClick: () => void;
}
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ProjectsHome = ({ label, onItemClick, target }: Props) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedImage, setSelectedImage] = useState(false);
  const [allSelectedImage, setAllSelectedImage] = useState([]);
  const [sAPILink, setsAPILink] = useState("");
  const [targets, setTarget] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeModal = () => {
    setSelectedImage(false);
  };
  useEffect(() => {
    setTarget(target);
  }, [ProjectsHome]);
  console.log(targets);
  useEffect(() => {
    if (target && containerRef.current) {
      // Find the target element dynamically
      const targetElement = containerRef.current.querySelector(`#${target}`);

      console.log(targetElement);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "instant", block: "start" });
      }
    }
  });

  //Load JSON File Data

  useEffect(() => {
    switch (label) {
      case "Projects":
        setsAPILink("http://localhost:5000/api/dashboard/projects");
        break;
      case "Announcements":
        setsAPILink("http://localhost:5000/api/Announcements/projects");
        break;
      case "Ordinances":
        setsAPILink("http://localhost:5000/api/ordinances/projects");
        break;
    }
  }, [ProjectsHome]);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log(sAPILink);
      const response = await fetch(sAPILink);
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, [sAPILink]);
  const handleImageClick = (image: any) => {
    setAllSelectedImage(image);
    setSelectedImage(true); // Set the clicked image
  };

  return (
    <>
      <div className="dashboardTabs">
        <div className="dashboardTabTopBars">
          <div className="dashbaorTabTopBarLabels">{label.toUpperCase()}</div>
          <div
            className="CloseButtons"
            onClick={() => {
              onItemClick();
            }}
          >
            <img
              className="dashbaordTabTopBarButton"
              src="/Images/White/cross.png"
            />
          </div>
        </div>
        <div
          id="dashboardTabMainContents"
          className="dashboardTabMainContents"
          ref={containerRef}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="theContents"
              id={"target-" + index.toString()}
            >
              <div className="imgContents">
                <img
                  src={project.image[0]}
                  onClick={() => handleImageClick(project.image)}
                />
              </div>
              <div className="textContents">
                <div className="titles">{project.title}</div>

                <div className="descriptions">{project.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {
        // Open or Zoom Images
        selectedImage && (
          <div
            className={`modal ${selectedImage ? "show" : ""}`}
            onClick={closeModal}
          >
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              {allSelectedImage.map((item) => (
                <img className="modalImages" src={item} />
              ))}
            </div>
          </div>
        )
      }
    </>
  );
};

export default ProjectsHome;
