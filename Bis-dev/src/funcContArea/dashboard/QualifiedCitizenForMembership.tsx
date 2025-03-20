import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import "../mainContent/MainContentAreaDashboard.css";
import axios from "axios";
import { useSelectAddformReload } from "../../utilities/SelectAdformDataReload";
interface Props {
  gridArea: string;
  headText: string;
  url: string;
}

interface SeniorData {
  ResidentID: string;
  Name: string;
  DateOfBirth: Date;
}
const QualifiedCitizenForMembership = ({ gridArea, headText, url }: Props) => {
  const { AnnouncementReload } = useSelectAddformReload();
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(url);
        const updatedData = response.data.map((item: SeniorData) => {
          const Age = calculateAge(item.DateOfBirth); // Calculate age
          return { ...item, Age }; // Add the age property
        });
        setData(updatedData);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [AnnouncementReload]);

  //Age Calculator

  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  return (
    <div
      className={`Card ${gridArea}`}
      style={{ display: data.length == 0 ? "none" : "" }}
    >
      <div className="CardHeader">{headText}</div>
      <div className="CardHeader">Number of Residents: {data.length}</div>
      <div className="BlueLine"></div>

      <div className="QualifiedTable">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.ResidentID}</td>
                <td>{item.Name}</td>
                <td>{item.Age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QualifiedCitizenForMembership;
