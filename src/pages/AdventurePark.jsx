import { useEffect, useState, Suspense, lazy } from "react";

const GridLayout = lazy(() =>
  import("../components/UI/GridLayout/GridLayout.jsx")
);

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AdventurePark = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${backendURL}/adventureParkFetch.php`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.status === "success") {
          setActivities(data.data); // Assuming the API response has a `data` field
        } else {
          throw new Error(data.message || "Failed to fetch activities.");
        }
      } catch (err) {
        console.log("error is:", err);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Suspense fallback={<h1>Data is loading...</h1>}>
      {activities ? (
        <GridLayout
          gridItems={{ heading: "adventure Park", gridData: activities }}
        />
      ) : (
        <h1>No data found</h1>
      )}
    </Suspense>
  );
};

export default AdventurePark;
