import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
interface AgeRange {
  age_range: string;
  count: string;
}
const AAgeDistribution = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5000/api/chart/ageRange");
      const result = await response.json();
      setLabels(result.map((item: AgeRange) => item.age_range));
      setData(result.map((item: AgeRange) => item.count));
    };
    fetchProjects();

    return () => {
      Object.values(Chart.instances).forEach((instance) => instance.destroy());
    };
  }, []);
  return (
    <div className="ChartContainer3">
      <div className="ChartContainerLabel">Age Distribution</div>
      <div className="PieContainer">
        <Pie
          style={{ transform: "translateY(-10%)" }}
          data={{
            labels: labels,
            datasets: [
              {
                label: "Count",
                data: data,
                backgroundColor: ["#2F27CE", "#433BFF", "#6F65FF", "#A59BFF"],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: "left", // Moves the labels to the left side
                align: "center", // Aligns the labels vertically
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AAgeDistribution;
