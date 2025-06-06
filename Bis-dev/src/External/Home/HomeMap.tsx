import React from "react";
import HomeButton from "./HomeButton";
import { useData } from "../DataContext";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { object } from "framer-motion/client";
const HomeMap = () => {
  ///useData is used to turn the active button of the navigation bar
  const { currentActiveFromButtons, setCurrentActiveFromButtons } = useData();
  const navigate = useNavigate();
  const HomeButtonClickHandler = () => {
    setCurrentActiveFromButtons("MAPS");
    navigate("/MAPS");
  };
  return (
    <div className="HomeMap">
      <div className="HomeIntroductionText">MAP OF THE BARANGAY</div>
      <div className="HomeMapRow">
        <ScrollReveal direction="Left">
          <img className="HomeMapImage" src="/Images/map3.jpg" />
        </ScrollReveal>
        <ScrollReveal direction="Right">
          <div className="HomeMapLegend">
            <div className="HomeMapLegendTitle">Legend</div>

            <img
              style={{ objectFit: "cover", width: "70%" }}
              src="/Images/MapLegend.png"
            />

            <HomeButton
              label="View All Maps"
              onItemClick={HomeButtonClickHandler}
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default HomeMap;
