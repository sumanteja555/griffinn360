import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdventureParkUpdate.module.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const imageUrl = import.meta.env.VITE_IMAGE_URL;

const AdventureParkUpdate = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [formData, setFormData] = useState({
    price: "",
    points: "",
    discount: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/adventureParkFetch.php`
        );
        console.log("Data fetched:", response.data.data);

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

    const normalizedPath = activity.img.replace(
      /^[\\\/]?src[\\\/]assets[\\\/]adventureActivities[\\\/]/,
      "uploads/adventureActivities/"
    );

    console.log("normalizedPath is:", normalizedPath);
    const fullImagePath = `${imageUrl}${normalizedPath}`;
    console.log("full image path is:", fullImagePath);
    // Set the image preview
    setImagePreview(normalizedPath);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image change (file selection)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate WebP image
      if (file.type !== "image/webp") {
        alert("Only WebP images are allowed.");
        return;
      }

      setImageFile(file);
      const previewURL = URL.createObjectURL(file);
      console.log("Preview URL:", previewURL);

      setImagePreview(previewURL); // Set image preview
    }
  };

  // Utility function to read file as Data URL (Base64)
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result); // This will be the Base64 string
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle form submission (editing)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.price || !formData.discount) {
      alert("Price and Discount are required fields.");
      return;
    }

    // Prepare data payload
    const payload = {
      id: selectedActivity?.id,
      price: formData.price,
      points: formData.points
        ? formData.points.split(",").map((point) => point.trim())
        : [],
      discount: formData.discount,
      image: null, // Will be set if imageFile is present
    };

    // If an image is selected, read it as Base64
    if (imageFile) {
      try {
        const base64Image = await readFileAsDataURL(imageFile);
        payload.image = base64Image;
      } catch (error) {
        console.error("Error reading image file:", error);
        alert("Error reading image file.");
        return;
      }
    }

    console.log("Payload to send:", payload);

    try {
      console.log("Sending PUT request to the backend...");

      const response = await fetch(`${backendURL}/adventureParkUpdate.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.status === "success") {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error updating activity:", err.message);
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
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.title}
            </option>
          ))}
        </select>
      </div>

      {selectedActivity && (
        <div className={styles.activityDetails}>
          <h2>Activity Details</h2>
          {imagePreview && (
            <div className={styles.imageContainer}>
              <img
                src={imagePreview}
                alt="Activity"
                className={styles.previewImage}
              />
            </div>
          )}
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
              <label htmlFor="points">Points (comma-separated):</label>
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

            <div className={styles.inputContainer}>
              <label htmlFor="image">Choose Image (WebP only):</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/webp"
                onChange={handleImageChange}
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
