import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import styles from "./AdminVolunteers.module.css";

const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Track if there are more volunteers

  const observer = useRef();
  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Fetch volunteers when the page number changes
  const fetchVolunteers = async () => {
    if (!hasMore || !isAdminLoggedIn || loading) return;

    setLoading(true);

    try {
      const response = await axios.get(`${backendURL}/volunteersFetching.php`, {
        params: { page, limit: 10 }, // Adjust limit as needed
      });

      if (response.data.status === "success") {
        const newVolunteers = response.data.data;

        if (newVolunteers.length > 0) {
          // Ensure we're not adding the same data twice
          setVolunteers((prevVolunteers) => {
            // Filter out any duplicate volunteers based on ID
            const newUniqueVolunteers = newVolunteers.filter(
              (newVolunteer) =>
                !prevVolunteers.some(
                  (prevVolunteer) => prevVolunteer.id === newVolunteer.id
                )
            );
            return [...prevVolunteers, ...newUniqueVolunteers];
          });
        } else {
          setHasMore(false); // No more data to fetch
        }
      } else {
        setHasMore(false); // Handle any error from the backend
      }
    } catch (err) {
      setError("Failed to fetch volunteers");
    }

    setLoading(false);
  };

  // Intersection Observer for infinite scrolling
  const lastVolunteerElementRef = useCallback(
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
    fetchVolunteers();
  }, [page]); // Fetch new volunteers when the page changes

  if (error) return <p>{error}</p>;

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Volunteers</h1>
      <div className={styles.volunteerContainer}>
        {volunteers.map(
          ({
            id,
            name,
            email,
            mobile_number,
            instagram_url,
            linkedin_url,
            experience,
            profession,
            address,
            other_info,
            selected_options,
          }) => {
            return (
              <div key={id} className={styles.volunteer}>
                <div className={`${styles.name} ${styles.infoItems}`}>
                  <p>Name</p>
                  <p>{name}</p>
                </div>
                <div className={`${styles.email} ${styles.infoItems}`}>
                  <p>Email Id</p>
                  <p>{email}</p>
                </div>
                <div className={`${styles.number} ${styles.infoItems}`}>
                  <p>Mobile Number</p>
                  <p>{mobile_number}</p>
                </div>
                <div className={`${styles.instagram} ${styles.infoItems}`}>
                  <p>Instagram Id</p>
                  <p>{instagram_url}</p>
                </div>
                <div className={`${styles.linkedin} ${styles.infoItems}`}>
                  <p>Linkedin Id</p>
                  <p>{linkedin_url}</p>
                </div>
                <div className={`${styles.experience} ${styles.infoItems}`}>
                  <p>Experience</p>
                  <p>{experience}</p>
                </div>
                <div className={`${styles.profession} ${styles.infoItems}`}>
                  <p>profession</p>
                  <p>{profession}</p>
                </div>
                <div className={`${styles.address} ${styles.infoItems}`}>
                  <p>address</p>
                  <p>{address}</p>
                </div>
                <div className={`${styles.otherInfo} ${styles.infoItems}`}>
                  <p>Other Info</p>
                  <p>{other_info == "" ? "Nothing" : other_info}</p>
                </div>
                <div className={`${styles.intrests} ${styles.infoItems}`}>
                  <p>Intrested Fields</p>
                  <p>{selected_options == "" ? "Nothing" : selected_options}</p>
                </div>
              </div>
            );
          }
        )}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more volunteers to load.</p>}
    </section>
  );
};

export default AdminVolunteers;
