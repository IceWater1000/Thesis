import React, { useRef, useState } from "react";
import { switchState, switchStateBack } from "./SideBarButtonImageSetter.tsx";
interface Props {
  image: string;
  label: string;
  onItemClick: (item: string) => void;
  currentActive: string;
}

const SideBarButton = ({ image, label, onItemClick, currentActive }: Props) => {
  // changing image for hovering
  const onButtonHover = (
    clsName: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const img = e.currentTarget.querySelector(
      ".sideBarButtonLogoImage"
    ) as HTMLImageElement;

    switchState(img, label);
  };
  // changing image for unhovering
  const onButtonHoverLeave = (
    clsName: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const img = e.currentTarget.querySelector(
      ".sideBarButtonLogoImage"
    ) as HTMLImageElement;

    switchStateBack(clsName, img, label);
  };

  return (
    <>
      <div
        className={
          currentActive == label ? "sideBarButton active" : "sideBarButton"
        }
        id={label}
        key={label}
        onClick={() => {
          onItemClick(label);
        }}
        onMouseOver={(e) => {
          onButtonHover(e.currentTarget.className, e);
        }}
        onMouseLeave={(e) => {
          onButtonHoverLeave(e.currentTarget.className, e);
        }}
      >
        <div className="buttonContainer">
          <div className="sideBarButtonLogo">
            <img src={image} className="sideBarButtonLogoImage" />
          </div>
          <div className="sideBarButtonLabel">
            <p>{label}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarButton;
