import React from "react";
import "./Ordinaces.css";
import Footer from "../Footer";
import OrdinancesContainer from "./OrdinancesContainer";
const Ordinances = () => {
  return (
    <div className="ordinances">
      <div className="announcementsHeader">
        <div className="blue">
          <div className="annnoncementsHeadText">
            BARANGAY BUTNGA ORDINANCES
          </div>
          <div className="announcementsDescText">
            The Ordinances Page of Barangay Butnga provides access to local laws
            and regulations aimed at fostering order and progress in our
            community. Stay informed about the rules that guide and protect
            Barangay Butnga.
          </div>
        </div>
      </div>
      <OrdinancesContainer />
      <Footer />
      <div
        style={{ width: "100%", height: "46px", backgroundColor: "white" }}
      ></div>
    </div>
  );
};

export default Ordinances;
