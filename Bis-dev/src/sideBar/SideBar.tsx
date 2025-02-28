import React, { useState, useEffect, useDebugValue } from "react";
import "./SideBar.css";
import SideBarButton from "./SideBarButton";
import { useNavigate } from "react-router-dom";

interface Props {
  userType: string;
  passTheSelectedItem: (item: string) => void;
}
const SideBar = ({ passTheSelectedItem, userType }: Props) => {
  console.log(userType);
  ///for testing purposes
  /* const addData = async () => {
    const data = {
      id: 5,
      lastName: "Jane",
      firstName: "Smith",
      middleName: "qweqwe",
      gender: "F",
      age: 24,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/insertResidentInformation",
        data
      );
      console.log("Data added successfully:", response.data);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  */
  /// end of testing purposes
  const navigate = useNavigate();
  let [selectedItem, setSelectedItem] = useState("Dashboard");
  const onClickHandler = (item: string) => {
    setSelectedItem(item);
    passTheSelectedItem(item);
    navigate(item);
  };

  return (
    <>
      <div className="SideBar">
        <div className="sideBarContent">
          <div className="sideBarLogArea">
            <div className="barangayLogoContainer">
              <img
                style={{ width: "57px", height: "57px" }}
                src="/Images/asd.png"
              />
            </div>

            <div className="logoLabel">
              <p className="headings2">Barangay Butnga</p>
              <p className="headings3">Oras Eastern Samar</p>
            </div>
          </div>

          {
            // Dashboard Button
          }
          <hr className="solidLine"></hr>
          <SideBarButton
            currentActive={selectedItem}
            image={
              selectedItem == "Dashboard"
                ? "/Images/White/dashboard.png"
                : "/Images/Blue/dashboard.png"
            }
            label={"Dashboard"}
            onItemClick={onClickHandler}
          />
          <hr className="solidLine"></hr>
          {
            // Residents Information Button
          }
          <SideBarButton
            currentActive={selectedItem}
            image={
              selectedItem == "Residents-Information"
                ? "/Images/White/database-storage.png"
                : "/Images/Blue/database-storageBlue.png"
            }
            label={"Residents-Information"}
            onItemClick={onClickHandler}
          />
          <SideBarButton
            currentActive={selectedItem}
            image={
              selectedItem == "Household-Record"
                ? "/Images/White/house.png"
                : "/Images/Blue/house.png"
            }
            label={"Household-Record"}
            onItemClick={onClickHandler}
          />
          <SideBarButton
            currentActive={selectedItem}
            image={
              selectedItem == "Household-Members"
                ? "/Images/White/Household.png"
                : "/Images/Blue/Household.png"
            }
            label={"Household-Members"}
            onItemClick={onClickHandler}
          />
          <SideBarButton
            currentActive={selectedItem}
            image={
              selectedItem == "Senior-Citizens"
                ? "/Images/White/SeniorCitizen.png"
                : "/Images/Blue/SeniorCitizen.png"
            }
            label={"Senior-Citizens"}
            onItemClick={onClickHandler}
          />

          <SideBarButton
            currentActive={selectedItem}
            image={
              selectedItem == "KK-Members"
                ? "/Images/White/SK.png"
                : "/Images/Blue/SK.png"
            }
            label={"KK-Members"}
            onItemClick={onClickHandler}
          />
          {
            // Lupon Records Button
          }
          <hr className="solidLine"></hr>
          {userType !== "official" && (
            <>
              <SideBarButton
                currentActive={selectedItem}
                image={
                  selectedItem === "Lupon-Records"
                    ? "/Images/White/auction.png"
                    : "/Images/Blue/auction.png"
                }
                label={"Lupon-Records"}
                onItemClick={onClickHandler}
              />
              <SideBarButton
                currentActive={selectedItem}
                image={
                  selectedItem === "Certificate-Issuances"
                    ? "/Images/White/certificate.png"
                    : "/Images/Blue/certificate.png"
                }
                label={"Certificate-Issuances"}
                onItemClick={onClickHandler}
              />
            </>
          )}

          {userType !== "official" && (
            <>
              <SideBarButton
                currentActive={selectedItem}
                image={
                  selectedItem === "Accounts"
                    ? "/Images/White/certificate.png"
                    : "/Images/Blue/certificate.png"
                }
                label={"Accounts"}
                onItemClick={onClickHandler}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
