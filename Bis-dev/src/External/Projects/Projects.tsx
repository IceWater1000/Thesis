import React, { useEffect, useRef, useState } from "react";
import "./Projects.css";
import "../Announcements/Announcements.css";
import ProjectsLeftBox from "./ProjectsLeftBox";
import ProjectsInformation from "./ProjectsInformation";
import ProjectsContainerRight from "./ProjectsContainerRight";
import ProjectsAdditionalPhotoConatiner from "./ProjectsAdditionalPhotoConatiner";
import Footer from "../Footer";
const Projects = () => {
  // for making projectsContainerleft Sticky
  const ref = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio === 1) {
            setIsFixed(false);
          } else {
            // Remove sticky class when the bottom of the element is not visible
            setIsFixed(true);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        threshold: 1.0, // Trigger when the entire element is in view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div className="projects">
      <div className="announcementsHeader">
        <div className="blue">
          <div className="annnoncementsHeadText">BARANGAY BUTNGA PROJECTS</div>
          <div className="announcementsDescText">
            The Projects Page of Barangay Butnga showcases the initiatives and
            developments undertaken to improve our community. Explore our
            ongoing and completed projects and see how we’re working together
            for a better Barangay Butnga.
          </div>
        </div>
      </div>
      <div className="projectsContainer">
        <div
          ref={ref}
          className={`projectsContainerLeft ${isFixed ? "isFixed" : ""}`}
        >
          <ProjectsLeftBox
            title="VISION"
            description="Barangay Butnga envisions a progressive, inclusive, and sustainable community where every resident enjoys quality services, active participation, and a harmonious environment that fosters growth and development for all."
          />
          <ProjectsLeftBox
            title="MISSION"
            description="To provide responsive and transparent governance, deliver accessible and quality services, promote community involvement, and uphold the well-being of every resident, ensuring a safe, united, and progressive barangay for all."
          />
          <ProjectsLeftBox
            title="UPCOMING PROJECTS"
            lists={[
              "Addition of Solar Street Lights",
              "Addition of Announcements Speaker",
            ]}
          />
          <div>
            <ProjectsAdditionalPhotoConatiner />
          </div>
        </div>
        <ProjectsContainerRight />
      </div>
      <Footer />
      <div
        style={{ width: "100%", height: "46px", backgroundColor: "white" }}
      ></div>
    </div>
  );
};

export default Projects;
