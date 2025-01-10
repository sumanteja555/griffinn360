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
        const response = await axios.get(`${backendURL}/nightCampUpdate.php`); // Replace with your API endpoint
        setFormData(response.data.data); // Initialize formData with the fetched data
        setError(""); // Clear any previous errors
      } catch (err) {
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
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);
  };

  // Submit updated data to the database
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Ensure all required fields are present and formatted correctly
      const payload = formData.map((item) => ({
        id: item.id,
        title: item.title || "",
        price: item.price || 0,
        inclusions: item.inclusions || [],
        exclusions: item.exclusions || [],
        itinerary: item.itinerary || [],
        discount: item.discount || 0,
      }));

      const response = await axios.put(
        `${backendURL}/nightCampUpdate.php`,
        payload
      );

      alert(response.data.message || "Data updated successfully!");
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to update data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className={styles.container}>
      <h1>Night Camping Admin Panel</h1>
      {formData.map((item, index) => (
        <div
          key={item.id} // Ensure `id` exists in your data for unique keys
          className={styles.formGroup}
        >
          <div className={styles.formElement}>
            <label>Title:</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
            />
          </div>

          <div className={styles.formElement}>
            <label>Price:</label>
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
            />
          </div>

          <div className={styles.formElement}>
            <label>Inclusions:</label>
            <textarea
              value={JSON.stringify(item.inclusions, null, 2)}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "inclusions",
                  JSON.parse(e.target.value)
                )
              }
            />
          </div>

          <div className={styles.formElement}>
            <label>Exclusions:</label>
            <textarea
              value={JSON.stringify(item.exclusions, null, 2)}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "exclusions",
                  JSON.parse(e.target.value)
                )
              }
            />
          </div>

          <div className={styles.formElement}>
            <label>Itinerary:</label>
            <textarea
              value={JSON.stringify(item.itinerary, null, 2)}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "itinerary",
                  JSON.parse(e.target.value)
                )
              }
            />
          </div>

          <div className={styles.formElement}>
            <label>Discount:</label>
            <input
              type="number"
              value={item.discount}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "discount",
                  parseInt(e.target.value, 10)
                )
              }
            />
          </div>
        </div>
      ))}

      <button onClick={handleSubmit} className={styles.btn}>
        Submit
      </button>
    </section>
  );
};

export default NightCampUpdate;
