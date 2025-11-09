import {
  useEffect,
  useState,
  Suspense,
  lazy,
  useCallback,
  useMemo,
} from "react";
import PerformanceMonitor from "../components/UI/PerformanceMonitor/PerformanceMonitor";

const GridLayout = lazy(() =>
  import("../components/UI/GridLayout/GridLayout.jsx")
);

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AdventurePark = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Memoize the fetch function to prevent recreating on each render
  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch(`${backendURL}/adventureParkFetch.php`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data.status === "success") {
        setActivities(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch activities.");
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty deps array since backendURL is constant

  // Effect uses the memoized fetch function
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Memoize the grid items to prevent unnecessary object recreation
  const gridItems = useMemo(
    () => ({
      heading: "Adventure Park",
      gridData: activities,
    }),
    [activities]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PerformanceMonitor id="AdventurePark">
      <Suspense fallback={<h1>Data is loading...</h1>}>
        {activities.length > 0 ? (
          <GridLayout gridItems={gridItems} />
        ) : (
          <h1>No data found</h1>
        )}
      </Suspense>
    </PerformanceMonitor>
  );
};

export default AdventurePark;
