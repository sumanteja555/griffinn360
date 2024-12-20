import VolunteerInput from "./VolunteerInput";
import volunteer from "../../utils/volunteer";

import styles from "./Volunteer.module.css";

import { useState } from "react";

// backend url
const backendURL = import.meta.env.VITE_BACKEND_URL;

// redux imports
import { snackbarActions } from "../../store/store";
import { useDispatch } from "react-redux";

export default function Volunteer() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profession: "",
    address: "",
    linkedin: "",
    instagram: "",
    experience: "",
    otherInfo: "",
    contributions: [], // For checkboxes
  });

  // contrinbution options
  const contributionOptions = [
    "Write and Maintain Blog",
    "Newsletter Editorial Team",
    "Manage Social Media",
    "Graphic Design and Videos for Promotions",
    "Get Sponsors for Club Events",
  ];

  // handling change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        contributions: checked
          ? [...prev.contributions, value]
          : prev.contributions.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // handling submitting

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("formData is:" + JSON.stringify(formData));

    // Basic validation
    if (!formData.name || !formData.email || !formData.mobile) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const response = await fetch(`${backendURL}/volunteerSignup.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          mobile: "",
          profession: "",
          address: "",
          linkedin: "",
          instagram: "",
          experience: "",
          otherInfo: "",
          contributions: [],
        });
        dispatch(
          snackbarActions.openBar({
            type: "success",
            message: "you are successfully signedup as volunteer.",
          })
        );
      } else {
        dispatch(
          snackbarActions.openBar({
            type: "warning",
            message: "An error occured. Please try again later.",
          })
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      dispatch(
        snackbarActions.openBar({
          type: "warning",
          message: "An error occured. Please try again later.",
        })
      );
      alert("Error submitting form. Please try again later.");
    }
  };
  return (
    <section className={styles.container}>
      <p className="mainHeading">Volunteer</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        {volunteer.map((item) => (
          <VolunteerInput
            {...item}
            key={item.name}
            onChange={handleChange}
            formData={formData}
          />
        ))}

        <fieldset className={styles.fieldset}>
          <label htmlFor="" className={styles.label}>
            I love to contribute in the following ways:
          </label>

          {contributionOptions.map((option, index) => (
            <div key={index} className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="contributions"
                value={option}
                id={`contribution_${index}`}
                onChange={handleChange}
                checked={formData.contributions.includes(option)}
              />
              <label htmlFor={`contribution_${index}`}>{option}</label>
            </div>
          ))}
        </fieldset>

        <div className={styles.btnContainer}>
          <button className={styles.btn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
