import React, { useEffect, useState } from "react";
import "./dashboardContents.css";

import axios from "axios";
import YearPicker from "./YearPicker";
import { data } from "react-router-dom";
import { useSelectAddformReload } from "../../utilities/SelectAdformDataReload";
interface Props {
  label: string;
  onItemClick: () => void;
}
interface Ordinances {
  id: string;
  ordinanceNumber: string;
  title: string;
  description: string;
  image: string;
}
interface YearOrdinaces {
  year: string;
  ordinances: Ordinances[];
}
const Ordinances = ({ label, onItemClick }: Props) => {
  const [reload, setReload] = useState(false);
  const [projects, setProjects] = useState<YearOrdinaces[]>([]);
  const [currentYearProjects, setCurrentYearProjects] = useState<Ordinances[]>(
    []
  );
  const [selectedImage, setSelectedImage] = useState(false);
  const [allSelectedImage, setAllSelectedImage] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdating2, setIsupdating2] = useState(false);
  const [ordinanceNumber, setOrdinanceNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>([]);
  const [currentSelectedYear, setCurrentSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  //For the Year Selector Active Background Option
  const { YearPickerReload, SetYearPickerReload } = useSelectAddformReload();
  const [updatingValue, setUpdatingValue] = useState<Ordinances>({
    id: "",
    title: "",
    ordinanceNumber: "",
    description: "",
    image: "",
  });
  //Load JSON File Data
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/ordinances/projects"
      );
      const data = await response.json();
      setProjects(data);
      setCurrentYearProjects(
        data
          .find((item: YearOrdinaces) => item.year == currentSelectedYear)
          ?.ordinances.reverse() || []
      );
    };

    fetchProjects();
  }, [reload]);

  useEffect(() => {
    setCurrentYearProjects(
      projects
        .find((item) => item.year == currentSelectedYear)
        ?.ordinances.reverse() || []
    );
  }, [currentSelectedYear]);

  const handleImageClick = (image: any) => {
    setAllSelectedImage(image);
    setSelectedImage(true); // Set the clicked image
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImage(false);
  };

  //for updating the data
  const handleUpdate = () => {
    setIsUpdating(!isUpdating);
  };
  //for updating the data
  const handleUpdate2 = async (id: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/ordinances/specific",
        {
          method: "POST", // Changed from default GET to POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, currentSelectedYear }), // Send the id in the request body
        }
      );
      const data = await response.json();
      setUpdatingValue(data);
      setIsupdating2(!isUpdating);
    } catch (error) {
      console.log(error);
    }
  };
  //for deleting the data
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/ordinances/delete",
          {
            method: "POST", // Changed from default GET to POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, currentSelectedYear }), // Send the id in the request body
          }
        );

        if (response.ok) {
          setReload(!reload);
          console.log("Project deleted successfully");
          console.log(response);
        } else {
          alert("Failed to delete the project.");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  //add submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !description || !image || !ordinanceNumber) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("year", currentSelectedYear);
    formData.append("ordinanceNumber", ordinanceNumber);
    formData.append("title", title);
    formData.append("description", description);
    image.forEach((file: any) => {
      formData.append("projectImage", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ordinances/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // This is important for file uploads
          },
        }
      );
      console.log("Project added:", response.data);

      // Optionally, reset the form or update the UI
    } catch (error: any) {
      console.error("Error adding project:", error.response.data.message);
    }
    setIsUpdating(!isUpdating);
    setReload(!reload);
    SetYearPickerReload(!YearPickerReload);
  };
  //update submit
  const handleSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedData = { ...updatingValue, year: currentSelectedYear };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/ordinances/update`,
        updatedData
      );
      setReload(!reload);
      // Optionally, reset the form or update the UI
    } catch (error: any) {
      console.log(error);
    }
    setIsupdating2(!isUpdating2);
  };
  //for adding
  const handleOrdinanceNumberChange = (e: any) => {
    setOrdinanceNumber(e.target.value);
  };
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };
  //for updating
  const handleDescriptionChange2 = (e: any) => {
    setUpdatingValue({
      ...updatingValue,
      description: e.target.value,
    });
  };
  const handleOrdinanceNumberChange2 = (e: any) => {
    setUpdatingValue({
      ...updatingValue,
      ordinanceNumber: e.target.value,
    });
  };
  const handleTitleChange2 = (e: any) => {
    setUpdatingValue({
      ...updatingValue,
      title: e.target.value,
    });
  };
  const handleImageChange = (e: any) => {
    setImage([...e.target.files]);
  };
  const asd = () => {
    /*projects.map((project, index) => (
            <div key={index} className="theContent">
              <div className="imgContent">
                <img
                  src={project.image[0]}
                  onClick={() => handleImageClick(project.image)}
                />
              </div>
              <div className="textContent">
                <div className="title">{project.title}</div>

                <div className="description">{project.description}</div>
              </div>
              <div className="actionContent">
                <img
                  className="imgLogo"
                  src="/Images/Blue/delete.png"
                  alt=""
                  onClick={() => {
                    handleDelete(project.id);
                  }}
                />
                <img
                  onClick={() => {
                    handleUpdate2(project.id);
                  }}
                  className="imgLogo"
                  src="/Images/Blue/edit.png"
                  alt=""
                />
              </div>
            </div>
          ))*/
  };

  return (
    <>
      <div className="dashboardTab">
        <div className="dashboardTabTopBar">
          <div className="dashbaorTabTopBarLabel">{label.toUpperCase()}</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                color: "white",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Year:
            </div>
            <YearPicker
              selectChange={(item: string) => {
                setCurrentSelectedYear(item);
              }}
            />
          </div>
          <div
            className="AddButton"
            onClick={() => {
              handleUpdate();
            }}
          >
            <img
              className="dashbaordTabTopBarButton"
              src="/Images/White/add.png"
            />
          </div>
          <div
            className="CloseButton"
            onClick={() => {
              onItemClick();
            }}
          >
            <img
              className="dashbaordTabTopBarButton"
              src="/Images/White/cross.png"
            />
          </div>
        </div>
        <div className="dashboardTabMainContent">
          {currentYearProjects.reverse().map((project, index) => (
            <div key={index} className="theContent">
              <div className="imgContent">
                <img
                  src={project.image[0]}
                  onClick={() => handleImageClick(project.image)}
                />
              </div>
              <div className="textContent">
                <div className="title">
                  Ordinance No. {project.ordinanceNumber} Series of{" "}
                  {currentSelectedYear}
                </div>
                <div className="title2">{project.title}</div>
                <div className="description">{project.description}</div>
              </div>
              <div className="actionContent">
                <img
                  className="imgLogo"
                  src="/Images/Blue/delete.png"
                  alt=""
                  onClick={() => {
                    handleDelete(project.id);
                  }}
                />
                <img
                  onClick={() => {
                    handleUpdate2(project.id);
                  }}
                  className="imgLogo"
                  src="/Images/Blue/edit.png"
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {
        // for updating
        isUpdating2 && (
          <div className={`dashboardForm ${isUpdating2 ? "show" : ""}`}>
            <form className="dashboardFormContents" onSubmit={handleSubmit2}>
              <div className="dashboardAddformTitle">ORDINANCES UPDATEFORM</div>
              <hr className="BlueLine" style={{ marginTop: "0" }}></hr>
              <div className="dashboardFormContent">
                <label className="labels">Ordinance Number</label>
                <input
                  className="dashboardInputButton"
                  type="number"
                  name="projectTitle"
                  onChange={handleOrdinanceNumberChange2}
                  value={updatingValue.ordinanceNumber}
                  required
                />
              </div>
              <div className="dashboardFormContent">
                <label className="labels">Ordinance Title</label>
                <input
                  className="dashboardInputButton"
                  type="text"
                  name="projectTitle"
                  value={updatingValue.title}
                  onChange={handleTitleChange2}
                  required
                />
              </div>
              <div className="dashboardFormContent">
                <label className="labels">Ordinance Description</label>
                <textarea
                  className="dashboardTextAreaButton"
                  name="projectDescription"
                  id="projectDescription"
                  onChange={handleDescriptionChange2}
                  value={updatingValue.description}
                  required
                ></textarea>
              </div>

              <div className="dashboardFormContent">
                <button type="submit">Save</button>
                <button
                  type="button" // Prevent accidental form submission
                  onClick={() => {
                    setIsupdating2(!isUpdating2);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
      }
      {
        // for adding
        isUpdating && (
          <div className={`dashboardForm ${isUpdating ? "show" : ""}`}>
            <form className="dashboardFormContents" onSubmit={handleSubmit}>
              <div className="dashboardAddformTitle">ORDINANCES ADDFORM</div>
              <hr className="BlueLine" style={{ marginTop: "0" }}></hr>
              <div className="dashboardFormContent">
                <label className="labels">Ordinance Number</label>
                <input
                  className="dashboardInputButton"
                  type="number"
                  name="projectTitle"
                  onChange={handleOrdinanceNumberChange}
                  required
                />
              </div>
              <div className="dashboardFormContent">
                <label className="labels">Ordinance Title</label>
                <input
                  className="dashboardInputButton"
                  type="text"
                  name="projectTitle"
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className="dashboardFormContent">
                <label className="labels">Ordinance Description</label>
                <textarea
                  className="dashboardTextAreaButton"
                  name="projectDescription"
                  id="projectDescription"
                  onChange={handleDescriptionChange}
                  required
                ></textarea>
              </div>
              <div className="dashboardFormContent">
                <label className="labels">Image</label>
                <input
                  className="dashboardInputButton"
                  name="projectImage"
                  type="file"
                  onChange={handleImageChange}
                  multiple
                  required
                />
              </div>
              <div className="dashboardFormContent">
                <button type="submit">Save</button>
                <button
                  type="button" // Prevent accidental form submission
                  onClick={() => {
                    setIsUpdating(!isUpdating);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
      }
      {
        // Open or Zoom Images
        selectedImage && (
          <div
            className={`modal ${selectedImage ? "show" : ""}`}
            onClick={closeModal}
          >
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              {allSelectedImage.map((item) => (
                <img className="modalImages" src={item} />
              ))}
            </div>
          </div>
        )
      }
    </>
  );
};

export default Ordinances;
