import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./AdventureParkUpdate.module.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AdventureParkUpdate = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [formData, setFormData] = useState({
    price: "",
    points: "",
    discount: "",
  });

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/adventureParkFetch.php`
        ); // Replace with your API endpoint

        const parsedData = response.data.data.map((activity) => ({
          ...activity,
          points:
            typeof activity.points === "string"
              ? JSON.parse(activity.points)
              : activity.points,
        }));
        setActivities(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle dropdown selection
  const handleSelection = (id) => {
    const activity = activities.find((act) => act.id === id);
    setSelectedActivity(activity);

    setFormData({
      price: activity?.price || "",
      points: activity?.points?.join(", ") || "",
      discount: activity?.discount || "",
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (editing)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: selectedActivity.id,
      price: formData.price,
      points: formData.points.split(",").map((point) => point.trim()),
      discount: formData.discount,
    };

    try {
      const response = await fetch(`${backendURL}/adventureParkUpdate.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error updating activity:", err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Adventure Park Activities</h1>
      <div className={styles.selectionContainer}>
        <label htmlFor="activity-select">Select an Activity:</label>
        <select
          className={styles.select}
          id="activity-select"
          onChange={(e) => handleSelection(e.target.value)}
        >
          <option value="">--Select an Activity--</option>
          {activities.map((activity) => {
            return (
              <option key={activity.id} value={activity.id}>
                {activity.title}
              </option>
            );
          })}
        </select>
      </div>

      {selectedActivity && (
        <div className={styles.activityDetails}>
          <h2>Activity Details</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="points">Points (JSON):</label>
              <textarea
                id="points"
                name="points"
                value={formData.points}
                onChange={handleChange}
                rows={5}
                cols={40}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="discount">Discount:</label>
              <input
                type="text"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.btn}>
              Save Changes
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default AdventureParkUpdate;
