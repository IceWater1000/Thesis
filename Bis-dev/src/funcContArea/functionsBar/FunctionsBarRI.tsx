import React from "react";
import "./FunctionsBar.css";
import "./FunctionsBarR-INavBar.css";
import FunctionsBarButton from "./FunctionsBarButton";
import FunctionsBarSearch from "./FunctionsBarSearch";

import { useState } from "react";

import AddForm1 from "./addForms/AddForm1";
import AddForm2 from "./addForms/AddForm2";
import AddForm3 from "./addForms/AddForm3";
import AddForm4 from "./addForms/AddForm4";
import AddForm5 from "./addForms/AddForm5";
import AddForm6 from "./addForms/AddForm6";
import FilterForms from "./filterForms/FilterForms";
import FilterForms2 from "./filterForms/FilterForms2";
import FilterForms3 from "./filterForms/FilterForms3";
import FilterForms4 from "./filterForms/FilterForms4";
import FilterForms5 from "./filterForms/FilterForms5";

interface Props {
  type: string;
  passItemName: string;
  passFilterItem: (item: object) => void;
  passSearchItem: (item: string) => void;
  closes: () => void;
}
const FunctionsBarRI = ({
  type,
  passFilterItem,
  passItemName,
  passSearchItem,
  closes,
}: Props) => {
  const handleFilterSave = (item: object) => {
    passFilterItem(item);
  };
  console.log(type);
  //let [reload, setReload] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  //handling Filter button form show
  const handleFilterClick = () => {
    setIsFiltering(!isFiltering);
  };
  const handleSearch = (item: string) => {
    passSearchItem(item);
  };
  //handling adding button form show
  const addFormClose = () => {
    setIsAdding(!isAdding);
    closes();
  };
  const handleAddClick = () => {
    setIsAdding(!isAdding);
    closes();
  };
  const determineFormToDisplay = () => {
    switch (passItemName) {
      case "Residents-Information":
        return <AddForm1 onItemClick={addFormClose} />;
      case "Household-Record":
        return <AddForm2 onItemClick={addFormClose} />;
      case "Household-Members":
        return <AddForm3 onItemClick={addFormClose} />;
      case "Senior-Citizens":
        return <AddForm4 onItemClick={addFormClose} />;
      case "KK-Members":
        return <AddForm5 onItemClick={addFormClose} />;
    }
  };
  const determineFilterToDisplay = () => {
    switch (passItemName) {
      case "Residents-Information":
        return (
          <FilterForms
            onFilterSave={handleFilterSave}
            onItemClick={handleFilterClick}
          />
        );

      case "Household-Record":
        return (
          <FilterForms2
            onFilterSave={handleFilterSave}
            onItemClick={handleFilterClick}
          />
        );

      case "Household-Members":
        return (
          <FilterForms3
            onFilterSave={handleFilterSave}
            onItemClick={handleFilterClick}
          />
        );

      case "Senior-Citizens":
        return (
          <FilterForms4
            onFilterSave={handleFilterSave}
            onItemClick={handleFilterClick}
          />
        );

      case "KK-Members":
        return (
          <FilterForms5
            onFilterSave={handleFilterSave}
            onItemClick={handleFilterClick}
          />
        );
    }
  };
  return (
    <div className="functionsBar first">
      <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
        {type == "official" ? (
          ""
        ) : (
          <div>
            <FunctionsBarButton label="Add" onItemClick={handleAddClick} />
          </div>
        )}

        <div>
          <FunctionsBarSearch label="Search" onItemClick={handleSearch} />
        </div>
        <div>
          <FunctionsBarButton label="Filter" onItemClick={handleFilterClick} />
        </div>
        <div>
          <FunctionsBarButton label="Print" onItemClick={handleFilterClick} />
        </div>
      </div>
      {
        //Shows UI for Adding and Filtering the Data
      }
      <div className={`offCanvas2 ${isFiltering ? "show2" : ""}`}>
        {determineFilterToDisplay()}
      </div>
      {isFiltering && <div className="backdrop2"></div>}

      <div className={`offCanvas ${isAdding ? "show" : ""}`}>
        {determineFormToDisplay()}
      </div>
      {isAdding && <div className="backdrop"></div>}
    </div>
  );
};

export default FunctionsBarRI;
