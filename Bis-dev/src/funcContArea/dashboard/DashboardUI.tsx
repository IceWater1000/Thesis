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
      } catch (error) {
        console.log("Error on the Backend");
      }
    };
    FetchData();
  }, [reload]);

  const carouselAddClickHandler = () => {
    setCarouselImagesAddformClicked((prev) => !prev);
  };
  // for deteling
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
            }}
          >
            <img
              className="dashbaordTabTopBarButton"
              src="/Images/White/cross.png"
            />
          </div>
        </div>
        <div className="dashboardTabMainContent">
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
