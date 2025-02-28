import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Doughnut, Pie } from "react-chartjs-2";
interface HouseI {
  TotalInhabitants: string;
  count: string;
}
const AHouseholdInhabitants = () => {
  const [labels, setLabels] = useState<string[]>([]);

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:5000/api/chart/houseInhabitantsNumber"
      );
      const result = await response.json();

      setLabels(result.map((item: HouseI) => item.TotalInhabitants.toString()));
      setData(result.map((item: HouseI) => item.count));
    };
    fetchData();

    return () => {
      Object.values(Chart.instances).forEach((instance) => instance.destroy());
    };
  }, []);

  return (
    <div className="ChartContainer3">
      <div className="ChartContainerLabel">Household Inhabitants</div>
      <div className="PieContaner">
        <Doughnut
          data={{
            labels: labels,
            datasets: [
              {
                label: "Count",
                data: data,
                backgroundColor: [
                  "#2F27CE",
                  "#3A32E0",
                  "#433BFF",
                  "#6F65FF",
                  "#A59BFF",
                  "#C8B9FF",
                  "#E0D8FF",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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

export default AHouseholdInhabitants;
