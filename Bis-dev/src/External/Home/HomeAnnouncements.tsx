import React, { useEffect, useState } from "react";
import "./Home.css";
import HomeAnnouncementsBox from "./HomeAnnouncementsBox";
import HomeButton from "./HomeButton";
import { useNavigate } from "react-router-dom";
import { useData } from "../DataContext";
import ScrollReveal from "./ScrollReveal";
interface Announcements {
  id: string;
  title: string;
  uploader: string;
  date: string;
  description: string;
  image: string;
}

const HomeAnnouncements = () => {
  //useData is used to turn the active button of the navigation bar
  const { currentActiveFromButtons, setCurrentActiveFromButtons } = useData();
  const navigate = useNavigate();

  const HomeButtonClickHandler = () => {
    setCurrentActiveFromButtons("ANNOUNCEMENTS");
    navigate("/Announcements");
  };

  const [announcementsData, setAnnouncementsData] = useState<Announcements[]>();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/Announcements/projects"
        );
        const data = await response.json();

        setAnnouncementsData(data);
      } catch (error) {
        console.log("ERROR Fetching");
      }
    };
    fetchAnnouncements();
  }, []);
  console.log(announcementsData);
  return (
    <div className="HomeAnnouncements">
      <div className="HomeIntroductionText">ANNOUNCEMENTS</div>
      <ScrollReveal direction="Bottom">
        <div className="HomeAnnouncementsRow">
          {announcementsData?.map((item, index) =>
            index < 4 ? (
              <HomeAnnouncementsBox
                Image={item.image[0]}
                title={item.title}
                details={item.date}
              />
            ) : (
              ""
            )
          )}
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <HomeButton
          label="To All Announcements"
          onItemClick={HomeButtonClickHandler}
        />
      </ScrollReveal>
    </div>
  );
};

export default HomeAnnouncements;
