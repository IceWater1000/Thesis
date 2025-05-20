import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface Props {
  onItemClick: () => void;
  isLogsIn: () => void;
  isVisible: boolean;
}
const Login = ({ onItemClick, isVisible }: Props) => {
  const { setLoggedIN } = useAuth();
  const { isLoggedIN } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginProcess = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login/enter",
        formData
      );
      console.log("Data added successfully:", response.data);

      if (response.data.login) {
        // Update state

        setLoggedIN(true);
        localStorage.setItem("data", JSON.stringify(response.data.data));
        localStorage.setItem("username", formData.username);
        onItemClick();
        navigate("/internal");
        // Navigate only if login is successful
      } else {
        // Ensure state reflects failed login
        setErrorMessage(
          "Login failed. Please check your username or password."
        );
        alert("Log in Error");
        setFormData({
          username: "",
          password: "",
        });
        // Perform any additional actions
      }
    } catch (error) {
      console.error("Error adding data:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isVisible) {
      return;
    }
    const onEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("clicked");
        onItemClick(); // Close the login form when Esc is pressed
      }
    };

    document.addEventListener("keydown", onEscKeyDown);

    return () => {
      document.removeEventListener("keydown", onEscKeyDown);
    };
  }, [onItemClick]);

  return (
    <>
      <div className="loginFormContainer">
        <div className="loginFormContainerLeft" ref={ref}>
          <p className="logINTEXT">ACCOUNT</p>
          <p className="logINTEXT">LOG IN</p>
          <form className="logForm">
            <div className="divSize">
              <label className="jLabel">Username: </label>
              <input
                className="jInput"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="divSize">
              <label className="jLabel">Password: </label>
              <input
                className="jInput"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="logins" onClick={loginProcess}>
              Log in
            </button>
          </form>
        </div>
        <div className="loginFormContainerRight">
          <div className="logInCloseButton" onClick={onItemClick}>
            &#10006;
          </div>
          <div className="welcomeText1">WELCOME TO</div>
          <div className="welcomeText2">BARANGAY BUTNGA INFORMATION SYSTEM</div>
        </div>
      </div>
    </>
  );
};

export default Login;
