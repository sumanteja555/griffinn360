import styles from "./AboutUs.module.css";

export default function MissionVission() {
  return (
    <>
      <div className={styles.mvContainer}>
        <div className={styles.missionContainer}>
          <p className={styles.heading}>MISSION</p>
          <p className={styles.mvText}>
            At Griffin Adventures, our mission is to create exhilarating outdoor
            experiences that foster teamwork, personal growth, and a deep
            connection with nature. We aim to inspire individuals to step
            outside their comfort zones and embrace the spirit of adventure.
          </p>
        </div>
        <div className={styles.vissionContainer}>
          <p className={styles.heading}>VISSION</p>
          <p className={styles.mvText}>
            Our vision at Griffin Adventures is to be a leading provider of
            transformative adventure activities, offering diverse and accessible
            experiences that empower people to explore, learn, and thrive in the
            great outdoors. We envision a world where everyone can discover
            their inner adventurer and appreciate the beauty of our natural
            landscapes.
          </p>
        </div>
      </div>
    </>
  );
}
