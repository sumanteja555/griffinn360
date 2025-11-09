import axios from "axios";
import styles from "./User.module.css";
import Input, { PasswordInput } from "./Input";

import { useState, useCallback, memo } from "react";

import { useDispatch } from "react-redux";
import { snackbarActions } from "../../store/store";

const signupDetails = /* #__PURE__ */ [
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

  const dispatch = useDispatch();

  // backend url
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault(); // Prevent the default form submission

      // Sending form data to PHP backend
      try {
        const response = await axios.post(`${backendURL}/signup.php`, formData);

        // const data = await response.json();

        dispatch(
          snackbarActions.openBar({
            type: "success",
            message: "Signup Successfull",
          })
        );
        handleToggle();
      } catch (error) {
        // console.error("There was an error submitting the form:", error);
        dispatch(
          snackbarActions.openBar({
            type: "warning",
            message: error.response.data.message,
          })
        );
      }
    },
    [dispatch, formData, backendURL, handleToggle]
  );
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

export default memo(Signup);
