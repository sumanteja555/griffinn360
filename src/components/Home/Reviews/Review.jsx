import styles from "./Reviews.module.css";
import StarIcon from "@mui/icons-material/Star";

export default function Review({ name, review, img }) {
  return (
    <>
      <div className={styles.review}>
        <figure className={styles.imgContainer}>
          <img src={img} alt={name} />
        </figure>
        <div className={styles.infoContainer}>
          <h3>{name}</h3>
          <p>{review}</p>
        </div>
      </div>
    </>
  );
}
