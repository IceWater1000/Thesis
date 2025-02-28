import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../mainContent/tables.css";
import "../FunctionsBar.css";
interface Props {
  acc: string;
  closes: () => void;
}
const UpdateForm7 = ({ acc, closes }: Props) => {
  const [data, setData] = useState<any>({});
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    usertype: "",
  });
  const [passwordValue, setPasswordValue] = useState({
    password: "",
  });
  useEffect(() => {
    const getOneAccount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/login/viewThisAccount/${acc}`
        );
        setData(response.data);
      } catch (error) {
        console.log("error");
      }
    };

    getOneAccount();
  }, [acc]);

  useEffect(() => {
    setFormData({
      id: data.id || "",
      username: data.username || "",
      usertype: data.usertype || "",
    });
  }, [data]);

  const newPasswordClicked = () => {
    setPasswordClicked(!passwordClicked);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPasswordValue({
      ...passwordValue,
      [name]: value,
    });
  };
  const updateConfirmation = () => {
    //if it has a password

    const save = async () => {
      try {
        const requestData = {
          ...formData,
          password: passwordValue.password,
        };
        console.log(requestData);

        const response = await axios.post(
          `http://localhost:5000/api/login/update`,
          requestData
        );

        console.log("success", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    //if it has not
    const save2 = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/login/update2`,
          formData
        );
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    };
    if (passwordClicked) {
      if (passwordValue.password == "") {
        alert("Please Fill the Password");
      } else {
        save();
        closes();
      }
    } else {
      save2();
      closes();
    }
  };

  return (
    <>
      <div>
        <div className="addingAccountRow">
          <div className="Labels"> Username: </div>
          <input
            className="addingAccountInput"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="addingAccountRow">
          <div className="Labels"> UserType </div>
          <div className="Labels"> {formData.usertype} </div>
        </div>
        <div className="addingAccountRow">
          <button
            className="addingAccountButton"
            onClick={() => {
              newPasswordClicked();
            }}
          >
            {passwordClicked ? "Cancel Password" : "New Password"}
          </button>
        </div>
        <div
          className={`addingAccountRow ${passwordClicked ? "show" : "none"}`}
        >
          <div className="Labels"> New Password: </div>
          <input
            className="addingAccountInput"
            type="password"
            name="password"
            value={passwordValue.password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="addingAccountRow">
          <button
            className="addingAccountButton"
            onClick={() => {
              updateConfirmation();
            }}
          >
            Update
          </button>
          <button
            className="addingAccountButton"
            onClick={() => {
              setPasswordClicked(false);
              closes();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateForm7;
