import React, { useEffect, useState } from "react";
import "./dashboardContents.css";
import "./DashboardUI.css";
import axios from "axios";
import DashboardUICarouselAddform from "./DashboardUICarouselAddform";
interface Props {
  label: string;
  onItemClick: () => void;
}

interface Numbers {
  Number: string[];
  Name: string;
}

interface Carousel {
  Image: string;
  Label: string;
  ID: number;
}
const DashboardUI = ({ label, onItemClick }: Props) => {
  const [carouselImages, setCarouselImages] = useState<Carousel[]>([]);
  const [numbersLabelOriginal, setNumbersLabelOriginal] = useState<Numbers[]>(
    []
  );
  const [numbersLabel, setNumbersLabel] = useState<Numbers[]>([]);

  // for reloading Data

  const [reload, setReload] = useState(false);
  //for opening modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // item to delete
  const [itemToDelete, setItemToDelete] = useState(0);

  const [carouselImagesAddformClicked, setCarouselImagesAddformClicked] =
    useState(false);
  //Data Collector
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/homeDashboard/getData"
        );
        setCarouselImages(response.data.IntroductionImageLabel);
        setNumbersLabel(response.data.Numbers);
        setNumbersLabelOriginal(response.data.Numbers);
      } catch (error) {
        console.log("Error on the Backend");
      }
    };
    FetchData();
  }, [reload]);

  const carouselAddClickHandler = () => {
    setCarouselImagesAddformClicked((prev) => !prev);
  };
  // for deleting
  const onDelete = async (item: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/homeDashboard/delete/${item}`
      );
    } catch (error) {
      console.log(error);
    }
    setReload(!reload);
  };

  //for editing the Emergency Numbers
  const [isEdetingEmergency, setIsEdetingEmergency] = useState(false);

  const onEmergencyNumberChange = (
    type: number,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setNumbersLabel((prev) =>
      prev.map((item, i) =>
        i === type
          ? {
              ...item,
              Number: item.Number.map((num, j) => (j === index ? value : num)),
            }
          : item
      )
    );
  };

  const saveEmergencyNumbers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/homeDashboard/EditNumbers",
        { numbersLabel: numbersLabel }
      );
      console.log("ADDED", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEdetingEmergency(false);
      setReload(!reload);
    }
  };
  return (
    <>
      <div className="dashboardTab">
        <div className="dashboardTabTopBar">
          <div className="dashbaorTabTopBarLabel">{label.toUpperCase()}</div>

          <div
            style={{ marginLeft: "auto" }}
            className="CloseButton"
            onClick={() => {
              onItemClick();
              setIsEdetingEmergency(false);
            }}
          >
            <img
              className="dashbaordTabTopBarButton"
              src="/Images/White/cross.png"
            />
          </div>
        </div>
        <div className="dashboardTabMainContent">
          <div className="EmergencyNumbers">
            <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
              <div className="DashboardUIHead">EMERGENCY NUMBERS</div>
              {isEdetingEmergency ? (
                <>
                  <div className="EmergnecySave" onClick={saveEmergencyNumbers}>
                    Save
                  </div>
                </>
              ) : (
                ""
              )}
              <div
                className="CarouselAdd"
                onClick={() => {
                  setIsEdetingEmergency((prev) => !prev);
                  isEdetingEmergency
                    ? setNumbersLabel(numbersLabelOriginal)
                    : "";
                }}
              >
                {isEdetingEmergency ? "CANCEL EDITING" : "EDIT"}
              </div>
            </div>
            <div className="NumbersContainer">
              <div className="EmergencyNumberContainer">
                <div>Police</div>
                {isEdetingEmergency ? (
                  <>
                    <input
                      type="number"
                      className="DashboardUIInput"
                      value={numbersLabel[0]?.Number[0]}
                      onChange={(event) => {
                        onEmergencyNumberChange(0, 0, event);
                      }}
                    />
                    <input
                      type="number"
                      className="DashboardUIInput"
                      value={numbersLabel[0]?.Number[1]}
                      onChange={(event) => {
                        onEmergencyNumberChange(0, 1, event);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div>{numbersLabel[0]?.Number[0]}</div>
                    <div>{numbersLabel[0]?.Number[1]}</div>
                  </>
                )}
              </div>
              <div className="EmergencyNumberContainer">
                <div>Fire</div>
                {isEdetingEmergency ? (
                  <>
                    <input
                      type="number"
                      className="DashboardUIInput"
                      value={numbersLabel[1]?.Number[0]}
                      onChange={(event) => {
                        onEmergencyNumberChange(1, 0, event);
                      }}
                    />
                    <input
                      type="number"
                      className="DashboardUIInput"
                      value={numbersLabel[1]?.Number[1]}
                      onChange={(event) => {
                        onEmergencyNumberChange(1, 1, event);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div>{numbersLabel[1]?.Number[0]}</div>
                    <div>{numbersLabel[1]?.Number[1]}</div>
                  </>
                )}
              </div>
              <div className="EmergencyNumberContainer">
                <div>Oras Rescue</div>
                {isEdetingEmergency ? (
                  <>
                    <input
                      type="number"
                      className="DashboardUIInput"
                      value={numbersLabel[2]?.Number[0]}
                      onChange={(event) => {
                        onEmergencyNumberChange(2, 0, event);
                      }}
                    />
                    <input
                      type="number"
                      className="DashboardUIInput"
                      value={numbersLabel[2]?.Number[1]}
                      onChange={(event) => {
                        onEmergencyNumberChange(2, 1, event);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div>{numbersLabel[2]?.Number[0]}</div>
                    <div>{numbersLabel[2]?.Number[1]}</div>
                  </>
                )}
              </div>
              <div className="EmergencyNumberContainer">
                <div>RHU</div>
                {isEdetingEmergency ? (
                  <>
                    <input
                      type="number"
                      className="DashboardUIInput"
                      value={numbersLabel[3]?.Number[0]}
                      onChange={(event) => {
                        onEmergencyNumberChange(3, 0, event);
                      }}
                    />
                    <input
                      type="number"
                      className="DashboardUIInput"
                      value={numbersLabel[3]?.Number[1]}
                      onChange={(event) => {
                        onEmergencyNumberChange(3, 1, event);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div>{numbersLabel[3]?.Number[0]}</div>
                    <div>{numbersLabel[3]?.Number[1]}</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <hr className="BlueLine"></hr>
          <div className="CarouselImageTable">
            <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
              <div className="DashboardUIHead">CAROUSEL IMAGES</div>
              <div className="CarouselAdd" onClick={carouselAddClickHandler}>
                ADD
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Label</th>
                  <th>Image</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carouselImages.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.Label}</td>
                    <td>
                      <img
                        className="CarouselImageTableImage"
                        src={item.Image}
                      />
                    </td>
                    <td>
                      <div
                        className="delete"
                        onClick={() => {
                          setIsModalOpen((prev) => !prev);
                          setItemToDelete(item.ID);
                        }}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={`modal ${isModalOpen ? "show" : ""}`}>
          <div className="modal-content">
            <div className="modalMainText">Delete Data?</div>

            <hr className="solidLine"></hr>
            <div className="modalText">This can't be undone</div>
            <hr className="solidLine"></hr>
            <div className="modalButtonContainer">
              <button
                onClick={() => {
                  onDelete(itemToDelete!); // Confirm deletion
                  setIsModalOpen(false);
                }}
              >
                Yes
              </button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      {
        // for Adding Carousel Images

        carouselImagesAddformClicked ? (
          <>
            <div className="backdrop"></div>
            <DashboardUICarouselAddform
              onItemClick={() => {
                setCarouselImagesAddformClicked((prev) => !prev);
                setReload(!reload);
              }}
            />
          </>
        ) : (
          ""
        )
      }
    </>
  );
};

export default DashboardUI;
