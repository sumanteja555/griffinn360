import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import styles from "./Bookings.module.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const userNumber = useSelector((state) => state.user.number); // Assuming user is stored in Redux

  // backend url
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Fetch bookings from backend using GET
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${backendURL}/bookings.php`, {
          params: {
            number: userNumber, // Pass the user number as a query parameter
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBookings(response.data); // Set bookings from the response data
      } catch (error) {
        // console.error("Error fetching bookings:", error);
      }
    };

    if (userNumber) {
      fetchBookings();
    }
  }, [userNumber]);

  console.log(bookings);

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>My Bookings</h2>

      {bookings && bookings.length > 0 ? (
        bookings.map(
          ({
            event_name,
            amount,
            travel_date,
            persons,
            name,
            email,
            order_id,
          }) => {
            const date = new Date(travel_date).toLocaleDateString("en-GB");
            return (
              <div className={styles.bookingContainer} key={order_id}>
                <div className={styles.orderidContainer}>
                  <p className={styles.subTitle}>Order Id</p>
                  <p>{order_id}</p>
                </div>
                {/* event name */}
                <div className={styles.infoContainer}>
                  <p className={styles.subTitle}>Event Name</p>
                  <p>{event_name}</p>
                </div>
                {/* amount */}
                <div className={styles.infoContainer}>
                  <p className={styles.subTitle}>Price</p>
                  <p>Rs: {amount} /-</p>
                </div>

                {/* date */}
                <div className={styles.infoContainer}>
                  <p className={styles.subTitle}>Activity Date</p>
                  <p>{date}</p>
                </div>

                {/* userName */}
                <div className={styles.infoContainer}>
                  <p className={styles.subTitle}>Booking Name</p>
                  <p>{name}</p>
                </div>

                {/* booking email */}
                <div className={styles.infoContainer}>
                  <p className={styles.subTitle}>Booking Email</p>
                  <p>{email}</p>
                </div>

                <div className={styles.infoContainer}>
                  <p className={styles.subTitle}>No. of Persons</p>
                  <p>{persons}</p>
                </div>
              </div>
            );
          }
        )
      ) : (
        <h3 className={styles.text}>No Bookings found for this user</h3>
      )}
    </section>
  );
};

export default Bookings;
