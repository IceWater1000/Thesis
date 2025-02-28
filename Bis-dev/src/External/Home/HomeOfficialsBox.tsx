import React from "react";
import "./HomeBox.css";
interface Props {
  img: string;
  name: string;
  position: string;
  committee: string;
}
const HomeOfficialsBox = ({ img, name, position, committee }: Props) => {
  return (
    <>
      <div className="HomeOfficialsBox">
        <img className="HomeOfficialsBoxImage" src={img} />
        <div className="HomeOfficalsText1">{name}</div>
        <div className="HomeOfficalsText2">{position}</div>
        <div className="HomeOfficalsText2">{committee}</div>
      </div>
    </>
  );
};

export default HomeOfficialsBox;
