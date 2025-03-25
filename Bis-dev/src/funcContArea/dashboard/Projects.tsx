import React, { useEffect, useState } from "react";
import "./dashboardContents.css";

import axios from "axios";
import Select, { SingleValue } from "react-select";
interface Props {
  label: string;
  onItemClick: () => void;
}
interface Project {
  id: string;
  title: string;
  uploader: string;
  description: string;
  image: string;
}
interface OptionType {
  value: string;
  label: string;
}

const Projects = ({ label, onItemClick }: Props) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedImage, setSelectedImage] = useState(false);
  const [allSelectedImage, setAllSelectedImage] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdating2, setIsupdating2] = useState(false);
  const [title, setTitle] = useState("");
  const [uploader, setUploader] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>([]);
  const [updatingValue, setUpdatingValue] = useState<Project>({
    id: "",
    title: "",
    uploader: "",
    description: "",
    image: "",
  });
  //Load JSON File Data
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/dashboard/projects"
      );
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, [projects]);
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
  const handleUpdate2 = async (item: string) => {
    const response = await fetch(
      `http://localhost:5000/api/dashboard/specific/${item}`
    );
    const data = await response.json();
    setUpdatingValue(data);
    setIsupdating2(!isUpdating);
  };
  //for deleting the data
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/dashboard/delete/${id}`
        );

        if (response.ok) {
          console.log(response);
          const updatedProjects = projects.filter(
            (project) => project.id !== id
          );
          setProjects(updatedProjects);
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
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!title || !description || !image || !uploader) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("uploader", uploader);
    formData.append("date", formattedDate);
    formData.append("description", description);
    image.forEach((file: any) => {
      formData.append("projectImage", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/dashboard/upload",
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
  };
  //update submit
  const handleSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/dashboard/update`,
        updatingValue
      );

      // Optionally, reset the form or update the UI
    } catch (error: any) {}
    setIsupdating2(!isUpdating2);
  };
  //for adding
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const handleReactSelectChange = (option: SingleValue<OptionType>) => {
    const value = option?.value || "";
    setUploader(value);
  };

  //for updating
  const handleDescriptionChange2 = (e: any) => {
    setUpdatingValue({
      ...updatingValue,
      description: e.target.value,
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
  const handleReactSelectChangeUpdate = (option: SingleValue<OptionType>) => {
    const value = option?.value || "";
    setUpdatingValue({
      ...updatingValue,
      uploader: value,
    });
  };

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/personel1/view"
        );
        console.log(response);

        const transformResponse: OptionType[] = response.data[0].officials.map(
          (officalsInfo: any) => ({
            value: officalsInfo.name,
            label: officalsInfo.name,
          })
        );
        setOptions(transformResponse);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchResidents();
  }, [Projects]);
  return (
    <>
      <div className="dashboardTab">
        <div className="dashboardTabTopBar">
          <div className="dashbaorTabTopBarLabel">{label.toUpperCase()}</div>
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
          {projects.map((project, index) => (
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
          ))}
        </div>
      </div>
      {
        // for updating
        isUpdating2 && (
          <div className={`dashboardForm ${isUpdating2 ? "show" : ""}`}>
            <form className="dashboardFormContents" onSubmit={handleSubmit2}>
              <div className="dashboardAddformTitle">PROJECT UPDATEFROM</div>
              <hr className="BlueLine" style={{ marginTop: "0" }}></hr>
              <div className="dashboardFormContent">
                <label className="labels">Project Title</label>
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
                <label className="labels">Uploader</label>
                <Select
                  options={options}
                  name="uploader"
                  id="uploader"
                  value={options.find(
                    (option) => option.value === updatingValue.uploader
                  )}
                  onChange={handleReactSelectChangeUpdate}
                  className="dashboardInputButton"
                  required
                />
              </div>
              <div className="dashboardFormContent">
                <label className="labels">Project Description</label>
                <textarea
                  className="dashboardTextAreaButton"
                  name="projectDescription"
                  id="projectDescription"
                  value={updatingValue.description}
                  onChange={handleDescriptionChange2}
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
              <div className="dashboardAddformTitle">PROJECT ADDFORM</div>
              <hr className="BlueLine" style={{ marginTop: "0" }}></hr>
              <div className="dashboardFormContent">
                <label className="labels">Project Title</label>
                <input
                  className="dashboardInputButton"
                  type="text"
                  name="projectTitle"
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className="dashboardFormContent">
                <label className="labels">Uploader</label>
                <Select
                  options={options}
                  name="uploader"
                  id="uploader"
                  onChange={handleReactSelectChange}
                  className="dashboardSelectButton"
                  required
                />
              </div>

              <div className="dashboardFormContent">
                <label className="labels">Project Description</label>
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

export default Projects;
