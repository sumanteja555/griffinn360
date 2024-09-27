import styles from "./AboutUs.module.css";
import { founderInfo } from "../../utils/Aboutus";

export default function Founder() {
  return (
    <div className={styles.founderContainer}>
      <p className={styles.heading}>About the Founder</p>
      <div className={styles.founderSubContainer}>
        {founderInfo.map(({ title, description }) => (
          <div className={styles.founderInfoContainer} key={title}>
            <p className={styles.founderInfoHeading}>{title}</p>
            <p className={styles.founderInfoText}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
