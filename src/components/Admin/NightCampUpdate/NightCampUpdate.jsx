import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./NightCampUpdate.module.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const NightCampUpdate = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/nightCampUpdate.php`);
        setFormData(response.data.data); // Initialize formData with the fetched data
        setError(""); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedFormData = [...formData];

    if (field === "price" || field === "discount") {
      // Parse as float but ensure no unexpected rounding

      const parsedValue = parseFloat(value);
      updatedFormData[index][field] = isNaN(parsedValue) ? 0 : parsedValue;
    } else {
      try {
        updatedFormData[index][field] = JSON.parse(value);
      } catch (e) {
        console.error("Invalid JSON format. Storing as a string:", e);
        updatedFormData[index][field] = value; // Keep as a string if parsing fails
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = formData.map((item) => ({
        id: String(item.id || ""), // Ensure id is a string
        title: item.title?.trim() || "", // Ensure title is non-empty
        price: parseFloat(item.price || 0), // Keep price as a float without formatting it to a string
        inclusions: Array.isArray(item.inclusions) ? item.inclusions : [],
        exclusions: Array.isArray(item.exclusions) ? item.exclusions : [],
        itinerary: Array.isArray(item.itinerary)
          ? item.itinerary.map((day) => ({
              day: day.day || "",
              details: Array.isArray(day.details) ? day.details : [],
              text: day.text || "",
            }))
          : [],
        discount: parseFloat(item.discount || 0), // Keep discount as a float without formatting
      }));

      // console.log("Payload being sent:", JSON.stringify(payload[0], null, 2));

      const response = await axios.put(
        `${backendURL}/nightCampUpdate.php`,
        payload[0],
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message || "Data updated successfully!");
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update data. Please check the fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className={styles.container}>
      <h1>Night Camping Admin Panel</h1>
      {formData.map((item, index) => (
        <div key={item.id} className={styles.formGroup}>
          {/* Title */}
          <div className={styles.formElement}>
            <label>Title:</label>
            <input
              type="text"
              value={item.title || ""}
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
            />
          </div>

          {/* Price */}
          <div className={styles.formElement}>
            <label>Price:</label>
            <input
              type="number"
              value={item.price || ""}
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
              onWheel={(e) => e.target.blur()} // Prevent scroll changes
            />
          </div>

          {/* Inclusions */}
          <div className={styles.formElement}>
            <label>Inclusions:</label>
            <textarea
              value={JSON.stringify(item.inclusions || [], null, 2)} // Stringify for display
              onChange={(e) =>
                handleInputChange(index, "inclusions", e.target.value)
              }
            />
          </div>

          {/* Exclusions */}
          <div className={styles.formElement}>
            <label>Exclusions:</label>
            <textarea
              value={JSON.stringify(item.exclusions || [], null, 2)} // Stringify for display
              onChange={(e) =>
                handleInputChange(index, "exclusions", e.target.value)
              }
            />
          </div>

          {/* Itinerary */}
          <div className={styles.formElement}>
            <label>Itinerary:</label>
            <textarea
              value={JSON.stringify(item.itinerary || [], null, 2)} // Stringify for display
              onChange={(e) =>
                handleInputChange(index, "itinerary", e.target.value)
              }
            />
          </div>

          {/* Discount */}
          <div className={styles.formElement}>
            <label>Discount:</label>
            <input
              type="number"
              step="any" // Allows decimal inputs
              value={item.discount || ""}
              onChange={(e) =>
                handleInputChange(index, "discount", e.target.value)
              }
              onWheel={(e) => e.target.blur()} // Prevent scroll changes
            />
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <button onClick={handleSubmit} className={styles.btn}>
        Submit
      </button>
    </section>
  );
};

export default NightCampUpdate;
