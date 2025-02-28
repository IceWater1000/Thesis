import React from "react";
interface Props {
  label: string;
  onItemClick: () => void;
}
const HomeButton = ({ label, onItemClick }: Props) => {
  return (
    <div className="HomeButton" onClick={onItemClick}>
      {label}
    </div>
  );
};

export default HomeButton;
