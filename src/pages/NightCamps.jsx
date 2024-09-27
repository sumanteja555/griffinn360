import { lazy, Suspense } from "react";
import styles from "../components/UI/Aminity/Aminity.module.css";
import { aminities } from "../utils/general";

// Lazy load the Event and Aminity components
const Event = lazy(() => import("../components/UI/EventDetails/Event"));
const Aminity = lazy(() => import("../components/UI/Aminity/Aminitiy"));

// Define the nightCamps data here or import if needed
import nightCamps from "../utils/NightCamps";

export default function NightCampsPage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <>
        {/* Render Event component with nightCamps data */}
        <Event event={nightCamps} />

        {/* Render Aminity section */}
        <div className={styles.aminityContainer}>
          <p className={styles.title}>AMENITIES</p>
          <div className={styles.logosContainer}>
            {aminities.map((aminity) => (
              <Suspense
                key={aminity.title}
                fallback={<div>Loading amenity...</div>}
              >
                <Aminity aminity={aminity} />
              </Suspense>
            ))}
          </div>
        </div>
      </>
    </Suspense>
  );
}
