import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import FunctionsBarD from "./functionsBar/FunctionsBarD";
import FunctionsBarCI from "./functionsBar/FunctionsBarCI";
import FunctionsBarRI from "./functionsBar/FunctionsBarRI";
import FunctionsBarVL from "./functionsBar/FunctionsBarVL";
import FunctionsBarLR from "./functionsBar/FunctionsBarLR";
import FunctionsBarA from "./functionsBar/FunctionsBarA";
import MainContentAreaRItables from "./mainContent/MainContentAreaRItables";
import { Outlet } from "react-router-dom";
import "./FuncContArea.css";
import MainContentAreaHtables from "./mainContent/MainContentAreaHtables";
import MainContentAreaHMtables from "./mainContent/MainContentAreaHMtables";
import MainContentAreaSCtables from "./mainContent/MainContentAreaSCtables";
import MainContentAreaKKtables from "./mainContent/MainContentAreaKKtables";
import MainContentAreaDashboard from "./mainContent/MainContentAreaDashboard";
import MainContentAreaLupon from "./mainContent/MainContentAreaLupon";
import MainContentAreaAccounts from "./mainContent/MainContentAreaAccounts";
import MainContentAreaCertificates from "./mainContent/MainContentAreaCertificates";
import MainContentAreaCertificates2 from "./mainContent/MainContenAreaCertificate2";
import MainContentAreaCertificates3 from "./mainContent/MainContenAreaCertificate3";
import MainContentAreaCertificates4 from "./mainContent/MainContenAreaCertificate4";
import MainContentAreaCertificates5 from "./mainContent/MainContenAreaCertificate5";
import MainContentAreaCertificates6 from "./mainContent/MainContenAreaCertificate6";
import MainContentAreaCertificates7 from "./mainContent/MainContenAreaCertificate7";
const FuncContArea = () => {
  let [passFilterItemValue, passFilterItemValueSetter] = useState({
    address: "",
    sex: "",
    civilStatus: "",
    occupation: "",
    citizenship: "",
    status: "alive",
    ageRange1: "",
    ageRange2: "",
  });
  let [passSearchItemValue, passSearchItemValueSetter] = useState("");
  const [cert, setCert] = useState("Barangay Clearance");
  const handleCertChange = (item: string) => {
    setCert(item);
  };

  const determineCertToDisplay = (item: string) => {
    switch (item) {
      case "Barangay Clearance":
        return (
          <>
            <MainContentAreaCertificates />
          </>
        );
      case "Barangay Indigency":
        return (
          <>
            <MainContentAreaCertificates2 />
          </>
        );
      case "Barangay Crisis":
        return (
          <>
            <MainContentAreaCertificates3 />
          </>
        );
      case "Barangay Certification":
        return (
          <>
            <MainContentAreaCertificates4 />
          </>
        );
      case "Business Clearance":
        return (
          <>
            <MainContentAreaCertificates5 />
          </>
        );
      case "Certificate of Good Moral":
        return (
          <>
            <MainContentAreaCertificates6 />
          </>
        );
      case "Barangay Permit":
        return (
          <>
            <MainContentAreaCertificates7 />
          </>
        );
      default:
        break;
    }
  };
  //for refreshin tables
  let [refs, setRefs] = useState(false);
  const passFilterItemHanlder = (item: any) => {
    passFilterItemValueSetter(item);
  };
  const passSearchItemHandler = (item: string) => {
    passSearchItemValueSetter(item);
  };
  //for refreshing tables
  const closesHandler = () => {
    setRefs(!refs);
  };
  let data = useOutletContext<{ message: string; userType: string }>();
  const generateFunctionBar = () => {
    switch (data.message) {
      case "Dashboard":
        return <FunctionsBarD />;
      case "Residents-Information":
        return (
          <FunctionsBarRI
            type={data.userType}
            passItemName={data.message}
            passFilterItem={passFilterItemHanlder}
            passSearchItem={passSearchItemHandler}
            closes={closesHandler}
          />
        );
      case "Household-Record":
        return (
          <FunctionsBarRI
            type={data.userType}
            passItemName={data.message}
            passFilterItem={passFilterItemHanlder}
            passSearchItem={passSearchItemHandler}
            closes={closesHandler}
          />
        );
      case "Household-Members":
        return (
          <FunctionsBarRI
            type={data.userType}
            passItemName={data.message}
            passFilterItem={passFilterItemHanlder}
            passSearchItem={passSearchItemHandler}
            closes={closesHandler}
          />
        );
      case "Senior-Citizens":
        return (
          <FunctionsBarRI
            type={data.userType}
            passItemName={data.message}
            passFilterItem={passFilterItemHanlder}
            passSearchItem={passSearchItemHandler}
            closes={closesHandler}
          />
        );
      case "KK-Members":
        return (
          <FunctionsBarRI
            type={data.userType}
            passItemName={data.message}
            passFilterItem={passFilterItemHanlder}
            passSearchItem={passSearchItemHandler}
            closes={closesHandler}
          />
        );
      case "Lupon-Records":
        return (
          <FunctionsBarLR
            passSearchItem={passSearchItemHandler}
            closes={closesHandler}
          />
        );
      case "Certificate-Issuances":
        return <FunctionsBarCI onCertificateChange={handleCertChange} />;
      case "Accounts":
        return <FunctionsBarA onClickReload={closesHandler} />;
      case "View-Logs":
        return <FunctionsBarVL />;

      default:
        return null;
    }
  };

  const generateMainContent = () => {
    switch (data.message) {
      case "Certificate-Issuances":
        return <>{determineCertToDisplay(cert)}</>;
      case "Dashboard":
        return (
          <>
            <MainContentAreaDashboard />
          </>
        );
      case "Lupon-Records":
        return (
          <MainContentAreaLupon
            addValue={refs}
            searchValue={passSearchItemValue}
          />
        );
      case "Residents-Information":
        return (
          <>
            <MainContentAreaRItables
              type={data.userType}
              addValue={refs}
              filtervalue={passFilterItemValue}
              searchvalue={passSearchItemValue}
            />
          </>
        );
      case "Household-Record":
        return (
          <>
            <MainContentAreaHtables
              type={data.userType}
              addValue={refs}
              filtervalue={passFilterItemValue}
              searchvalue={passSearchItemValue}
            />
          </>
        );
      case "Household-Members":
        return (
          <>
            <MainContentAreaHMtables
              type={data.userType}
              addValue={refs}
              filtervalue={passFilterItemValue}
              searchvalue={passSearchItemValue}
            />
          </>
        );
      case "Senior-Citizens":
        return (
          <>
            <MainContentAreaSCtables
              type={data.userType}
              addValue={refs}
              filtervalue={passFilterItemValue}
              searchvalue={passSearchItemValue}
            />
          </>
        );
      case "KK-Members":
        return (
          <>
            <MainContentAreaKKtables
              type={data.userType}
              addValue={refs}
              filtervalue={passFilterItemValue}
              searchvalue={passSearchItemValue}
            />
          </>
        );
      case "Accounts":
        return (
          <>
            <MainContentAreaAccounts type={data.userType} addValue={refs} />
          </>
        );
      default:
        break;
    }
  };

  return (
    <div
      className="functionBarAndContentArea"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "500px",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {generateFunctionBar()}
      <div className="MainContent">{generateMainContent()}</div>
    </div>
  );
};

export default FuncContArea;
