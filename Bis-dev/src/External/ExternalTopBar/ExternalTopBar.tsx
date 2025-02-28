import React from "react";
import ExternalTopBarImgContainer from "./ExternalTopBarImgContainer";

import "./externalTopBar.css";
const ExternalTopBar = () => {
  return (
    <>
      <div className="ExTopbar">
        <ExternalTopBarImgContainer />
        <div className="ExTopbarContainer">
          <p className="ExTopbarTitle1">OFFICIAL WEBSITE OF</p>
          <p className="ExTopbarTitle2">BARANGAY BUTNGA</p>
        </div>
        <div className="ExTopbarContainer second">
          <p className="ExTopBarLink">barangay_butnga_OrasES.gmail.com</p>
          <p className="ExTopBarLink">Zone 2 Brgy. Butnga Oras Eastern Samar</p>
        </div>
      </div>
    </>
  );
};

export default ExternalTopBar;
