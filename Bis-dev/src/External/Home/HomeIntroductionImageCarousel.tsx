import React, { useEffect, useState } from "react";
import "./Home.css";
import "./HomeIntroductionImageCarousel.css";
import TextWithAnimation from "./TextWithAnimation";
import axios from "axios";
const HomeIntroductionImageCarousel = () => {
  const CarouselImages = [
    "/Images/loginBackground2.jpg",
    "/Images/download1.jpg",
    "/Images/download2.jpg",
    "/Images/download3.jpg",
    "/Images/download4.jpg",
  ];
  const CarouselImagesLabel = [
    "Barangay Hall",
    "Chruch Plaza",
    "Zone 1",
    "Gymnasium",
    "Zone 2",
  ];

  //Data Collector
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/homeDashboard/getData"
        );
        console.log(response);
      } catch (error) {
        console.log("Error on the Backend");
      }
    };
    FetchData();
  }, []);
  const [currentActive, setCurrentActive] = useState(0);
  const [previouseActive, setPreviousActive] = useState(
    CarouselImages.length - 1
  );
  const [nexActive, setNextActive] = useState(1);
  const [direction, setDirection] = useState("");

  //for Automatic Scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("ToRight");
      setTimeout(() => {
        setPreviousActive(currentActive);
        setCurrentActive(
          currentActive === CarouselImages.length - 1 ? 0 : currentActive + 1
        );
        setNextActive(
          nexActive === CarouselImages.length - 1 ? 0 : nexActive + 1
        );
        setDirection("");
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [CarouselImages]);

  // when previous Button is clicked
  const prevClick = () => {
    setDirection("ToLeft");
    setTimeout(() => {
      setPreviousActive(
        previouseActive === 0 ? CarouselImages.length - 1 : previouseActive - 1
      );
      setCurrentActive(
        currentActive === 0 ? CarouselImages.length - 1 : currentActive - 1
      );

      setNextActive(currentActive);
      setDirection("");
    }, 500);
  };

  // when next button is clicked
  const nextClick = () => {
    setDirection("ToRight");
    setTimeout(() => {
      setPreviousActive(currentActive);
      setCurrentActive(
        currentActive === CarouselImages.length - 1 ? 0 : currentActive + 1
      );
      setNextActive(
        nexActive === CarouselImages.length - 1 ? 0 : nexActive + 1
      );
      setDirection("");
    }, 500);
  };
  return (
    <>
      <TextWithAnimation text={CarouselImagesLabel[currentActive]} />
      <div className="Carousel">
        <div className="prev" onClick={prevClick}>
          &#10094;
        </div>
        <div className={`CarouselContainer ${direction}`}>
          <img
            className="CarouselImage"
            src={CarouselImages[previouseActive]}
          />
          <img className="CarouselImage" src={CarouselImages[currentActive]} />
          <img className="CarouselImage" src={CarouselImages[nexActive]} />
        </div>
        <div className="next" onClick={nextClick}>
          &#10095;
        </div>
      </div>
    </>
  );
};

export default HomeIntroductionImageCarousel;
