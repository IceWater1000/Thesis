import React from "react";
import "./HomeBox.css";
interface Props {
  Image: string;
  title: string;
  details: string;
}
const HomeAnnouncementsBox = ({ Image, title, details }: Props) => {
  return (
    <div className="HomeAnnouncementsBox">
      <img className="HomeAnnouncementsBoxImage" src={Image} />

      <div className="HomeAnnouncementsBoxTitle">{title}</div>
      <div className="HomeAnnouncementsBoxDetails">{details}</div>
    </div>
  );
};

export default HomeAnnouncementsBox;
