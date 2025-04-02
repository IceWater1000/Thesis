import React, { useEffect, useState } from "react";
import "./YearPicker.css";
import { useSelectAddformReload } from "../../utilities/SelectAdformDataReload";
interface Props {
  selectChange: (item: string) => void;
}

const YearPicker = ({ selectChange }: Props) => {
  const [years, setYears] = useState<string[]>([]);
  const currentYear = new Date().getFullYear();
  let yearSelector = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => currentYear - i
  );
  const { YearPickerReload } = useSelectAddformReload();
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    selectChange(value.toString());
  };
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/ordinances/availableYears"
        );
        const years = await response.json();
        setYears(years);
      } catch (error) {
        console.log(error);
      }
    };

    fetchYears();
  }, [YearPickerReload]);
  const isActiveYear = (item: number) => {
    return years.includes(item.toString());
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "10px",
      }}
    >
      <select
        defaultValue={currentYear}
        onChange={onSelectChange}
        className="yearPickerSelect"
      >
        {yearSelector.map((item, index) => (
          <option
            value={item}
            key={index}
            className={isActiveYear(item) ? "active" : "s"}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearPicker;
