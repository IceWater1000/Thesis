import React, { useState } from "react";
import "./dForms.css";
import { useEffect } from "react";
import axios from "axios";
import UpdateForm3 from "../functionsBar/addForms/UpdateForm3";
import { useActionData } from "react-router-dom";
interface theData {
  id: string;
  name: string;

  other: string;
  image: string;
}
interface Props {
  items: string;
  onItemClick: () => void;
}
const StaffUpdateForm = ({ items, onItemClick }: Props) => {
  const [imgs, setImgs] = useState<File | null>(null);
  const [theData, setTheData] = useState<theData>({
    id: "",
    name: "",

    other: "",
    image: "",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/personel3/specific/${items}`
      );
      const data = await response.json();
      setTheData(data);
    };
    getData();
  }, [items]);
  //input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTheData({
      ...theData,
      [name]: value,
    });

    // on submission
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImgs(event.target.files[0]); // Set the file if it exists
    }
  };
  const handleSubmits = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imgs) {
      return;
    }
    const formData = new FormData();
    formData.append("id", theData.id);
    formData.append("name", theData.name);

    formData.append("other", theData.other);
    formData.append("personImage", imgs);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/personel3/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // This is important for file uploads
          },
        }
      );
      console.log("Project added:", response.data);
    } catch (error) {}
    onItemClick();
  };
  return (
    <>
      <div className="theForm">
        <div style={{ display: "flex", gap: "24px" }}>
          <p className="tl">Barangay Staff</p>
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              onItemClick();
            }}
          >
            Exit
          </button>
        </div>

        <form onSubmit={handleSubmits}>
          <div className="thefor">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={theData.name}
              onChange={handleChange}
            />
          </div>

          <div className="thefor">
            <label>Type: </label>
            <input
              type="text"
              name="other"
              value={theData.other}
              onChange={handleChange}
            />
          </div>
          <div className="thefor">
            <label>Image:</label>
            <input
              type="file"
              name="personImage"
              onChange={handleImageChange}
              required
            />
          </div>
          <button className="fButton" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default StaffUpdateForm;
