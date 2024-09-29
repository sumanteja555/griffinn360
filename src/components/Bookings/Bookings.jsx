import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const userNumber = useSelector((state) => state.user.number); // Assuming user is stored in Redux

  useEffect(() => {
    // Fetch bookings from backend using GET
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost/griffinn360adventures/backend/bookings.php?number=${userNumber}`,
          {
            method: "GET", // Specify the GET method
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        console.log(data);

        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (userNumber) {
      fetchBookings();
    }
  }, [userNumber]);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>Package: {booking.event_name}</p>
              <p>Date: {booking.travel_date}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default Bookings;
