import React from "react";
import "../external.css";
import "./BarangayPersonel.css";
import BarangayProfileContainer from "./BarangayProfileContainer";
import Footer from "../Footer";
const BarangayPersonel = () => {
  return (
    <div className="barangayPersonel">
      <div className="mainText">BARANGAY BUTNGA PERSONEL</div>
      <BarangayProfileContainer
        url="http://localhost:5000/api/personel2/view"
        name="BARANGAY HEALTH WORKERS"
      />
      <BarangayProfileContainer
        url="http://localhost:5000/api/personel3/view"
        name="BARANGAY STAFFS"
      />
      <BarangayProfileContainer
        url="http://localhost:5000/api/personel4/view"
        name="BARANGAY TANODS"
      />
      <BarangayProfileContainer
        url="http://localhost:5000/api/personel5/view"
        name="SK OFFICIALS"
      />
      <Footer />
      <div
        style={{ width: "100%", height: "46px", backgroundColor: "white" }}
      ></div>
    </div>
  );
};

export default BarangayPersonel;
