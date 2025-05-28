import React, { useState } from "react";
import "./Maps.css";
import MapComponent from "./MapComponent";
import Footer from "../Footer";
const Maps = () => {
  const [isViewing, setIsViewing] = useState(false);
  const handleViewMapClickButton = () => {
    setIsViewing(!isViewing);
  };
  return (
    <div className="map">
      <div className="mapTitle">THE BARANGAY BUTNGA</div>
      <div className="originalMapContainer">
        <img className="map1" src="/Images/map3.jpg" />
        <img className="map2" src="/Images/MapLegend.png" />
      </div>
      <div className="openLayerMapComponents">
        <div className="openLayerMapComponentsHeader">
          <div className="mapTitle2">Barangay Butnga In OpenStreet Map</div>
          <div className="viewBorderButton" onClick={handleViewMapClickButton}>
            {isViewing ? "Close Butnga View" : "View Barangay Butnga"}
          </div>
        </div>

        <MapComponent lookAtBorder={isViewing} />
      </div>
      <Footer />
      <div
        style={{ width: "100%", height: "46px", backgroundColor: "white" }}
      ></div>
    </div>
  );
};

export default Maps;
