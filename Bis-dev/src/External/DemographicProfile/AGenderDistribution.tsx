import React, { useEffect, useState } from "react";
import "./DemographicProfile.css";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
interface Sex {
  sex: string;
  count: string;
}
const AGenderDistribution = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  //query the Data
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5000/api/chart/getSex");
      const result = await response.json();

      setLabels(result.map((item: Sex) => item.sex));
      setData(result.map((item: Sex) => item.count));
    };

    fetchProjects();
    return () => {
      Object.values(Chart.instances).forEach((instance) => instance.destroy());
    };
  }, []);

  return (
    <div className="ChartContainer1">
      <div className="ChartContainerLabel">Gender Distribution</div>
      <div className="PieContaner">
        <Pie
          data={{
            labels: labels,
            datasets: [
              {
                label: "Count",
                data: data,
                backgroundColor: ["#2F27CE", "#7A6AFF"],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "left",
                align: "center",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AGenderDistribution;
