import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopBar.css";
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
  const handleAddSave = () => {
    const update = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/login/add`,
          theUserData2
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    update();
    setAccountAddOpen(!accountAddOpen);
    cleanData();
  };
  const handleSave = () => {
    const update = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/login/update`,
          theUserData
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    update();
    setIsEditing(!isEditing);
    setAccountOpen(!accountOpen);
  };
  const handleOpenClick = () => {
    setAccountOpen(!accountOpen);
  };
  const handleChange2 = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setTheUserData2({
      ...theUserData2,
      [name]: value,
    });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTheUserData({
      ...theUserData,
      [name]: value,
    });
  };
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  console.log(theUserData2);
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
            <div className="Labels"> Full Name: </div>
            {isEditing ? (
              <input
                className="inputs2"
                name="userTrueName"
                onChange={handleChange}
                value={theUserData.userTrueName}
              ></input>
            ) : (
              <div className="Labels2">{theUserData.userTrueName}</div>
            )}
          </div>
          <hr className="solidLine"></hr>
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
            <div className="Labels"> Position: </div>
            {isEditing ? (
              <input
                className="inputs2"
                name="position"
                onChange={handleChange}
                value={theUserData.position}
              ></input>
            ) : (
              <div className="Labels2">{theUserData.position}</div>
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
                Add
              </div>
            ) : (
              ""
            )}
            {isEditing ? (
              <div className="buttons" onClick={handleSave}>
                Save
              </div>
            ) : (
              <div className="buttons" onClick={handleEdit}>
                Edit
              </div>
            )}

            <div className="buttons" onClick={handleOpenClick}>
              Close
            </div>
          </div>
        </div>
        <div className={`addAccountTab ${accountAddOpen ? "show" : ""}`}>
          <div className="ATrow">
            <div className="accountLabel">Add Form</div>
          </div>
          <hr className="solidLine"></hr>
          <div className="ATrow">
            <div className="Labels"> Full Name: </div>
            <input type="text" name="userTrueName" onChange={handleChange2} />
          </div>
          <hr className="solidLine"></hr>
          <div className="ATrow">
            <div className="Labels"> Position: </div>
            <input type="text" name="position" onChange={handleChange2} />
          </div>
          <hr className="solidLine"></hr>
          <div className="ATrow">
            <div className="Labels"> Username: </div>
            <input type="text" name="username" onChange={handleChange2} />
          </div>
          <hr className="solidLine"></hr>
          {theUserData.usertype == "admin" ? (
            <div className="ATrow" style={{ alignItems: "center" }}>
              <div className="Labels"> User Type: </div>
              <select
                name="usertype"
                value={theUserData2.usertype}
                onChange={handleChange2}
                required
                defaultValue={"official"}
              >
                <option value="official">Official</option>
                <option value="secretary">Secretary</option>
              </select>
            </div>
          ) : (
            ""
          )}

          <div className="ATrow">
            <div className="buttons" onClick={handleAddSave}>
              Add
            </div>
            <div className="buttons" onClick={handleAdd}>
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
