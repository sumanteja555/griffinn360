import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import styles from "./AdminBookings.module.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Track if there are more bookings

  const observer = useRef();
  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Fetch bookings when the page number changes
  const fetchBookings = async () => {
    if (!hasMore || !isAdminLoggedIn || loading) return;

    setLoading(true);

    try {
      const response = await axios.get(`${backendURL}/adminBookings.php`, {
        params: { page, limit: 10 }, // Adjust limit as needed
      });

      if (response.data.status === "success") {
        const newBookings = response.data.data;

        if (newBookings.length > 0) {
          // Ensure we're not adding the same data twice
          setBookings((prevBookings) => {
            // Filter out any duplicate bookings based on ID
            const newUniqueBookings = newBookings.filter(
              (newBooking) =>
                !prevBookings.some(
                  (prevBooking) => prevBooking.id === newBooking.id
                )
            );
            return [...prevBookings, ...newUniqueBookings];
          });
        } else {
          setHasMore(false); // No more data to fetch
        }
      } else {
        setHasMore(false); // Handle any error from the backend
      }
    } catch (err) {
      setError("Failed to fetch bookings");
    }

    setLoading(false);
  };

  // Intersection Observer for infinite scrolling
  const lastBookingElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return; // Avoid triggering while loading or when no more data
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increment the page number when last element is in view
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchBookings();
  }, [page]); // Fetch new bookings when the page changes

  if (error) return <p>{error}</p>;

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Bookings</h1>
      <div className={styles.bookingsContainer}>
        {bookings.map(
          ({
            id,
            name,
            mobile_number,
            amount,
            event_name,
            persons,
            travel_date,
          }) => {
            function formatDate(dateString) {
              // Parse the date string
              const date = new Date(dateString);

              // Extract day, month, and year
              const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
              const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
              const year = date.getFullYear();

              // Return in dd-mm-yyyy format
              return `${day} - ${month} - ${year}`;
            }

            const formattedDate = formatDate(travel_date);
            return (
              <div key={id} className={styles.booking}>
                <p className={styles.name}>{name}</p>
                <p className={styles.number}>{mobile_number}</p>
                <p className={styles.eventName}>{event_name}</p>
                <p className={styles.amount}>{amount}</p>
                <p className={styles.persons}>{persons}</p>
                <p className={styles.date}>{formattedDate}</p>
                <button className={styles.btn}>Cancel</button>
              </div>
            );
          }
        )}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more bookings to load.</p>}
    </section>
  );
};

export default AdminBookings;
