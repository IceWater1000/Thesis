import React, { useEffect, useState } from "react";
import "./Ordinaces.css";
import OrdinancesBox from "./OrdinancesBox";
import OrdinancesYearContainer from "./OrdinancesYearContainer";
interface Ordinances {
  id: string;
  ordinanceNumber: string;
  title: string;
  description: string;
  image: string[];
}
interface YearOrdinaces {
  year: string;
  ordinances: Ordinances[];
}

const OrdinancesContainer = () => {
  const [ordinancesData, setOrdinancesData] = useState<YearOrdinaces[]>([]);
  const [currentSelectedYear, setCurrentSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [currentYearProjects, setCurrentYearProjects] = useState<Ordinances[]>(
    []
  );
  useEffect(() => {
    const fetchOrdinances = async () => {
      const response = await fetch(
        "http://localhost:5000/api/ordinances/projects"
      );
      const data = await response.json();
      setOrdinancesData(data);
      setCurrentYearProjects(
        data
          .find((item: YearOrdinaces) => item.year == currentSelectedYear)
          ?.ordinances.reverse() || []
      );
    };

    fetchOrdinances();
  }, []);
  useEffect(() => {
    setCurrentYearProjects(
      ordinancesData
        .find((item: YearOrdinaces) => item.year == currentSelectedYear)
        ?.ordinances.reverse() || []
    );
  }, [currentSelectedYear]);
  const changeYear = (item: string) => {
    setCurrentSelectedYear(item);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "25px" }}>
      <div className="ordinancesContainer">
        {currentYearProjects.map((item, index) => (
          <OrdinancesBox
            year={currentSelectedYear}
            ordinanceNumber={item.ordinanceNumber}
            title={item.title}
            description={item.description}
            id={item.id}
            image={item.image}
          />
        ))}
      </div>
      <OrdinancesYearContainer
        changeActiveYear={changeYear}
        currentSelectedYear={currentSelectedYear}
      />
    </div>
  );
};

export default OrdinancesContainer;
