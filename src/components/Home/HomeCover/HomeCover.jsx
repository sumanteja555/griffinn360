import styles from "./HomeCover.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

// Import carousel images
import homeCarouselOne from "../../../assets/home/homeCarouselOne.webp";
import homeCarouselTwo from "../../../assets/home/homeCarouselTwo.webp";
import homeCarouselThree from "../../../assets/home/homeCarouselThree.webp";
import homeCarouselFour from "../../../assets/home/homeCarouselFour.webp";
import homeCarouselFive from "../../../assets/home/homeCarouselFive.webp";
import homeCarouselSix from "../../../assets/home/homeCarouselSix.webp";
import homeCarouselSeven from "../../../assets/home/homeCarouselSeven.webp";

// Carousel images array
const carouselImages = [
  { alt: "Kayaking in mountains", src: homeCarouselOne },
  { alt: "Camping tent in forest", src: homeCarouselTwo },
  { alt: "Holding compass in forest", src: homeCarouselThree },
  { alt: "Mountains over clouds scenery", src: homeCarouselFour },
  { alt: "Accessories on map", src: homeCarouselFive },
  { alt: "Trekking ice mountains", src: homeCarouselSix },
  { alt: "Scuba diving in ocean", src: homeCarouselSeven },
];

export default function HomeCover() {
  return (
    <div id={styles.homeCoverContainer}>
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        slidesPerView={1}
        modules={[Autoplay]}
        className={`${styles.mySwiper} mySwiper`}
      >
        {carouselImages.map(({ alt, src }) => (
          <SwiperSlide key={alt}>
            <img
              src={src}
              alt={alt}
              className={styles.carouselImage}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
