import Increment from "./Increment.jsx";
import styles from "./Count.module.css";

export default function Count() {
  return (
    <div id={styles.countsContainer}>
      <div className={styles.countContainer}>
        <Increment toNumber={150} styles={styles.increment}>
          +
        </Increment>
        <p className={styles.countText}>Workshops</p>
      </div>
      <div className={styles.countContainer}>
        <Increment toNumber={190} styles={styles.increment}>
          +
        </Increment>
        <p className={styles.countText}>Treks</p>
      </div>
      <div className={styles.countContainer}>
        <Increment toNumber={1000} styles={styles.increment}>
          +
        </Increment>
        <p className={styles.countText}>Happy Customers</p>
      </div>
      <div className={styles.countContainer}>
        <Increment toNumber={70} styles={styles.increment}>
          +
        </Increment>
        <p className={styles.countText}>Night Camps</p>
      </div>
    </div>
  );
}
