import React from "react";

interface Props {
  name: string;
  source: string;
  isActive: string;
  onItemClick: (item: string) => void;
}
const NavBarButton = ({ name, source, isActive, onItemClick }: Props) => {
  return (
    <>
      <li
        className={isActive == name ? "ulContents active" : "ulContents"}
        onClick={() => {
          onItemClick(name);
        }}
      >
        <div className="navBLabel">{name}</div>
        <div>
          <img className="navBarImageLogo" src={source} />
        </div>
      </li>
    </>
  );
};

export default NavBarButton;
