import React, { useEffect, useState } from "react";
import "./Ordinaces.css";
import OrdinancesBox from "./OrdinancesBox";
interface Ordinances {
  id: string;
  title: string;
  description: string;
  image: string[];
}

const OrdinancesContainer = () => {
  const [ordinancesData, setOrdinancesData] = useState<Ordinances[]>([
    { id: "", title: "", description: "", image: [""] },
  ]);
  useEffect(() => {
    const fetchOrdinances = async () => {
      const response = await fetch(
        "http://localhost:5000/api/ordinances/projects"
      );
      const data = await response.json();
      setOrdinancesData(data);
    };

    fetchOrdinances();
  }, []);

  return (
    <div className="ordinancesContainer">
      {ordinancesData.map((item, index) => (
        <OrdinancesBox
          title={item.title}
          description={item.description}
          id={item.id}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default OrdinancesContainer;
