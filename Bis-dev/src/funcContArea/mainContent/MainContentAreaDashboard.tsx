import React, { useState } from "react";
import "./contentArea.css";
import { useEffect } from "react";
import OfficialUpdateForm from "../dashboard/OfficialUpdateForm";
import BHWUpdateForm from "../dashboard/BHWUpdateForm";
import StaffUpdateForm from "../dashboard/StaffUpdateForm";
import TanodUpdateForm from "../dashboard/TanodUpdateForm";
import SKUpdateForm from "../dashboard/SKUpdateForm";
import BHWAddForm from "../dashboard/BHWAddForm";
import StaffAddForm from "../dashboard/StaffAddForm";
import TanodAddForm from "../dashboard/TanodAddForm";
import OfficialsAddForm from "../dashboard/OfficialsAddForm";
interface theData {
  id: string;
  name: string;
  position: string;
  other: string;
  image: string;
}
interface theData2 {
  id: string;
  name: string;
  other: string;
  image: string;
}
interface Officials {
  year: string;
  officials: theData[];
}

const MainContentAreaDashboard = () => {
  const [formDisplay, setFormDisplay] = useState(false);
  const [formToDisplay, setFormToDisplay] = useState("");
  const [activeID, setActiveID] = useState("");
  const [officialsData, setOfficialsData] = useState<theData[]>([]);
  const [data, setData] = useState<Officials[]>([{ year: "", officials: [] }]);
  const [data2, setData2] = useState<theData2[]>([]);
  const [data3, setData3] = useState<theData2[]>([]);
  const [data4, setData4] = useState<theData2[]>([]);
  const [data5, setData5] = useState<theData2[]>([]);
  const [reload, setReload] = useState(false);
  //Load JSON File Data Officials

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/personel1/view"
        );
        const datas = await response.json();
        setData(datas);

        //setData(datas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchProjects2 = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/personel2/view"
        );
        const datas = await response.json();
        setData2(datas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchProjects3 = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/personel3/view"
        );
        const datas = await response.json();
        setData3(datas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchProjects4 = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/personel4/view"
        );
        const datas = await response.json();
        setData4(datas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchProjects5 = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/personel5/view"
        );
        const datas = await response.json();

        setData5(datas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProjects5();
    fetchProjects4();
    fetchProjects3();
    fetchProjects2();
    fetchProjects();
  }, [reload]);
  console.log(data);
  //close form
  const closeForm = () => {
    setFormDisplay(!formDisplay);
    setReload(!reload);
  };
  //handle clicking edit button
  const editClickHandle = (item: string, clickedLocation: string) => {
    setActiveID(item);
    setFormDisplay(!formDisplay);
    setFormToDisplay(clickedLocation);
  };

  //for deleting the data
  const handleDelete2 = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/personel2/delete/${id}`
        );

        if (response.ok) {
          console.log(response);
          const updatedProjects = data2.filter((project) => project.id !== id);
          setData2(updatedProjects);
        } else {
          alert("Failed to delete the project.");
        }
        setReload(!reload);
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  const handleDelete3 = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/personel3/delete/${id}`
        );

        if (response.ok) {
          console.log(response);
          const updatedProjects = data2.filter((project) => project.id !== id);
          setData3(updatedProjects);
        } else {
          alert("Failed to delete the project.");
        }
        setReload(!reload);
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  const handleDelete4 = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/personel4/delete/${id}`
        );

        if (response.ok) {
          const updatedProjects = data2.filter((project) => project.id !== id);
          setData4(updatedProjects);
        } else {
          alert("Failed to delete the project.");
        }
        setReload(!reload);
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  const determineFormToDisplay = (item: string, asd: string) => {
    switch (item) {
      case "BOA":
        return (
          <>
            <OfficialsAddForm onItemClick={closeForm} />
          </>
        );
      case "BTA":
        return (
          <>
            <TanodAddForm onItemClick={closeForm} />
          </>
        );
      case "BSA":
        return (
          <>
            <StaffAddForm onItemClick={closeForm} />
          </>
        );
      case "BHWA":
        return (
          <>
            <BHWAddForm onItemClick={closeForm} />
          </>
        );
      case "BOU":
        return (
          <>
            <OfficialUpdateForm items={asd} onItemClick={closeForm} />
          </>
        );
      case "BHWU":
        return (
          <>
            <BHWUpdateForm items={asd} onItemClick={closeForm} />
          </>
        );
      case "BSU":
        return (
          <>
            <StaffUpdateForm items={asd} onItemClick={closeForm} />
          </>
        );
      case "BTU":
        return (
          <>
            <TanodUpdateForm items={asd} onItemClick={closeForm} />
          </>
        );
      case "SKU":
        return (
          <>
            <SKUpdateForm items={asd} onItemClick={closeForm} />
          </>
        );

      default:
        break;
    }
  };
  return (
    <>
      <div className="mains">
        {
          //main
        }
        <div className="BarangayPersonnel">
          <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
            <p className="PersonnelName">Barangay Officials</p>
            <p className="PersonnelName">{data[0].year}</p>
            <div
              className="adder"
              onClick={() => {
                editClickHandle("", "BOA");
              }}
            >
              <img
                className="dashbaordTabTopBarButton"
                src="/Images/White/add.png"
              />
            </div>
          </div>

          <hr></hr>
          <div className="BarangayPersonnelContainer">
            {data[0].officials.map((item) => (
              <>
                <div className="Person">
                  <div className="imgContainer">
                    <img src={item.image} />
                  </div>
                  <div className="Name">{item.name}</div>
                  <div className="Position">{item.position}</div>
                  <div className="Other">{item.other}</div>
                  <button
                    onClick={() => {
                      editClickHandle(item.id, "BOU");
                    }}
                  >
                    EDIT
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="BarangayPersonnel">
          <div className="headerss">
            <p className="PersonnelName">Barangay Health Workers</p>
            <div
              className="adder"
              onClick={() => {
                editClickHandle("", "BHWA");
              }}
            >
              <img
                className="dashbaordTabTopBarButton"
                src="/Images/White/add.png"
              />
            </div>
          </div>

          <hr></hr>
          <div className="BarangayPersonnelContainer">
            {data2.map((item) => (
              <>
                <div className="Person">
                  <div className="imgContainer">
                    <img src={item.image} />
                  </div>
                  <div className="Name">{item.name}</div>

                  <div className="Other">{item.other}</div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      style={{ width: "100%" }}
                      onClick={() => {
                        editClickHandle(item.id, "BHWU");
                      }}
                    >
                      EDIT
                    </button>
                    <button
                      style={{ width: "100%" }}
                      onClick={() => {
                        handleDelete2(item.id);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="BarangayPersonnel">
          <div className="headerss">
            <p className="PersonnelName">Barangay Staffs</p>
            <div
              className="adder"
              onClick={() => {
                editClickHandle("", "BSA");
              }}
            >
              <img
                className="dashbaordTabTopBarButton"
                src="/Images/White/add.png"
              />
            </div>
          </div>
          <hr></hr>
          <div className="BarangayPersonnelContainer">
            {data3.map((item) => (
              <>
                <div className="Person">
                  <div className="imgContainer">
                    <img src={item.image} />
                  </div>
                  <div className="Name">{item.name}</div>

                  <div className="Other">{item.other}</div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      style={{ width: "100%" }}
                      onClick={() => {
                        editClickHandle(item.id, "BSU");
                      }}
                    >
                      EDIT
                    </button>
                    <button
                      style={{ width: "100%" }}
                      onClick={() => {
                        handleDelete3(item.id);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="BarangayPersonnel">
          <div className="headerss">
            <p className="PersonnelName">Barangay Tanods</p>
            <div
              className="adder"
              onClick={() => {
                editClickHandle("", "BTA");
              }}
            >
              <img
                className="dashbaordTabTopBarButton"
                src="/Images/White/add.png"
              />
            </div>
          </div>
          <hr></hr>
          <div className="BarangayPersonnelContainer">
            {data4.map((item) => (
              <>
                <div className="Person">
                  <div className="imgContainer">
                    <img src={item.image} />
                  </div>
                  <div className="Name">{item.name}</div>

                  <div className="Other">{item.other}</div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      style={{ width: "100%" }}
                      onClick={() => {
                        editClickHandle(item.id, "BTU");
                      }}
                    >
                      EDIT
                    </button>
                    <button
                      style={{ width: "100%" }}
                      onClick={() => {
                        handleDelete4(item.id);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="BarangayPersonnel">
          <p className="PersonnelName">SK Officials</p>
          <hr></hr>
          <div className="BarangayPersonnelContainer">
            {data5.map((item) => (
              <>
                <div className="Person">
                  <div className="imgContainer">
                    <img src={item.image} />
                  </div>
                  <div className="Name">{item.name}</div>

                  <div className="Other">{item.other}</div>
                  <button
                    onClick={() => {
                      editClickHandle(item.id, "SKU");
                    }}
                  >
                    EDIT
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
        {/*
          <>
          
          
        
        
          </>
       */}
      </div>
      <div className={`PersonnelAddform ${formDisplay ? "show" : ""}`}>
        {determineFormToDisplay(formToDisplay, activeID)}
      </div>
    </>
  );
};

export default MainContentAreaDashboard;
