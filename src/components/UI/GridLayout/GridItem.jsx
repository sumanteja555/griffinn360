import { Link, useNavigate } from "react-router-dom";
import styles from "./GridLayout.module.css";
import { useDispatch } from "react-redux";

import { cartActions } from "../../../store/store";

export default function GridItem({ item, heading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, img, price, book, points, discount } = item;

  function handleClick(name, price, discount) {
    const newPrice =
      discount !== "0" ? Math.floor(price - (price * discount) / 100) : price;
    dispatch(cartActions.addToCart({ eventName: name, price: newPrice }));
    navigate("/booknow");
  }

  return (
    <div className={styles.itemContainer}>
      <figure className={styles.imgContainer}>
        <img
          src={
            heading == "adventure Park"
              ? `http://www.griffinn360adventures.com/uploads/${img}`
              : img
          }
          alt={title}
          className={styles.img}
          loading="lazy"
        />
      </figure>
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>{title}</h2>
        {/* <p className={styles.description}>{description}</p> */}
        {points && (
          <p className={styles.points}>
            <ul>
              {points.map((point, index) => (
                <li className={styles.point} key={index}>
                  {point}
                </li>
              ))}
            </ul>
          </p>
        )}
        {discount !== "0" && (
          <p className={styles.discount}>Discount: {discount}%</p>
        )}
        {price && <p className={styles.price}>Rs: {price}/-</p>}

        {book ? (
          <button
            className={styles.btn}
            onClick={() => {
              handleClick(title, price, discount);
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
