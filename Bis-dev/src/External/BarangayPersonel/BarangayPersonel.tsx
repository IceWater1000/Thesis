import React from "react";
import "../external.css";
import "./BarangayPersonel.css";
import BarangayProfileContainer from "./BarangayProfileContainer";
import Footer from "../Footer";
const BarangayPersonel = () => {
  return (
    <div className="barangayPersonel">
      <div className="mainText">BARANGAY BUTNGA PERSONEL</div>
      <BarangayProfileContainer type="BHW" name="BARANGAY HEALTH WORKERS" />
      <BarangayProfileContainer type="BS" name="BARANGAY STAFFS" />
      <BarangayProfileContainer type="TND" name="BARANGAY TANODS" />
      <BarangayProfileContainer type="SK" name="SK OFFICIALS" />
      <Footer />
      <div
        style={{ width: "100%", height: "46px", backgroundColor: "white" }}
      ></div>
    </div>
  );
};

export default BarangayPersonel;
