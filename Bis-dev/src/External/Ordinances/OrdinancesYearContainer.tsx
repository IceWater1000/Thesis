import React, { useEffect, useState } from "react";
interface props {
  currentSelectedYear: string;
  changeActiveYear: (item: string) => void;
}
const OrdinancesYearContainer = ({
  currentSelectedYear,
  changeActiveYear,
}: props) => {
  const [years, setYears] = useState<string[]>([]);
  const [activeYear, setActiveYear] = useState(currentSelectedYear);
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
  }, []);
  const onYearButtonClick = (item: string) => {
    setActiveYear(item);
    changeActiveYear(item);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "24px 0px 0px 0px",
        height: "100%",
      }}
    >
      <div className="yearLogo">YEAR</div>
      <div className="yearContainer">
        {years.map((item) => (
          <div
            key={item}
            className={`yearButton ${activeYear == item ? "active" : ""}`}
            onClick={() => {
              onYearButtonClick(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdinancesYearContainer;
