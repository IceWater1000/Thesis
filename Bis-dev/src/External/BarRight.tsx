import React from "react";
interface Props {
  width: string;
  top: string;
}
const BarRight = ({ width, top }: Props) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: "36px",
        backgroundColor: "#2F27CE",
        position: "absolute",
        right: "0",
        top: `${top}px`,
        zIndex: 0,
      }}
    ></div>
  );
};

export default BarRight;
