import styles from "./NightCamp.module.css";
import Carousel from "react-bootstrap/Carousel";
import NightCampItinerary from "./NightCampItinerary.jsx";
import generalItems from "../../utils/general.js";
import { cartActions } from "../../store/store.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Subcomponent for rendering lists (e.g., inclusions, exclusions)
const ListRenderer = ({ title, items, className }) => (
  <div className={className}>
    <p className={styles.title}>{title}</p>
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const NightCamp = ({ event }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { images, inclusions, exclusions, itinerary, title, price, discount } =
    event;

  // Add to cart function
  const handleAddToCart = () => {
    const newPrice =
      discount !== "0" ? Math.floor(price - (price * discount) / 100) : price;
    dispatch(cartActions.addToCart({ eventName: title, price: newPrice }));
    navigate("/booknow");
  };

  return (
    <section className={styles.container}>
      {/* Image Carousel */}
      <Carousel fade controls={false} indicators={false}>
        {JSON.parse(images).map(({ img, title }) => (
          <Carousel.Item key={title} className={styles.swiperSlide}>
            <figure className={styles.imgContainer}>
              <img src={img} alt={title} loading="lazy" />
            </figure>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Event Title */}
      <p className={styles.eventName}>{title}</p>

      {/* Itinerary */}
      <p className={styles.title}>Itinerary</p>
      <NightCampItinerary data={JSON.parse(itinerary)} />

      {/* Inclusions and Exclusions */}
      <div className={styles.infoContainer}>
        <ListRenderer
          title="Inclusions"
          items={JSON.parse(inclusions)}
          className={styles.inclusions}
        />
        {exclusions && (
          <ListRenderer
            title="Exclusions"
            items={JSON.parse(exclusions)}
            className={styles.exclusions}
          />
        )}
      </div>

      <div className={styles.priceContainer}>
        <div className={styles.price}>
          <p>price: </p>
          {price} /- per person
        </div>

        {discount !== "0" && (
          <div className={styles.discount}>
            <p>Discount: </p>
            {discount} %
          </div>
        )}
      </div>

      {/* Book Now Button */}
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={handleAddToCart}>
          Book Now
        </button>
      </div>

      {/* General Rules */}
      <div className={styles.generalitemsContainer}>
        {generalItems.map(({ title, items }) => (
          <ListRenderer
            key={title}
            title={title}
            items={items}
            className={styles.rulesContainer}
          />
        ))}
      </div>
    </section>
  );
};

export default NightCamp;
