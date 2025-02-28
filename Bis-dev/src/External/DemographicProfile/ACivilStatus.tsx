import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

interface CiviStatus {
  CivilStatus: string;
  count: string;
}

const ACivilStatus = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/chart/civilStatus"
      );
      const result = await response.json();

      setLabels(result.map((item: CiviStatus) => item.CivilStatus));
      setData(result.map((item: CiviStatus) => item.count));
    };

    fetchProjects();
    return () => {
      Object.values(Chart.instances).forEach((instance) => instance.destroy());
    };
  }, []);
  return (
    <div className="ChartContainer2">
      <div className="ChartContainerLabel">Resident's Civil Status</div>
      <div className="PieContaner">
        <Bar
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
            maintainAspectRatio: false, // Allows the chart to fill the parent container
          }}
        />
      </div>
    </div>
  );
};

export default ACivilStatus;
