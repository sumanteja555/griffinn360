import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn); // Assuming user is stored in Redux
  // backend url
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Fetch bookings from backend using GET
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${backendURL}/adminBookings.php`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBookings(response.data); // Set bookings from the response data
      } catch (error) {
        // console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
    // if (isAdminLoggedIn) {
    //   fetchBookings();
    // }
  }, [isAdminLoggedIn]);

  console.log(bookings);

  return <h1>Admin Bookings</h1>;
};

export default AdminBookings;
