import { Link, useNavigate } from "react-router-dom";
import styles from "./GridLayout.module.css";
import { useDispatch } from "react-redux";

import { cartActions } from "../../../store/store";

export default function GridItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, img, description, price, book } = item;

  function handleClick(name, price) {
    dispatch(cartActions.addToCart({ eventName: name, price: price }));
    navigate("/booknow");
  }

  return (
    <div className={styles.itemContainer}>
      <figure className={styles.imgContainer}>
        <img src={img} alt={title} className={styles.img} loading="lazy" />
      </figure>
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>{title}</h2>
        {/* <p className={styles.description}>{description}</p> */}
        {price && <p className={styles.price}>Rs: {price}/-</p>}

        {book ? (
          <button
            className={styles.btn}
            onClick={() => {
              handleClick(title, price);
            }}
          >
            Book Now
          </button>
        ) : (
          <Link to={item.eventId} className={styles.moreInfo}>
            More Info
          </Link>
        )}
      </div>
    </div>
  );
}
