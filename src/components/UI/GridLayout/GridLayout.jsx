import styles from "./GridLayout.module.css";
import { memo } from "react";
import GridItem from "./GridItem.jsx";

function GridLayout({ gridItems }) {
  const { heading, gridData } = gridItems;
  return (
    <section className={styles.container}>
      <p id={styles.heading}>{heading}</p>

      {heading == "adventure Park" ? (
        <p className={styles.parkInfo}>
          Griffinn Adventure Park sounds like an exciting destination! Located
          in Arogya Sanjeevani Vanam, near LB Nagar and in the Injapur area of
          Hyderabad, this park spans 150 acres of lush greenery. It seems like a
          perfect spot for a range of outdoor activities surrounded by trees and
          plants.
        </p>
      ) : null}
      <div className={styles.gridItemsContainer}>
        {gridData.map((item) => {
          return <GridItem item={item} key={item.title} heading={heading} />;
        })}
      </div>
    </section>
  );
}

// Memoize the component to prevent unnecessary re-renders when props haven't changed
export default memo(GridLayout);
