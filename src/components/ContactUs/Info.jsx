import LocationOnIcon from "@mui/icons-material/LocationOn";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LanguageIcon from "@mui/icons-material/Language";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

import styles from "./ContactUs.module.css";

export default function Info() {
  return (
    <>
      <a
        className={styles.itemContainer}
        href="https://maps.app.goo.gl/d5EofZzEUhw9NqBe7"
      >
        <LocationOnIcon className={styles.icon} />
        <p className={styles.info}>
          Arogya Sanjeevani Vanam, Injapur - Toroor Rd, Swamy Narayana Nagar,
          Gurram Guda, Hyderabad, Telangana 500070
        </p>
      </a>
      <a className={styles.itemContainer} href="tel:+919010100595">
        <SmartphoneIcon className={styles.icon} />
        <p className={styles.info}> +91 90101 00595</p>
      </a>
      <a className={styles.itemContainer} href="https://www.griffinn360.com">
        <LanguageIcon className={styles.icon} />
        <p className={styles.info}>www.griffinn360.com</p>
      </a>
      <a
        className={styles.itemContainer}
        href="mailto:griffinn360adventures@gmail.com"
      >
        <AlternateEmailIcon className={styles.icon} />
        <p className={styles.info}> griffinnadventures@gmail.com</p>
      </a>
      <a
        className={styles.itemContainer}
        href="https://www.instagram.com/griffinn360adventure"
      >
        <InstagramIcon className={styles.icon} />
        <p className={styles.info}> Griff-INN 360 Adventures</p>
      </a>
      <a
        className={styles.itemContainer}
        href="https://www.youtube.com/@Griffinn360adventures"
      >
        <YouTubeIcon className={styles.icon} />
        <p className={styles.info}> Griff-INN 360 Adventures</p>
      </a>
    </>
  );
}
