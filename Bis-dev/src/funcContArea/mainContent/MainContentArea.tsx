import React from "react";

import { Outlet } from "react-router-dom";

interface Props {
  name: object;
  itemValue: string;
}
const MainContenArea = ({ name, itemValue }: Props) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ height: "100%" }}>
          <Outlet context={{ activeState: itemValue, asdef: name }} />
        </div>
      </div>
    </>
  );
};

export default MainContenArea;
