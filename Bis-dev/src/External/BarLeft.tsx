import React from "react";
interface Props {
  width: string;
  top: string;
}
const BarLeft = ({ width, top }: Props) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: "36px",
        backgroundColor: "#2F27CE",
        position: "absolute",
        left: "0",
        top: `${top}px`,
        zIndex: 0,
      }}
    ></div>
  );
};

export default BarLeft;
