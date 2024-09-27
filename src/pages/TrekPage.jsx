import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, lazy, Suspense } from "react";

// Lazy load the GridLayout component
const GridLayout = lazy(() =>
  import("../components/UI/GridLayout/GridLayout.jsx")
);

export default function TrekPage() {
  const params = useParams();
  const trekParam = params.trekId;

  const [data, setData] = useState(null);
  const cache = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      // Check if data is already cached
      if (cache.current[trekParam]) {
        setData(cache.current[trekParam]);
        return;
      }

      try {
        // Dynamically import the data module
        const module = await import(`../utils/${trekParam}.js`);

        // Access the specific variable from the module
        const trekData = module.default[0];

        // Cache the fetched data
        cache.current[trekParam] = trekData;
        setData(trekData);
      } catch (error) {
        console.error("Error loading data:", error);
        setData(null);
      }
    };

    fetchData();
  }, [trekParam]);

  return (
    <Suspense fallback={<h1>Data is loading...</h1>}>
      {data ? <GridLayout gridItems={data} /> : <h1>No data found</h1>}
    </Suspense>
  );
}
