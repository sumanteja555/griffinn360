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

  // Compute image src safely; handle various shapes of `img` coming from the backend:
  // - full absolute URL (starts with http/https) -> use as-is
  // - absolute path starting with '/' (e.g. '/uploads/...') -> combine with site root
  // - relative path or bare filename -> prepend uploads location on site root
  const computedSrc = (() => {
    if (!img) return null;

    // If the img is already an absolute URL, return it
    if (/^https?:\/\//i.test(img)) return img;

    // Determine site root by removing a trailing /backend segment from backendURL
    const siteRoot = backendURL ? backendURL.replace(/\/backend\/?$/i, "") : "";

    // If img starts with a slash it's already an absolute path on the site
    if (img.startsWith("/")) {
      return `${siteRoot}${img}`;
    }

    // Otherwise assume it's a path relative to uploads and join appropriately
    return `${siteRoot}/uploads/${img}`;
  })();

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
