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
      const response = await fetch(`${backendURL}/adventureParkFetch.php`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      // Log the raw response for debugging
      // console.log("Response status:", response.status);
      // console.log("Response headers:", Object.fromEntries(response.headers));

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `HTTP error! Status: ${response.status}, Details: ${errorText}`
        );
      }

      const text = await response.text(); // Get raw response text first
      // console.log("Raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // console.error("JSON parse error:", e);
        // console.log("Failed to parse:", text);
        throw new Error("Invalid JSON response from server");
      }

      if (data.status === "success") {
        setActivities(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch activities.");
      }
    } catch (err) {
      // console.error("Error fetching activities:", err);
      setError(`Fetch error: ${err.message}. Check console for details.`);

      // Log the backend URL being used
      // console.log("Backend URL:", `${backendURL}/adventureParkFetch.php`);
    } finally {
      setLoading(false);
    }
  }, [backendURL]); // Add backendURL to dependencies

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
