import React from "react";
import "./functionsBar.css";
import FunctionsBarButton from "./FunctionsBarButton";
import FunctionsBarSearch from "./FunctionsBarSearch";
const FunctionsBarVL = () => {
  return (
    <div className="functionsBar first">
      <div>
        <FunctionsBarButton label="Filter" onItemClick={() => {}} />
      </div>
      <div>
        <FunctionsBarSearch label="Search" onItemClick={() => {}} />
      </div>
      <div>
        <FunctionsBarButton label="Export" onItemClick={() => {}} />
      </div>
      <div>
        <FunctionsBarButton label="Delete" onItemClick={() => {}} />
      </div>
      <div>
        <FunctionsBarButton label="Archive" onItemClick={() => {}} />
      </div>
      <div style={{ marginLeft: "auto" }}>
        <FunctionsBarButton label="O" onItemClick={() => {}} />
      </div>
    </div>
  );
};

export default FunctionsBarVL;
