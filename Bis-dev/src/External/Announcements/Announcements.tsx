import React from "react";
import "./Announcements.css";
import Footer from "../Footer";
import AnnouncementsContainer from "./AnnouncementsContainer";

const Announcements = () => {
  return (
    <div className="announcements">
      <div className="announcementsHeader">
        <div className="blue">
          <div className="annnoncementsHeadText">
            BARANGAY BUTNGA ANNOUNCEMENTS
          </div>
          <div className="announcementsDescText">
            Committed to keeping you informed, we bring you the latest updates,
            important events, and valuable information to stay connected with
            our community. Stay tuned for the newest announcements!
          </div>
        </div>
      </div>
      <AnnouncementsContainer />
      <Footer />
      <div
        style={{ width: "100%", height: "46px", backgroundColor: "white" }}
      ></div>
    </div>
  );
};

export default Announcements;
