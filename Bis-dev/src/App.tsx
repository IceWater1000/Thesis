import { Link } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import ProjectsHome from "./ProjectsHome";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart } from "chart.js";
import "chart.js/auto";
import { useRef } from "react";
import axios from "axios";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
interface theData {
  id: string;
  name: string;
  position: string;
  other: string;
  image: string;
}
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}
interface Sex {
  sex: string;
  count: string;
}
interface AgeRange {
  age_range: string;
  count: string;
}
interface CiviStatus {
  CivilStatus: string;
  count: string;
}
interface HouseI {
  TotalInhabitants: string;
  count: string;
}
interface GenderData {
  labels: string[];
  datasets: { label: string; data: string[]; backgroundColor: string[] }[];
}

function App() {
  const { isLoggedIN } = useAuth();
  const navigate = useNavigate();
  if (isLoggedIN) {
    navigate("/internal");
  }
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openPaoCanvas, setOpenPaoCanvas] = useState(false);
  const [paoCanvas, setPaoCanvas] = useState("");
  const [sAPILink, setsAPILink] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [projects2, setProjects2] = useState<Project[]>([]);
  const [theTarget, setTheTarget] = useState("");
  const handleLoginClick = (item: object) => {
    console.log(item);

    setOpenLoginForm(!openLoginForm);
  };
  const handlePaoClick = (item: string) => {
    setOpenPaoCanvas(!openPaoCanvas);
    setPaoCanvas(item);
  };
  const determinePAOToDisplay = (item: string, targets: string) => {
    switch (item) {
      case "Projects":
        return (
          <>
            <ProjectsHome
              target={targets}
              label={item}
              onItemClick={() => {
                handlePaoClick("");
              }}
            />
          </>
        );
      case "Announcements":
        return (
          <>
            <ProjectsHome
              target={targets}
              label={item}
              onItemClick={() => {
                handlePaoClick("");
              }}
            />
          </>
        );
      case "Ordinances":
        return (
          <>
            <ProjectsHome
              target={targets}
              label={item}
              onItemClick={() => {
                handlePaoClick("");
              }}
            />
          </>
        );
    }
  };
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/Announcements/projects"
      );
      const data = await response.json();
      console.log(data);
      setProjects(data);
    };

    fetchProjects();
  }, [App]);

  //for the image slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true); // Trigger slide-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length); // Update image
        setIsSliding(false); // Reset sliding state
      }, 750); // Match animation duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [projects.length]);
  const currentItem = projects[currentIndex];

  //<Link to="/internal"> Click Here</Link>
  //for the text under the imageslider
  const [paoIsActive1, setPaoIsActive1] = useState(false);
  const [paoIsActive2, setPaoIsActive2] = useState(false);
  const [paoIsActive3, setPaoIsActive3] = useState(false);
  const [activePAO, setActivePAO] = useState("");

  //for piechartData
  const ref = useRef();
  const [pieKey, setPieKey] = useState(0);
  const [labels1, setLabels1] = useState([]);
  const [data1, setData1] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5000/api/chart/getSex");
      const data = await response.json();

      setLabels1(data.map((item: Sex) => item.sex));
      setData1(data.map((item: Sex) => item.count));
      setPieKey((prevKey) => prevKey + 1);
    };

    fetchProjects();
  }, []);
  //end PiechartData
  //for PiechartData AgeRange
  const [pieKey2, setPieKey2] = useState(0);
  const [labels2, setLabels2] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5000/api/chart/ageRange");
      const data = await response.json();
      console.log(data);
      setLabels2(data.map((item: AgeRange) => item.age_range));
      setData2(data.map((item: AgeRange) => item.count));
      setPieKey2((prevKey) => prevKey + 1);
    };

    fetchProjects();
  }, []);
  //edd for piechartData AgeRange
  //for Civil Status Data
  const [pieKey3, setPieKey3] = useState(0);
  const [labels3, setLabels3] = useState([]);
  const [data3, setData3] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/chart/civilStatus"
      );
      const data = await response.json();
      console.log(data);
      setLabels3(data.map((item: CiviStatus) => item.CivilStatus));
      setData3(data.map((item: CiviStatus) => item.count));
      setPieKey3((prevKey) => prevKey + 1);
    };

    fetchProjects();
  }, []);
  //edd for Civil Status data
  //for Civil Status Data
  const [pieKey4, setPieKey4] = useState(0);
  const [labels4, setLabels4] = useState([]);
  const [data4, setData4] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/chart/houseInhabitantsNumber"
      );
      const data = await response.json();
      console.log(data);
      setLabels4(data.map((item: HouseI) => item.TotalInhabitants.toString()));
      setData4(data.map((item: HouseI) => item.count));
      setPieKey4((prevKey) => prevKey + 1);
    };

    fetchProjects();
  }, []);
  //edd for Civil Status data
  const onMouseOver = (item: string) => {
    switch (item) {
      case "Projects":
        setPaoIsActive1(!paoIsActive1);
        setActivePAO("Projects");
        setsAPILink("http://localhost:5000/api/dashboard/projects");
        break;
      case "Announcements":
        setPaoIsActive2(!paoIsActive2);
        setActivePAO("Announcements");
        setsAPILink("http://localhost:5000/api/Announcements/projects");
        break;
      case "Ordinances":
        setPaoIsActive3(!paoIsActive3);
        setActivePAO("Ordinances");
        setsAPILink("http://localhost:5000/api/ordinances/projects");
        break;
    }
  };
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(sAPILink);
      const datas = await response.json();
      setProjects2(datas);
    };

    fetchProjects();
  }, [sAPILink]);
  //for displaying offcials and stafff
  const [data, setData] = useState<theData[]>([]);
  const [per2, setPer2] = useState<theData[]>([]);
  const [per3, setPer3] = useState<theData[]>([]);
  const [per4, setPer4] = useState<theData[]>([]);
  const [per5, setPer5] = useState<theData[]>([]);
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/personel1/view");
      const datas = await response.json();
      setData(datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchProjects2 = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/personel2/view");
      const datas = await response.json();
      setPer2(datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchProjects3 = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/personel3/view");
      const datas = await response.json();
      setPer3(datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchProjects4 = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/personel4/view");
      const datas = await response.json();
      setPer4(datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchProjects5 = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/personel5/view");
      const datas = await response.json();

      setPer5(datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchProjects5();
    fetchProjects4();
    fetchProjects3();
    fetchProjects2();
    fetchProjects();
  }, []);
  return (
    <>
      <div className="hsjs">
        <div className="loginBackground">
          <div className="leftSide">
            <div className="loginBarangayLogo">
              <img
                style={{ width: "150px", height: "150px" }}
                src="/Images/asd2.png"
              />
              <div className="logoBarangayTitleContainer">
                <p className="loginBarangayTitle1" style={{ margin: "0" }}>
                  OFFICIAL WEBSITE OF
                </p>
                <p className="loginBarangayTitle2" style={{ margin: "0" }}>
                  BARANGAY BUTNGA
                </p>
              </div>
            </div>
            <div className="loginButton" onClick={handleLoginClick}>
              LOG IN
            </div>
            <div className="projectAnnouncementsOrdinances">
              <div className="imageSlider">
                {projects.map((item, index) => (
                  <>
                    <img
                      key={item.id}
                      className={`imageSliderImages ${
                        index === currentIndex
                          ? isSliding
                            ? "active slide-in-right"
                            : "active"
                          : index ===
                            (currentIndex - 1 + projects.length) %
                              projects.length
                          ? "slide-out-left"
                          : ""
                      }`}
                      src={item.image[0]}
                      alt={item.title}
                      onClick={() => {
                        handlePaoClick("Announcements");
                        setTheTarget(`target-${index}`);
                      }}
                    />
                    <p
                      className={`imageSliderImages text ${
                        index === currentIndex
                          ? isSliding
                            ? "active slide-in-right"
                            : "active"
                          : index ===
                            (currentIndex - 1 + projects.length) %
                              projects.length
                          ? "slide-out-left"
                          : ""
                      }`}
                      style={{ zIndex: "100" }}
                    >
                      {" "}
                      {item.title.toUpperCase()}
                    </p>
                  </>
                ))}
              </div>
              <div className="pAOButtons">
                <div
                  className={`pAOButton ${
                    activePAO == "Projects" ? "active" : ""
                  }`}
                  onClick={() => {
                    handlePaoClick("Projects");
                    setTheTarget("target-0");
                  }}
                  onMouseEnter={() => {
                    onMouseOver("Projects");
                  }}
                >
                  Projects
                </div>
                <div
                  className={`pAOButton ${
                    activePAO == "Announcements" ? "active" : ""
                  }`}
                  onClick={() => {
                    handlePaoClick("Announcements");
                    setTheTarget("target-0");
                  }}
                  onMouseEnter={() => {
                    onMouseOver("Announcements");
                  }}
                >
                  Announcements
                </div>
                <div
                  className={`pAOButton ${
                    activePAO == "Ordinances" ? "active" : ""
                  }`}
                  onClick={() => {
                    handlePaoClick("Ordinances");
                    setTheTarget("target-0");
                  }}
                  onMouseEnter={() => {
                    onMouseOver("Ordinances");
                  }}
                >
                  Ordinances
                </div>
              </div>
              <center>
                <hr
                  style={{
                    border: "#fbfbfe solid 1px",
                    margin: "0",
                    width: "90%",
                  }}
                ></hr>
              </center>

              <div className="pAOContents">
                {projects2.map((item, index) => (
                  <div
                    className="pAOText"
                    onClick={() => {
                      handlePaoClick(activePAO);
                      setTheTarget(`target-${index}`);
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rightSide">
            <div className="MainBox">
              <div className="Description">
                <p>
                  <strong>Barangay Butnga</strong> is one of the smallest
                  barangays in Oras, Eastern Samar, located at the heart of the
                  town's poblacion. Recognized as one of the most peaceful and
                  cleanest barangays in the municipality, it is home to a
                  close-knit community with a total population of #.
                </p>
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  margin: "0",
                  fontSize: "20pt",
                }}
              >
                BARANGAY DEMOGRAPHIC PROFILE
              </p>
              <div className="DemoGraphics">
                <div className="firstRow">
                  <div className="chartContainer">
                    <p className="chartTitle">Sex Distribution</p>
                    <div className="pie">
                      <Pie
                        ref={ref}
                        data={{
                          labels: labels1,
                          datasets: [
                            {
                              label: "Count",
                              data: data1,
                              backgroundColor: ["#2F27CE", "#7A6AFF"],
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: "left", // Moves the labels to the left side
                              align: "center", // Aligns the labels vertically
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="chartContainer">
                    <p className="chartTitle">Age Distribution</p>
                    <div className="pie">
                      <Pie
                        ref={ref}
                        data={{
                          labels: labels2,
                          datasets: [
                            {
                              label: "Count",
                              data: data2,
                              backgroundColor: [
                                "#2F27CE",
                                "#433BFF",
                                "#6F65FF",
                                "#A59BFF",
                              ],
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: "left", // Moves the labels to the left side
                              align: "center", // Aligns the labels vertically
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="firstRow">
                  <div className="chartContainer">
                    <p className="chartTitle">Civil Status</p>
                    <div className="pie">
                      <Bar
                        ref={ref}
                        data={{
                          labels: labels3,
                          datasets: [
                            {
                              label: "Count",
                              data: data3,

                              backgroundColor: [
                                "#2F27CE",
                                "#3A32E0",
                                "#433BFF",
                                "#6F65FF",
                                "#A59BFF",
                                "#C8B9FF",
                                "#E0D8FF",
                              ],
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false, // Allows the chart to fill the parent container
                        }}
                      />
                    </div>
                  </div>
                  <div className="chartContainer">
                    <p className="chartTitle">Household Inhabitants</p>
                    <div className="pie">
                      <Doughnut
                        ref={ref}
                        data={{
                          labels: labels4,
                          datasets: [
                            {
                              label: "Count",
                              data: data4,
                              backgroundColor: [
                                "#2F27CE",
                                "#3A32E0",
                                "#433BFF",
                                "#6F65FF",
                                "#A59BFF",
                                "#C8B9FF",
                                "#E0D8FF",
                              ],
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: "left", // Moves the labels to the left side
                              align: "center", // Aligns the labels vertically
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  margin: "0",
                  fontSize: "20pt",
                }}
              >
                BARANGAY OFFICIALS
              </p>
              <div className="Personel">
                <div className="officialsContainer">
                  {data.map((item, index) => (
                    <div key={index} className="Official">
                      <img width={150} height={150} src={item.image} />
                      <p className="nameofOfficial">{item.name}</p>
                      <p className="position">{item.position}</p>
                      <p className="other">{item.other}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  margin: "0",
                  fontSize: "20pt",
                }}
              >
                BARANGAY HEALTH WORKERS
              </p>

              <div className="Personel">
                <div className="officialsContainer">
                  {per2.map((item, index) => (
                    <div key={index} className="Official">
                      <img width={150} height={150} src={item.image} />
                      <p className="nameofOfficial">{item.name}</p>
                      <p className="position">{item.position}</p>
                      <p className="other">{item.other}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  margin: "0",
                  fontSize: "20pt",
                }}
              >
                BARANGAY STAFFS
              </p>

              <div className="Personel">
                <div className="officialsContainer">
                  {per3.map((item, index) => (
                    <div key={index} className="Official">
                      <img width={150} height={150} src={item.image} />
                      <p className="nameofOfficial">{item.name}</p>
                      <p className="position">{item.position}</p>
                      <p className="other">{item.other}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  margin: "0",
                  fontSize: "20pt",
                }}
              >
                BARANGAY TANODS
              </p>
              <div className="Personel">
                <div className="officialsContainer">
                  {per4.map((item, index) => (
                    <div key={index} className="Official">
                      <img width={150} height={150} src={item.image} />
                      <p className="nameofOfficial">{item.name}</p>
                      <p className="position">{item.position}</p>
                      <p className="other">{item.other}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  margin: "0",
                  fontSize: "20pt",
                }}
              >
                SK OFFICIALS
              </p>
              <div className="Personel">
                <div className="officialsContainer">
                  {per5.map((item, index) => (
                    <div key={index} className="Official">
                      <img width={150} height={150} src={item.image} />
                      <p className="nameofOfficial">{item.name}</p>
                      <p className="position">{item.position}</p>
                      <p className="other">{item.other}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  margin: "0",
                  fontSize: "20pt",
                }}
              >
                BARANGAY MAP
              </p>
              <div className="Personel">
                <div className="officialsContainer">
                  <img src="/Images/Map.png" width={900} height={500} />
                </div>
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  margin: "0",
                  fontSize: "20pt",
                }}
              >
                CONTACTS AND SERVICES OFFERED
              </p>
              <div className="Personel">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>
                    <p style={{ color: "white" }}>+091232231123</p>
                    <p style={{ color: "white" }}>+091247198832</p>
                    <p style={{ color: "white" }}>+090977212331</p>
                    <p style={{ color: "white" }}>+08381236822</p>
                  </div>
                  <div>
                    <p style={{ color: "white" }}>brgy.Butnga@gmail.com</p>
                    <p style={{ color: "white" }}>Butnga01@gmail.com</p>
                    <p style={{ color: "white" }}>SideButnga@gmail.com</p>
                    <p style={{ color: "white" }}>ButngaOras@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`projectAnnouncementsOrdinancesCanvas ${
          openPaoCanvas ? "show" : ""
        }`}
      >
        {determinePAOToDisplay(paoCanvas, theTarget)}
      </div>
      {openPaoCanvas && <div className="backdrops"></div>}
      <div className={`LoginFormCanvas ${openLoginForm ? "show" : ""}`}>
        <Login isLogsIn={() => {}} onItemClick={handleLoginClick} />
      </div>
      {openLoginForm && <div className="backdrops"></div>}
    </>
  );
}

export default App;
