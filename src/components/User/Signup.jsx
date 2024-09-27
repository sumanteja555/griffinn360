import axios from "axios";
import styles from "./User.module.css";
import Input, { PasswordInput } from "./Input";

import { useState } from "react";

const signupDetails = [
  {
    id: "name",
    labelText: "Name",
    placeholder: "Enter Your Name",
    type: "text",
  },
  {
    id: "email",
    labelText: "Email",
    placeholder: "Enter Your Email Id",
    type: "email",
  },
  {
    id: "number",
    labelText: "Mobile Number",
    placeholder: "Enter Your Mobile Number",
    type: "number",
  },
];

// signup component
const Signup = ({
  handleToggle,
  passwordVisible,
  handlePasswordVisible,
  handlePasswordInvisible,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log(formData);

    // Sending form data to PHP backend
    try {
      const response = await axios.post(
        "http://localhost/griffinn360adventures/backend/signup.php",
        formData
      );
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error(
        "There was an error submitting the form:",
        error.response.data.message
      );
    }
  };
  return (
    <div className={styles.formContainer}>
      <h1>Signup</h1>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {signupDetails.map((input) => (
            <Input key={input.id} {...input} onChange={handleChange} />
          ))}

          <PasswordInput
            handleChange={handleChange}
            handlePasswordInvisible={handlePasswordInvisible}
            handlePasswordVisible={handlePasswordVisible}
            passwordVisible={passwordVisible}
          />
          <p className={styles.toggleContainer}>
            Already have an account? Click Here to{""}
            <button
              className={styles.toggleBtn}
              onClick={handleToggle}
              type="button"
            >
              Login
            </button>
          </p>
          <input type="submit" value="Signup" className={styles.userBtn} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
