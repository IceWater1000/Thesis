import React, { useEffect, useState } from "react";
import "./ExternalNavigationBar.css";
import ExternalNavigatrionBarButton from "./ExternalNavigatrionBarButton";
import { useNavigate } from "react-router-dom";
import { useData } from "../DataContext";
const ExternalNavigationBar = () => {
  const { currentActiveFromButtons, setCurrentActiveFromButtons } = useData();
  const [currentActive, setCurrentActive] = useState("HOME");
  const navigate = useNavigate();
  const onItemClickHandler = (item: string, second: string) => {
    setCurrentActiveFromButtons(item);
    setCurrentActive(item);

    navigate(second);
  };
  useEffect(() => {
    setCurrentActive(currentActiveFromButtons);
  }, [currentActiveFromButtons]);
  return (
    <>
      <div className="ExternalNavigationBar">
        <ExternalNavigatrionBarButton
          urls="Home"
          label="HOME"
          lastChild={false}
          onItemClick={onItemClickHandler}
          Active={currentActive}
        />
        <ExternalNavigatrionBarButton
          urls="DemographicProfile"
          label="DEMOGRAPHIC PROFILE"
          lastChild={false}
          onItemClick={onItemClickHandler}
          Active={currentActive}
        />
        <ExternalNavigatrionBarButton
          urls="BarangayPersonel"
          label="BARANGAY PERSONEL"
          lastChild={false}
          onItemClick={onItemClickHandler}
          Active={currentActive}
        />
        <ExternalNavigatrionBarButton
          urls="Announcements"
          label="ANNOUNCEMENTS"
          lastChild={false}
          onItemClick={onItemClickHandler}
          Active={currentActive}
        />
        <ExternalNavigatrionBarButton
          urls="Projects"
          label="PROJECTS"
          lastChild={false}
          onItemClick={onItemClickHandler}
          Active={currentActive}
        />
        <ExternalNavigatrionBarButton
          urls="Ordinances"
          label="ORDINANCES"
          lastChild={false}
          onItemClick={onItemClickHandler}
          Active={currentActive}
        />
        <ExternalNavigatrionBarButton
          urls="Maps"
          label="MAPS"
          lastChild={true}
          onItemClick={onItemClickHandler}
          Active={currentActive}
        />
      </div>
    </>
  );
};

export default ExternalNavigationBar;
