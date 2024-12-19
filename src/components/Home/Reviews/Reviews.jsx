import Review from "./Review";
import { reviews } from "../../../utils/Home";
import styles from "./Reviews.module.css";
import { Carousel } from "nuka-carousel";

const Reviews = () => {
  return (
    <>
      <h2 className={styles.heading}>What people say about us</h2>
      <Carousel
        autoplay
        wrapMode="wrap"
        autoplayInterval={10000}
        className={styles.reviewsContainer}
      >
        {reviews.map(({ name, img, review }) => {
          return <Review name={name} img={img} review={review} key={name} />;
        })}
      </Carousel>
    </>
  );
};

export default Reviews;
