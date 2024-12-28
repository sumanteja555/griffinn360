import { lazy, Suspense, useEffect, useState } from "react";
import styles from "../components/UI/Aminity/Aminity.module.css";
import axios from "axios";
import { aminities } from "../utils/general";

// Lazy load components
const Event = lazy(() => import("../components/NightCamp/NightCamp"));
const Aminity = lazy(() => import("../components/UI/Aminity/Aminitiy"));

// Custom hook for fetching data
const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

const NightCampsPage = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const {
    data: campData,
    loading,
    error,
  } = useFetchData(`${backendURL}/nightCampDataFetching.php`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error}</p>;
  if (campData.length === 0)
    return <p>No night camps available at the moment.</p>;

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <>
        {/* Render all night camp events */}
        {campData.map((event, index) => (
          <Event key={index} event={event} />
        ))}

        {/* Render Aminity section */}
        <div className={styles.aminityContainer}>
          <p className={styles.title}>AMENITIES</p>
          <div className={styles.logosContainer}>
            {aminities.map((aminity) => (
              <Aminity key={aminity.title} aminity={aminity} />
            ))}
          </div>
        </div>
      </>
    </Suspense>
  );
};

export default NightCampsPage;
