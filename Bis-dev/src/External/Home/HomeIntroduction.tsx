import React from "react";
import "./Home.css";
import ScrollReveal from "./ScrollReveal";
import HomeIntroductionImageCarousel from "./HomeIntroductionImageCarousel";
const HomeIntroduction = () => {
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
              a close-knit community with a total population of #.
            </div>
            <div className="AThing"></div>
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
