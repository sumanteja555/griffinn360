import styles from "./Event.module.css";

import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";

export default function Itinerary({ data }) {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {data.map(({ day, details, text }) => {
        return (
          <TimelineItem key={day} className={styles.timelineItem}>
            <TimelineOppositeContent className={styles.day}>
              {day}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ul className={styles.itineraryUl}>
                {details.map((detail) => (
                  <li key={detail} className={styles.itineraryli}>
                    {detail}
                  </li>
                ))}
              </ul>
              <p className={styles.endText}>{text}</p>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
