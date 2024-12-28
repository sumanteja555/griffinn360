import styles from "./Footer.module.css";
import WebLinks from "./WebLinks";

import SocialLinks from "./SocialLinks";
import PolicyLinks from "./PolicyLinks";

const webLinks = {
  title: "Quick Links",
  links: [
    {
      address: "/",
      name: "home",
    },
    {
      address: "/aboutus",
      name: "about us",
    },
    {
      address: "/adventurepark",
      name: "Adventurue Activites",
    },
    {
      address: "/nightcamps",
      name: "Night Camps",
    },
    {
      address: "/mountaintreks",
      name: "Mountain Treks",
    },
    {
      address: "/gallery",
      name: "gallery",
    },
    {
      address: "/volunteer",
      name: "Volunteer",
    },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.infoContainer}>
        <p className={styles.companyName}>GRIFF INN 360</p>

        <p className={styles.infoText}>
          Swamy Narayana Nagar, Gurram Guda, Injapur, Hyderabad, Telangana,
          India-500070
        </p>
        <p className={styles.infoText}>
          Life changing travel experiences curated by us.
        </p>
      </div>
      <WebLinks {...webLinks} />
      <PolicyLinks />
      <SocialLinks />
    </footer>
  );
}
