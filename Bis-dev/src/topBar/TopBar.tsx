import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopBar.css";
import { div } from "framer-motion/client";
interface Props {
  userID: string;
}
const TopBar = ({ userID }: Props) => {
  const [data, setData] = useState();
  const [theUserData, setTheUserData] = useState({
    id: "",
    userTrueName: "",
    username: "",
    position: "",
    usertype: "",
    password: "",
  });
  const [theUserData2, setTheUserData2] = useState({
    userTrueName: "",
    username: "",
    position: "",
    usertype: "official",
    password: "butnga",
  });
  const cleanData = () => {
    setTheUserData2({
      userTrueName: "",
      username: "",
      position: "",
      usertype: "official",
      password: "butnga",
    });
  };
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountAddOpen, setAccountAddOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchAccounDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/login/view/${userID.toString()}`
        );
        setTheUserData({
          id: response.data.id,
          userTrueName: response.data.userTrueName,
          username: response.data.username,
          position: response.data.position,
          usertype: response.data.usertype,
          password: response.data.password,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccounDetails();
  }, [isEditing, accountOpen]);
  const handleAdd = () => {
    cleanData();
    setAccountAddOpen(!accountAddOpen);
  };

  const handleOpenClick = () => {
    setAccountOpen(!accountOpen);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTheUserData({
      ...theUserData,
      [name]: value,
    });
  };
  const [LogData, setLogData] = useState<string[]>([]);
  useEffect(() => {
    const getLogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/logs/GetAll`
        );
        setLogData(response.data.logs);
      } catch (error) {
        console.log(error);
      }
    };
    getLogs();
  }, []);
  return (
    <>
      <div className="TopBar">
        <div>
          <p className="headings" style={{ marginLeft: "32px" }}>
            BARANGAY INFORMATION SYSTEM
          </p>
        </div>
        <div className="ImageContainer" onClick={handleOpenClick}>
          <img width={70} height={70} src="/Images/White/account.png" />
        </div>
        <div className={`accountTab ${accountOpen ? "show" : ""}`}>
          <div className="ImageContainer2" onClick={handleOpenClick}>
            <img width={150} height={150} src="/Images/account.png" />
            <div className="accountLabel">Account</div>
            <hr className="solidLine"></hr>
          </div>

          <div className="ATrow">
            <div className="Labels"> Username: </div>
            {isEditing ? (
              <input
                className="inputs2"
                name="username"
                onChange={handleChange}
                value={theUserData.username}
              ></input>
            ) : (
              <div className="Labels2">{theUserData.username}</div>
            )}
          </div>
          <hr className="solidLine"></hr>

          <div className="ATrow">
            <div className="Labels"> Type: </div>
            <div className="Labels2">{theUserData.usertype}</div>
          </div>
          {isEditing ? (
            <>
              <hr className="solidLine"></hr>
              <div className="ATrow">
                <div className="Labels"> Password: </div>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <hr className="solidLine"></hr>
          <div className="ATrow">
            {theUserData.usertype == "admin" ||
            theUserData.usertype == "secretary" ? (
              <div className="buttons" onClick={handleAdd}>
                View Logs
              </div>
            ) : (
              ""
            )}

            <div className="buttons" onClick={handleOpenClick}>
              Close
            </div>
          </div>
        </div>
        <div className={`addAccountTab ${accountAddOpen ? "show" : ""}`}>
          <div className="LogsTitle">Logs</div>
          <div className="LogsSection">
            {LogData.map((data, index) => (
              <div key={index}>{data}</div>
            ))}
          </div>
          <div className="ATrow">
            <div
              className="buttons"
              onClick={handleAdd}
              style={{ marginTop: "auto" }}
            >
              Close
            </div>
          </div>
        </div>
        {accountOpen && <div className="accountBackDrop"></div>}
      </div>
    </>
  );
};

export default TopBar;
