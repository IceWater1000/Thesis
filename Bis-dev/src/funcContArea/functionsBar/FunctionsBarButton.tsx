import React from "react";
import "./FunctionsBar.css";
import { Link } from "react-router-dom";
interface Props {
  label: string;
  onItemClick: () => void;
}
const FunctionsBarButton = ({ label, onItemClick }: Props) => {
  return (
    <>
      <div
        className="functionBarButton"
        onClick={() => {
          onItemClick();
        }}
      >
        <p className="functionBarButtonText">{label}</p>
      </div>
    </>
  );
};

export default FunctionsBarButton;
