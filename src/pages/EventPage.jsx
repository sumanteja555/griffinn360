import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, lazy, Suspense } from "react";

// Lazy load the Event component
const Event = lazy(() => import("../components/UI/EventDetails/Event.jsx"));

export default function EventPage() {
  const params = useParams();
  const eventParam = params.eventId;
  const trekParam = params.trekId;

  const [data, setData] = useState(null);
  const cache = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      // Check if data is already cached
      if (cache.current[eventParam]) {
        setData(cache.current[eventParam]);
        return;
      }

      try {
        // Dynamically import the data module
        const module = await import(`../utils/${trekParam}.js`);
        // Access the specific variable from the module
        const eventData = module[eventParam];
        // Cache the fetched data
        cache.current[eventParam] = eventData;
        setData(eventData);
      } catch (error) {
        console.error("Error loading data:", error);
        setData(null);
      }
    };

    fetchData();
  }, [eventParam, trekParam]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      {data ? <Event event={data} /> : <h1>No data found</h1>}
    </Suspense>
  );
}
