import { Title } from "chart.js";
import React from "react";
import "./Projects.css";
interface Props {
  title: string;
  description?: string;
  lists?: string[];
}
const ProjectsLeftBox = ({ title, description, lists }: Props) => {
  return (
    <div className="projectsLeftBox">
      <div className="leftBoxTitleText">{title}</div>
      <hr className="blueLine"></hr>
      {title && <div className="leftBoxDescriptionText">{description}</div>}
      {lists && lists.length > 0 && (
        <ul>
          {lists.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectsLeftBox;
