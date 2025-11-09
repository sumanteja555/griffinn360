import styles from "./NightCamp.module.css";

import { memo, useMemo } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
const NightCampItinerary = memo(({ data }) => {
  // Memoize timeline styles
  const timelineStyles = useMemo(
    () => ({
      [`& .${timelineOppositeContentClasses.root}`]: {
        flex: 0.2,
      },
    }),
    []
  );
  return (
    <Timeline
      sx={timelineStyles}
      /*sx={{
      }*/
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
});

export default NightCampItinerary;
