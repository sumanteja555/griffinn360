import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

const PolicyLinks = () => {
  return (
    <section className={styles.policiesContainer}>
      <p className={styles.title}>Policies</p>
      <p>
        <NavLink to="/privacypolicy" className={styles.link}>
          Privacy Policy
        </NavLink>
      </p>
      <p>
        <NavLink to="/terms&conditions" className={styles.link}>
          Terms & Conditions
        </NavLink>
      </p>
      <p>
        <NavLink to="/cancellationpolicy" className={styles.link}>
          Cancellation Policy
        </NavLink>
      </p>
      <p>
        <NavLink to="/releaseofliability" className={styles.link}>
          Release Of Liability
        </NavLink>
      </p>
    </section>
  );
};

export default PolicyLinks;
