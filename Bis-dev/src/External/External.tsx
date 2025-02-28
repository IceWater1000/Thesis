import React, { useEffect } from "react";
import "./external.css";
import ExternalTopBar from "./ExternalTopBar/ExternalTopBar";
import ExternalNavigationBar from "./ExternalNavigationBar/ExternalNavigationBar";
import { Outlet, useNavigate } from "react-router-dom";
import { DataProviders } from "./DataContext";
const External = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("Home");
  }, []);

  return (
    <>
      <div className="externalMainBody">
        <ExternalTopBar />
        <DataProviders>
          <ExternalNavigationBar />
          <Outlet />
        </DataProviders>
      </div>
    </>
  );
};

export default External;
