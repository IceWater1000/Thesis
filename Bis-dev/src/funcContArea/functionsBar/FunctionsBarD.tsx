import React, { useState } from "react";
import "./functionsBar.css";
import Announcements from "../dashboard/Announcements";
import FunctionsBarButton from "./FunctionsBarButton";
import Ordinances from "../dashboard/Ordinances";
import Projects from "../dashboard/Projects";
import { useAuth } from "../../AuthContext";
import Personel from "../dashboard/Personel";

const FunctionsBarD = () => {
  const { setLoggedIN } = useAuth();
  const [isDashboardFunctionClicked, setIsDashboardFunctionClicked] =
    useState(false);
  const [activeState, setActiveState] = useState("None");
  const onClickHandler = (item: string) => {
    setIsDashboardFunctionClicked(!isDashboardFunctionClicked);
    setActiveState(item);
  };
  const onClickTabHandler = () => {
    console.log("asdasda");
    setIsDashboardFunctionClicked(!isDashboardFunctionClicked);
  };
  const getActiveState = (item: string) => {
    switch (item) {
      case "Projects":
        return (
          <>
            <Projects
              label="Projects"
              onItemClick={() => {
                onClickTabHandler();
              }}
            />
          </>
        );
      case "Announcements":
        return (
          <>
            <Announcements
              label="Announcements"
              onItemClick={() => {
                onClickTabHandler();
              }}
            />
          </>
        );

      case "Ordinances":
        return (
          <>
            <Ordinances
              label="Ordinances"
              onItemClick={() => {
                onClickTabHandler();
              }}
            />
          </>
        );
      case "Personel":
        return (
          <>
            <Personel
              label="Personel"
              onItemClick={() => {
                onClickTabHandler();
              }}
            />
          </>
        );
      case "None":
        return "";
    }
  };
  return (
    <>
      <div className="functionsBar first">
        <div>
          <FunctionsBarButton
            label="Projects"
            onItemClick={() => {
              onClickHandler("Projects");
            }}
          />
        </div>
        <div>
          <FunctionsBarButton
            label="Announcements"
            onItemClick={() => {
              onClickHandler("Announcements");
            }}
          />
        </div>
        <div>
          <FunctionsBarButton
            label="Barangay Ordinances"
            onItemClick={() => {
              onClickHandler("Ordinances");
            }}
          />
        </div>
        <div>
          <FunctionsBarButton
            label="Barangay Personel"
            onItemClick={() => {
              onClickHandler("Personel");
            }}
          />
        </div>
        <div>
          <FunctionsBarButton
            label="Dashboard UI"
            onItemClick={() => {
              onClickHandler("Personel");
            }}
          />
        </div>
        <div style={{ marginLeft: "auto" }}>
          <FunctionsBarButton
            label="Log Out"
            onItemClick={() => {
              setLoggedIN(false);
            }}
          />
        </div>
      </div>

      <div
        className={`dashboardCanvas ${
          isDashboardFunctionClicked ? "show" : ""
        }`}
      >
        {getActiveState(activeState)}
      </div>
      {isDashboardFunctionClicked && <div className="backdrop2"></div>}
    </>
  );
};

export default FunctionsBarD;
