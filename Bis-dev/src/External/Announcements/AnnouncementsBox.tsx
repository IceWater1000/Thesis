import React, { useEffect, useRef, useState } from "react";
interface Props {
  title: string;
  image: string;
  date: string;
  uploader: string;
  description: string;
}
const AnnouncementsBox = ({
  title,
  image,
  uploader,
  date,
  description,
}: Props) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight
      );
    }
  }, [description]);
  return (
    <div className="announcementsBox">
      <div className={`announcementsBoxImage`}>
        <img className={`imagess ${expanded ? "expanded" : ""}`} src={image} />
      </div>
      <div className="announcementsBoxText">
        <div className="announcementsHead">
          <img className="announcementsHeadImage" src="/Images/account.png" />
          <div className="announcementsHeadTextBox">
            <div className="announcementsBoxUploader">{uploader}</div>
            <div className="announcementsBoxDate">{date}</div>
          </div>
        </div>

        <hr className="blueLine"></hr>
        <div className="announcementsBoxTitle">{title}</div>
        <div
          className={`announcementsBoxDescription ${
            expanded ? "expanded" : ""
          }`}
          ref={descriptionRef}
        >
          {description}
        </div>
        {isOverflowing && !expanded && (
          <div
            style={{ cursor: "pointer" }}
            className="announcementsBoxDescription"
            onClick={() => setExpanded(true)}
          >
            <span style={{ fontSize: "900", textDecoration: "underline" }}>
              See More{" "}
            </span>
          </div>
        )}
        {expanded && (
          <div
            style={{ cursor: "pointer" }}
            className="announcementsBoxDescription"
            onClick={() => setExpanded(false)}
          >
            <span style={{ fontSize: "900", textDecoration: "underline" }}>
              See Less{" "}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsBox;
