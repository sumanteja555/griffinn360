import { Link, useNavigate } from "react-router-dom";
import styles from "./GridLayout.module.css";
import { useDispatch } from "react-redux";
import { memo, useCallback } from "react";
import { cartActions } from "../../../store/store";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function GridItem({ item, heading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, img, price, book, points, discount } = item;

  const handleClick = useCallback(
    (name, price, discount) => {
      const newPrice =
        discount !== "0" ? Math.floor(price - (price * discount) / 100) : price;
      dispatch(cartActions.addToCart({ eventName: name, price: newPrice }));
      navigate("/booknow");
    },
    [dispatch, navigate]
  );

  // Compute image src safely; if `img` is falsy, pass `null` so child won't get an empty src
  const computedSrc = img
    ? heading === "Adventure Park"
      ? `${backendURL.replace(/\/+$|\s+/g, "")}/uploads/${img}`
      : img
    : null;

  return (
    <div className={styles.itemContainer}>
      <figure className={styles.imgContainer}>
        <OptimizedImage
          src={computedSrc}
          alt={title}
          className={styles.img}
          loadingStyle="blur"
        />
      </figure>
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>{title}</h2>
        {/* <p className={styles.description}>{description}</p> */}
        {points && (
          <div className={styles.points}>
            <ul>
              {points.map((point, index) => (
                <li className={styles.point} key={index}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
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

// Memoize the component to prevent unnecessary re-renders when props haven't changed
export default memo(GridItem);
