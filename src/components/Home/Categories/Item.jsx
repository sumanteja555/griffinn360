import styles from "./Categories.module.css";
import { Link } from "react-router-dom";

export default function Item({ title, img, link }) {
  return (
    <div className={styles.itemContainer}>
      <figure className={styles.imgContainer}>
        <img src={img} alt={title} className={styles.itemImg} loading="lazy" />
      </figure>
      <div className={styles.itemContent}>
        <p className={styles.itemTitle}>{title}</p>
        <Link to={link} className={styles.itemLink}>
          Get Details
        </Link>
      </div>
    </div>
  );
}
