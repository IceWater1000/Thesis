import React from "react";
interface Props {
  img: string;
  name: string;
  dept: string;
  num1: string;
  num2: string;
}
const HomeEmergencyNumbersBox = ({ img, name, dept, num1, num2 }: Props) => {
  return (
    <div className="HomeEmergencyBox">
      <img className="HomeEmergencyBoxImage" src={img} />
      <div className="HomeEmergencyBoxText1">{name}</div>
      <div className="HomeEmergencyBoxText2">{dept}</div>
      <div className="HomeEmergencyBoxText1">{num1}</div>
      <div className="HomeEmergencyBoxText1">{num2}</div>
    </div>
  );
};

export default HomeEmergencyNumbersBox;
