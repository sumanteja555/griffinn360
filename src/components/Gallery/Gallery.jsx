import styles from "./Gallery.module.css";
import photos from "../../utils/Gallery";

import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";

export default function Gallery() {
  const slideUp = {
    hide: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        {photos.map(({ src, alt }, index) => {
          return (
            <motion.div
              className={styles.galleryItem}
              variants={slideUp}
              initial="hide"
              whileInView="show"
              transition={{ duration: 2 }}
              key={index}
            >
              <LazyLoad>
                <img
                  className={styles.galleryImage}
                  src={src}
                  alt={alt}
                  loading="lazy"
                />
              </LazyLoad>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
