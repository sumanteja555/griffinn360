import styles from "./Policies.module.css";

import policies from "../../utils/policies";

export default function Policies() {
  return (
    <section className={styles.container}>
      {policies.map(({ title, items }) => {
        return (
          <div key={title} className={styles.policyContainer}>
            <p className={styles.heading}>{title}</p>
            <ul className={styles.ul}>
              {items.map((item) => (
                <li key={item} className={styles.li}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
