import React, { useEffect, useState } from "react";
import "./Home.css";
import ScrollReveal from "./ScrollReveal";
import HomeIntroductionImageCarousel from "./HomeIntroductionImageCarousel";
import axios from "axios";
const HomeIntroduction = () => {
  const [totalResidents, setTotalResidents] = useState<number | null>(null);
  useEffect(() => {
    const fetchTotalResidents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inhabitants/residentsTotal"
        );
        setTotalResidents(response.data.total);
      } catch (error) {
        console.error("Error fetching total residents:", error);
      }
    };

    fetchTotalResidents();
  }, []);
  return (
    <div className="HomeIntroduction">
      <ScrollReveal direction="Bottom">
        <div className="HomeIntroductionText">THE BARANGAY BUTNGA</div>
      </ScrollReveal>

      <div className="HomeIntroductionContainer">
        <ScrollReveal direction="Left">
          <div className="cont2">
            <div className="text2">
              <span style={{ fontWeight: "bold" }}>Barangay Butnga</span> is one
              of the smallest barangays in Oras, Eastern Samar, located at the
              heart of the town's poblacion. Recognized as one of the most
              peaceful and cleanest barangays in the municipality, it is home to
              a close-knit community with a total population of {totalResidents}
              .
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="Right">
          <div className="cont2">
            <HomeIntroductionImageCarousel />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default HomeIntroduction;
