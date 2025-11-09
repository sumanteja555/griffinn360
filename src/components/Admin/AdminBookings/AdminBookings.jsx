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

  const token = useSelector((state) => state.admin.adminToken);

  const observer = useRef();
  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Fetch bookings when the page number changes
  const fetchBookings = async () => {
    if (!hasMore || loading) return;

    if (!isAdminLoggedIn) {
      setError("Please log in as admin to view bookings");
      return;
    }

    if (!token) {
      setError("Authentication token missing - please log in again");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${backendURL}/adminBookings.php`, {
        params: { page, limit: 10 },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status === "success") {
        const newBookings = response.data.data || [];

        if (newBookings.length > 0) {
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
          setHasMore(false);
        }
      } else {
        setError(response.data.message || "Failed to fetch bookings");
        setHasMore(false);
      }
    } catch (err) {
      console.error("Booking fetch error:", err);
      if (err.response?.status === 401) {
        setError("Session expired - please log in again");
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to fetch bookings. Please try again."
        );
      }
      setHasMore(false);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (error) {
    return (
      <section className={styles.container}>
        <h1 className={styles.heading}>Bookings</h1>
        <div className={styles.error}>
          <p>{error}</p>
          <button
            onClick={() => {
              setError(null);
              setPage(1);
            }}
            className={styles.retryBtn}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Bookings</h1>
      <div className={styles.bookingsContainer}>
        {bookings.length === 0 && !loading ? (
          <p className={styles.noBookings}>No bookings found</p>
        ) : (
          bookings.map(
            ({
              id,
              name,
              mobile_number,
              amount,
              event_name,
              persons,
              travel_date,
            }) => (
              <div key={id} className={styles.booking}>
                <p className={styles.name}>{name}</p>
                <p className={styles.number}>{mobile_number}</p>
                <p className={styles.eventName}>{event_name}</p>
                <p className={styles.amount}>₹{amount}</p>
                <p className={styles.persons}>
                  {persons} {persons === 1 ? "person" : "people"}
                </p>
                <p className={styles.date}>{formatDate(travel_date)}</p>
                <button className={styles.btn}>Cancel</button>
              </div>
            )
          )
        )}
        {loading && (
          <div className={styles.loadingContainer}>
            <p className={styles.loading}>Loading bookings...</p>
          </div>
        )}
        {!hasMore && bookings.length > 0 && (
          <p className={styles.noMore}>No more bookings to load</p>
        )}
      </div>
    </section>
  );
};

export default AdminBookings;
