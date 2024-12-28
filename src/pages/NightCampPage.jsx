import { lazy, Suspense } from "react";
import styles from "../components/UI/Aminity/Aminity.module.css";
import { aminities } from "../utils/general";

import { useEffect, useState } from "react";
import axios from "axios";

// Lazy load the Event and Aminity components
const Event = lazy(() => import("../components/NightCamp/NightCamp"));
const Aminity = lazy(() => import("../components/UI/Aminity/Aminitiy"));

// Define the nightCamps data here or import if needed
import nightCamps from "../utils/NightCamps";
const NightCampsPage = () => {
  const [campData, setCampData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Fetch data from the PHP backend
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/nightCampDataFetching.php`
        );
        setCampData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Fetching data {error}</p>;
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <>
        {/* Render Event component with nightCamps data */}
        <Event event={campData[0]} />

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
};

export default NightCampsPage;
