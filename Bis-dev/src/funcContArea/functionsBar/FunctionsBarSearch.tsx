import React, { useEffect, useState } from "react";

interface Props {
  label: string;
  onItemClick: (item: string) => void;
}
const FunctionsBarSearch = ({ label, onItemClick }: Props) => {
  const [data, setData] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData(value);
  };
  useEffect(() => {
    onItemClick(data);
  }, [data]);
  return (
    <>
      <input
        className="functionsBarSearch"
        type="text"
        id="searchInput"
        placeholder={label + "..."}
        value={data}
        itemID="ResidentInformationSearchButton"
        onChange={handleChange}
      />
    </>
  );
};

export default FunctionsBarSearch;
