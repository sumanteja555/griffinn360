import styles from "./Reviews.module.css";
import StarIcon from "@mui/icons-material/Star";

export default function Review({ name, review, img }) {
  return (
    <>
      <div className={styles.infoContainer}>
        <h2 className={styles.reviewName}>{name}</h2>
        <p className={styles.reviewDescription}>{review}</p>
      </div>
      <figure className={styles.imgContainer}>
        <img src={img} alt={name} className={styles.img} />
      </figure>
    </>
  );
}
