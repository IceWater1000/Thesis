import React, { useState } from "react";
import "./functionsBar.css";
import axios from "axios";
import FunctionsBarButton from "./FunctionsBarButton";
interface Props {
  onClickReload: () => void;
}
const FunctionsBarA = ({ onClickReload }: Props) => {
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const handleAddingButtonClick = () => {
    setIsAddingAccount(!isAddingAccount);
  };
  const [addingAccountData, setAdddingAccountData] = useState({
    username: "",
    usertype: "official",
    password: "",
  });
  const handleAddingChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAdddingAccountData({
      ...addingAccountData,
      [name]: value,
    });
  };
  const handleConfirmAddClick = () => {
    //console.log(addingAccountData);
    const update = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/login/add`,
          addingAccountData
        );
        onClickReload();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (addingAccountData.password == "" || addingAccountData.username == "") {
      alert("Pleas Fill in all Forms");
    } else {
      update();

      handleAddingButtonClick();
      clearData();
    }
  };
  const clearData = () => {
    setAdddingAccountData({
      username: "",
      usertype: "official",
      password: "",
    });
  };
  return (
    <>
      <div className="static">
        <div className="functionsBar first">
          <FunctionsBarButton
            label="Add"
            onItemClick={() => {
              handleAddingButtonClick();
            }}
          />
        </div>
        {isAddingAccount ? (
          <div
            className={`accountAddingFormDark ${isAddingAccount ? "show" : ""}`}
            onClick={handleAddingButtonClick}
          ></div>
        ) : (
          ""
        )}

        <div className={`accountAddingForm ${isAddingAccount ? "show" : ""}`}>
          <div className="addingAccountRow">
            <div className="Labels"> Username: </div>
            <input
              className="addingAccountInput"
              type="text"
              name="username"
              value={addingAccountData.username}
              onChange={handleAddingChange}
            />
          </div>
          <div className="addingAccountRow">
            <div className="Labels"> Password: </div>
            <input
              className="addingAccountInput"
              type="password"
              name="password"
              value={addingAccountData.password}
              onChange={handleAddingChange}
            />
          </div>
          <div className="addingAccountRow">
            <div className="Labels"> User Type: </div>
            <select
              className="addingAccountSelect"
              name="usertype"
              value={addingAccountData.usertype}
              onChange={handleAddingChange}
            >
              <option value="official">Official</option>
              <option value="secretary">Secretary</option>
            </select>
          </div>
          <div className="addingAccountRow">
            <button
              className="addingAccountButton"
              onClick={() => {
                handleConfirmAddClick();
              }}
            >
              Add
            </button>
            <button
              className="addingAccountButton"
              onClick={() => {
                handleAddingButtonClick();
                clearData();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FunctionsBarA;
