import React from "react";
import "./functionsBar.css";
import { useState } from "react";
import FunctionsBarButton from "./FunctionsBarButton";

import AddForm6 from "./addForms/AddForm6";
import FunctionsBarSearch from "./FunctionsBarSearch";
interface Props {
  closes: () => void;
  passSearchItem: (item: string) => void;
}
const FunctionsBarLR = ({ closes, passSearchItem }: Props) => {
  const handleSearch = (item: string) => {
    passSearchItem(item);
  };
  const [isAdding, setIsAdding] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  //handling adding button form show
  const addFormClose = () => {
    setIsAdding(!isAdding);
  };
  const handleAddClick = () => {
    setIsAdding(!isAdding);
    //setReload(!reload);
  };
  return (
    <div className="functionsBar first">
      <div>
        <FunctionsBarButton label="Add" onItemClick={handleAddClick} />
      </div>
      <div>
        <FunctionsBarSearch label="Search" onItemClick={handleSearch} />
      </div>

      <div className={`offCanvas ${isAdding ? "show" : ""}`}>
        {<AddForm6 onItemClick={addFormClose} />}
      </div>
      {isAdding && <div className="backdrop"></div>}
    </div>
  );
};

export default FunctionsBarLR;
