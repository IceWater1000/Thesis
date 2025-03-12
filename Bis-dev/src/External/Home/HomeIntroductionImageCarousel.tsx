import React, { useEffect, useState } from "react";
import "./Home.css";
import "./HomeIntroductionImageCarousel.css";
import TextWithAnimation from "./TextWithAnimation";
import axios from "axios";
interface CarouselIAndL {
  Image: string;
  Label: string;
}
const HomeIntroductionImageCarousel = () => {
  const [CarouselImageAndLabel, SetCarouselImageAndLabel] = useState<
    CarouselIAndL[]
  >([]);
  const [currentActive, setCurrentActive] = useState(0);
  const [previouseActive, setPreviousActive] = useState(
    CarouselImageAndLabel.length - 1
  );
  const [nexActive, setNextActive] = useState(1);
  const [direction, setDirection] = useState("");
  //Data Collector
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/homeDashboard/getData"
        );
        setPreviousActive(response.data.IntroductionImageLabel.length - 1);
        SetCarouselImageAndLabel(response.data.IntroductionImageLabel);
      } catch (error) {
        console.log("Error on the Backend");
      }
    };
    FetchData();
  }, []);

  //for Automatic Scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("ToRight");
      setTimeout(() => {
        setPreviousActive(currentActive);
        setCurrentActive((prev) =>
          prev === CarouselImageAndLabel.length - 1 ? 0 : prev + 1
        );
        setNextActive((prev) =>
          prev === CarouselImageAndLabel.length - 1 ? 0 : prev + 1
        );
        setDirection("");
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentActive]); // Depend on the length, not the whole array

  // when previous Button is clicked
  const prevClick = () => {
    setDirection("ToLeft");
    setTimeout(() => {
      setPreviousActive(
        previouseActive === 0
          ? CarouselImageAndLabel.length - 1
          : previouseActive - 1
      );
      setCurrentActive(
        currentActive === 0
          ? CarouselImageAndLabel.length - 1
          : currentActive - 1
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
      setCurrentActive((prev) =>
        prev === CarouselImageAndLabel.length - 1 ? 0 : prev + 1
      );
      setNextActive((prev) =>
        prev === CarouselImageAndLabel.length - 1 ? 0 : prev + 1
      );
      setDirection("");
    }, 500);
  };

  return (
    <>
      <TextWithAnimation
        text={CarouselImageAndLabel[currentActive]?.Label || ""}
      />
      <div className="Carousel">
        <div className="prev" onClick={prevClick}>
          &#10094;
        </div>
        <div className={`CarouselContainer ${direction}`}>
          <img
            className="CarouselImage"
            src={CarouselImageAndLabel[previouseActive]?.Image || ""}
          />
          <img
            className="CarouselImage"
            src={CarouselImageAndLabel[currentActive]?.Image || ""}
          />
          <img
            className="CarouselImage"
            src={CarouselImageAndLabel[nexActive]?.Image || ""}
          />
        </div>
        <div className="next" onClick={nextClick}>
          &#10095;
        </div>
      </div>
    </>
  );
};

export default HomeIntroductionImageCarousel;
