import { memo, useState, useEffect } from "react";
import styles from "./OptimizedImage.module.css";

function OptimizedImage({
  src,
  alt,
  className,
  width = "100%",
  height = "auto",
  loadingStyle = "blur", // 'blur' | 'placeholder'
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setError(false);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (error) {
    return (
      <div
        className={`${styles.errorContainer} ${className}`}
        style={{ width, height }}
      >
        <span>Failed to load image</span>
      </div>
    );
  }

  return (
    <div
      className={`${styles.imageWrapper} ${className}`}
      style={{ width, height }}
    >
      {isLoading && loadingStyle === "placeholder" && (
        <div className={styles.placeholder}>
          <div className={styles.shimmer}></div>
        </div>
      )}

      <img
        src={imageSrc}
        alt={alt}
        className={`
          ${styles.image}
          ${isLoading ? styles.loading : styles.loaded}
          ${loadingStyle === "blur" ? styles.blurUp : ""}
        `}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
      />
    </div>
  );
}

// Only re-render if props change
export default memo(OptimizedImage);
