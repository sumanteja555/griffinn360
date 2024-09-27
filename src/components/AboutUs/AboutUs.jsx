import { lazy, Suspense } from "react";
import styles from "./AboutUs.module.css";
import { aboutInfo } from "../../utils/Aboutus";
import { Accordion } from "react-bootstrap";

// Lazy load components
const MissionVission = lazy(() => import("./MissionVission"));
const Founder = lazy(() => import("./Founder"));
const Team = lazy(() => import("./Team"));

// Image imports
import saiteja from "../../assets/sai.webp";
import rajendra from "../../assets/rajendra.webp";
import lakshmi from "../../assets/lakshmi.webp";

const team = [
  {
    img: saiteja,
    no: "0",
    title: "M. Sai Teja (Founder)",
    points: [
      "He received his BMC (Basic Mountaineering Course) from IHCAE (Indian Himalayan Centre for Adventure and Ecotourism).",
      "He has experience leading snow treks and treks in Maharashtra.",
      "Saiteja is skilled in rescue operations, indicating he has expertise in handling emergencies in mountainous terrain.",
      "He is also an expert in providing training for Everest and the Seven Summits, suggesting he has knowledge and experience in preparing climbers for these challenging expeditions.",
    ],
    info: "It sounds like Saiteja has a diverse skill set that makes him well-equipped for various aspects of mountaineering, from leading treks to training others and performing rescue operations.",
  },
  {
    img: rajendra,
    no: "1",
    title: "R. Rajendra Kumae (Senior Advisor Board)",
    points: [
      "Basic and Advanced Mountaineering courses from JIM&WS",
      "Member 1st Mountaineering Expedition from Telangana State to Stock Kangri",
      "Deputy Leader Mt. Bhagirathi -II Expedition.",
      "Member Clean Himalayas campaign.",
    ],
  },
  {
    img: lakshmi,
    no: "2",
    title: "Lakshmi (Social Media Handler)",
    points: [
      "He received his BMC (Basic Mountaineering Course) from IHCAE (Indian Himalayan Centre for Adventure and Ecotourism).",
      "He has experience leading snow treks and treks in Maharashtra.",
      "Saiteja is skilled in rescue operations, indicating he has expertise in handling emergencies in mountainous terrain.",
      "He is also an expert in providing training for Everest and the Seven Summits, suggesting he has knowledge and experience in preparing climbers for these challenging expeditions.",
    ],
    info: "It sounds like Saiteja has a diverse skill set that makes him well-equipped for various aspects of mountaineering, from leading treks to training others and performing rescue operations.",
  },
];

export default function AboutUs() {
  return (
    <section className={styles.container}>
      <p className="mainHeading">ABOUT US</p>
      <div id={styles.infoContainer}>
        {aboutInfo.map(({ title = "", description }) => (
          <div className={styles.info} key={title}>
            {title && <span className={styles.infoTitle}>{title + ": "}</span>}
            <span className={styles.infoDescription}>{description}</span>
          </div>
        ))}
      </div>

      <Suspense fallback={<div>Loading Mission & Vision...</div>}>
        <MissionVission />
      </Suspense>

      <div>
        <p className={styles.heading}>OUR TEAM</p>
        <Suspense fallback={<div>Loading Team...</div>}>
          <Accordion defaultActiveKey="0">
            {team.map((member) => (
              <Team key={member.title} {...member} />
            ))}
          </Accordion>
        </Suspense>
      </div>

      <div id={styles.founderContainer}>
        <Suspense fallback={<div>Loading Founder...</div>}>
          <Founder />
        </Suspense>
      </div>
    </section>
  );
}
