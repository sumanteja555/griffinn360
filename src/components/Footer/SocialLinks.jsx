import styles from "./Footer.module.css";
import { FaInstagram, FaYoutube, FaWhatsapp, FaMobile } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function SocialLinks() {
  return (
    <div className={styles.divContainer}>
      <p className={styles.title}>Social Links</p>
      <ul className={styles.socialLinksUl}>
        <li className={styles.socialLinks} id={styles.instagram}>
          <a
            href="https://www.instagram.com/griffinn360adventures/"
            target="blank"
          >
            <FaInstagram className={styles.socialIcon} />
            Instagram
          </a>
        </li>
        <li className={styles.socialLinks} id={styles.youtube}>
          <a
            href="https://www.youtube.com/@griffinn360adventures"
            target="blank"
          >
            <FaYoutube className={styles.socialIcon} />
            Youtube
          </a>
        </li>
        <li className={styles.socialLinks} id={styles.gmail}>
          <a href="mailto:someone@example.com" target="blank">
            <SiGmail className={styles.socialIcon} />
            Gmail
          </a>
        </li>
        <li className={styles.socialLinks} id={styles.whatsapp}>
          <a
            href="https://chat.whatsapp.com/GMqTwjiY2WB6vFB482TSYF"
            target="blank"
          >
            <FaWhatsapp className={styles.socialIcon} />
            Whats App
          </a>
        </li>
        <li className={styles.socialLinks} id={styles.phone}>
          <a href="tel:+919010100595">
            <FaMobile className={styles.socialIcon} />
            +91 90101 00595
          </a>
        </li>
      </ul>
    </div>
  );
}
