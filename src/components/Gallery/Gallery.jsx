import styles from "./Gallery.module.css";
import { ImageGallery } from "react-image-grid-gallery";
import photos from "../../utils/Gallery.js";

export default function Gallery() {
  return (
    <>
      <div className={styles.container}>
        <ImageGallery
          imagesInfoArray={photos}
          columnWidth={230}
          gapSize={24}
          className={styles.container}
        />
      </div>
    </>
  );
}
