import styles from "./Gallery.module.css";
import photos from "../../utils/Gallery";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import OptimizedImage from "../UI/OptimizedImage/OptimizedImage";
import PerformanceMonitor from "../UI/PerformanceMonitor/PerformanceMonitor";

function Gallery() {
  // Memoize animation variants
  const slideUp = useMemo(
    () => ({
      hide: { opacity: 0, y: 45 },
      show: { opacity: 1, y: 0 },
    }),
    []
  );
  return (
    <PerformanceMonitor id="Gallery">
      <div className={styles.container}>
        <div className={styles.gallery}>
          {photos.map(({ src, alt }, index) => (
            <motion.div
              className={styles.galleryItem}
              variants={slideUp}
              initial="hide"
              whileInView="show"
              transition={{ duration: 2 }}
              key={src || index} // Prefer unique src over index
            >
              <OptimizedImage
                src={src}
                alt={alt}
                className={styles.galleryImage}
                loadingStyle="blur"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </PerformanceMonitor>
  );
}

// Memoize the entire component
export default memo(Gallery);
