import React from "react";
import "./BarangayPersonel.css";
interface Props {
  image: string;
  name: string;
}

const BarangayPersonelProfile = ({ image, name }: Props) => {
  return (
    <div className="barangayPersonelProfile">
      <div className="imageContainer">
        <img className="personelImage" src={image}></img>
      </div>
      <div className="personelProfileName">{name}</div>
    </div>
  );
};

export default BarangayPersonelProfile;
