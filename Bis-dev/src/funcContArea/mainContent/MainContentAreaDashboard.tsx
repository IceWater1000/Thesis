import React, { useState } from "react";
import "./contentArea.css";
import { useEffect } from "react";
import OfficialUpdateForm from "../dashboard/OfficialUpdateForm";
import BHWUpdateForm from "../dashboard/BHWUpdateForm";
import StaffUpdateForm from "../dashboard/StaffUpdateForm";
import TanodUpdateForm from "../dashboard/TanodUpdateForm";
import SKUpdateForm from "../dashboard/SKUpdateForm";
import BHWAddForm from "../dashboard/BHWAddForm";
import StaffAddForm from "../dashboard/StaffAddForm";
import TanodAddForm from "../dashboard/TanodAddForm";
import OfficialsAddForm from "../dashboard/OfficialsAddForm";
interface theData {
  id: string;
  name: string;
  position: string;
  other: string;
  image: string;
}
interface theData2 {
  id: string;
  name: string;
  other: string;
  image: string;
}
interface Officials {
  year: string;
  officials: theData[];
}

const MainContentAreaDashboard = () => {
  return (
    <>
      <div className="mains"></div>
    </>
  );
};

export default MainContentAreaDashboard;
