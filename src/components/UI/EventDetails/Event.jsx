// local css styles
import styles from "./Event.module.css";

// bootstrap carousel
import Carousel from "react-bootstrap/Carousel";

// component imports
import Itinerary from "./Itinerary.jsx";

// data imports
import generalItems from "../../../utils/general.js";

// redux imports
import { cartActions } from "../../../store/store.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Event({ event }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { images, inclusions, exclusions, itinerary, title } = event;

  // add to cart function
  function handleAddToCart(name, price) {
    dispatch(cartActions.addToCart({ eventName: name, price: price }));
    navigate("/booknow");
  }

  return (
    <section className={styles.container}>
      <Carousel fade controls={false} indicators={false}>
        {images.map(({ img, title }) => {
          return (
            <Carousel.Item key={title} className={styles.swiperSlide}>
              <figure className={styles.imgContainer}>
                <img src={img} alt={title} loading="lazy" />
              </figure>
            </Carousel.Item>
          );
        })}
      </Carousel>

      <p className={styles.eventName}>{title}</p>
      <p className={styles.title}>Itinerary</p>
      <Itinerary data={itinerary} />

      {/* inclusions and exclusions rendering */}
      <div className={styles.infoContainer}>
        <div className={styles.inclusions}>
          <p className={styles.title}>inclusions</p>
          <ul>
            {inclusions && inclusions.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        {exclusions && (
          <div className={styles.exclusions}>
            <p className={styles.title}>exclusions</p>
            <ul>
              {exclusions.map((exclusion) => (
                <li key={exclusion}>{exclusion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* book now button */}
      <div className={styles.btnContainer}>
        <button
          className={styles.btn}
          onClick={() => {
            handleAddToCart(event.title, event.price);
          }}
        >
          Book Now
        </button>
      </div>

      <div className={styles.generalitemsContainer}>
        {/* general rules */}
        {generalItems.map(({ title, items }) => {
          return (
            <div className={styles.rulesContainer} key={title}>
              <p className={styles.title}>{title}</p>
              <ol className={styles.ol}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}
