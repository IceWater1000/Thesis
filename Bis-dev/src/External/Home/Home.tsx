import React, { useState } from "react";
import HomeMainSection from "./HomeMainSection";
import HomeVisionMission from "./HomeVisionMission";
import HomeIntroduction from "./HomeIntroduction";
import HomeOfficials from "./HomeOfficials";
import HomeAnnouncements from "./HomeAnnouncements";
import HomeMap from "./HomeMap";
import HomeEmergencyNumbers from "./HomeEmergencyNumbers";
import Footer from "../Footer";
import Login from "../../Login";
import "../../App.css";
const Home = () => {
  return (
    <>
      <HomeMainSection />

      <HomeVisionMission />

      <HomeIntroduction />

      <HomeOfficials />
      <div
        style={{ width: "100%", height: "46px", backgroundColor: "#2F27CE" }}
      ></div>
      <HomeAnnouncements />
      <HomeMap />
      <div
        style={{ width: "100%", height: "46px", backgroundColor: "#2F27CE" }}
      ></div>
      <HomeEmergencyNumbers />
      <Footer />
    </>
  );
};

export default Home;
