import { Link, Outlet } from "react-router-dom";
import TopBar from "./topBar/TopBar";
import SideBar from "./sideBar/SideBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useData } from "./DataContext";
import "./Internal.css";
import { DataProvider } from "./utilities/SelectAdformDataReload";
const Internal = () => {
  const userAccount = JSON.parse(localStorage.getItem("data") || "");
  const [var1, setVar1] = useState("Dashboard");
  const getSelectedItem = (item: string) => {
    setVar1(item);
  };
  const var2 = { message: var1, userType: userAccount.usertype };
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "p") {
        event.preventDefault(); // Prevent the default print action
        alert("Printing is disabled.");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <div className="mainBody">
        <TopBar userID={userAccount.id} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          <SideBar
            passTheSelectedItem={getSelectedItem}
            userType={userAccount.usertype}
          />
          <DataProvider>
            <Outlet context={var2} />
          </DataProvider>
        </div>
      </div>
    </>
  );
};

export default Internal;
