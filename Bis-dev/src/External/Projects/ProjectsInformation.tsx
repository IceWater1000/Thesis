import React, { useEffect, useRef, useState } from "react";
import "./Projects.css";
import { Link, useNavigate } from "react-router-dom";
interface Props {
  id: string;
  title: string;
  uploader: string;
  date: string;
  description: string;
  image: string[];
}
const ProjectsInformation = ({
  id,
  title,
  uploader,
  date,
  description,
  image,
}: Props) => {
  const [imageContainerSize, setImageContainerSize] = useState(
    `imgSize${image.length}`
  );

  const fixedTitle = title.split(" ").join();
  useEffect(() => {
    switch (image.length) {
      case 1:
        setImageContainerSize("imgSize1");
        break;
      case 2:
        setImageContainerSize("imgSize2");
        break;
      case 3:
        setImageContainerSize("imgSize3");
        break;
      case 4:
        setImageContainerSize("imgSize4");
        break;
      case 5:
      default:
        setImageContainerSize("imgSize5");
        break;
    }
  }, [image]);
  //for seemore and see less
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight
      );
    }
  }, [description]);
  return (
    <div className="projectsInformation" key={id}>
      <div className="topHeader">
        <img className="brgyLogo" src="/Images/asd.png" />
        <div className="uploaderNameContainer">
          <div className="uploaderNameText">{uploader}</div>
          <div className="uploadDateText">{date}</div>
        </div>
        <div className="uploaderNameText">{title}</div>
      </div>
      <div style={{ padding: "  0px 12px 0px 12px" }}>
        <hr className="blueLine"></hr>
      </div>

      <div
        className={`descriptionContainer ${expanded ? "expanded" : ""}`}
        ref={descriptionRef}
      >
        {description}
      </div>
      {isOverflowing && !expanded && (
        <div
          style={{ cursor: "pointer" }}
          className="descriptionContainer"
          onClick={() => setExpanded(true)}
        >
          <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
            See More{" "}
          </span>
        </div>
      )}
      {expanded && (
        <div
          style={{ cursor: "pointer" }}
          className="descriptionContainer"
          onClick={() => setExpanded(false)}
        >
          <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
            See Less{" "}
          </span>
        </div>
      )}
      <Link
        to={`/Projects/${fixedTitle}`}
        style={{ textDecoration: "none", color: "inherit" }}
        state={{ id: id }}
      >
        <div className={`imagesContainer ${imageContainerSize}`}>
          {image.map((item, index) =>
            index < 5 ? (
              <div className="image1" key={index}>
                <img src={item}></img>
                {index == 4 && image.length > 5 ? (
                  <div className="lastImage">+{image.length - 5}</div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProjectsInformation;
