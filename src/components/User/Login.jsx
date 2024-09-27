import axios from "axios";
import styles from "./User.module.css";
import Input, { PasswordInput } from "./Input";
<<<<<<< HEAD
<<<<<<< HEAD

import { useState } from "react";
=======
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { userActions } from "../../store/store";
>>>>>>> master
=======

import { useState } from "react";
>>>>>>> origin/main

const loginDetails = [
  {
    id: "email",
    labelText: "Enter your registered email id or mobile number",
    placeholder: "Email / Number",
    type: "text",
  },
];

<<<<<<< HEAD
<<<<<<< HEAD
// login component
=======
// Login component
>>>>>>> master
=======
// login component
>>>>>>> origin/main
const Login = ({
  handleToggle,
  passwordVisible,
  handlePasswordVisible,
  handlePasswordInvisible,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

<<<<<<< HEAD
<<<<<<< HEAD
=======
  const dispatch = useDispatch(); // Initialize dispatch

>>>>>>> master
=======
>>>>>>> origin/main
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

<<<<<<< HEAD
<<<<<<< HEAD
    console.log("logging in user");
    console.log(formData);

=======
>>>>>>> master
=======
    console.log("logging in user");
    console.log(formData);

>>>>>>> origin/main
    try {
      const response = await axios.post(
        "http://localhost/griffinn360adventures/backend/login.php",
        formData
      );
      if (response.data.success) {
        const token = response.data.token;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/main
        // Store the JWT in local storage
        localStorage.setItem("jwtToken", token);

        console.log("JWT stored in local storage:", token);
      }

      console.log("Login successful:", response.data);
<<<<<<< HEAD
=======
        // Dispatch the setUser action to store token and user info in Redux
        dispatch(
          userActions.setUser({
            token: token,
            name: response.data.username, // Assuming the name or email comes from formData or decoded token
          })
        );
      }

>>>>>>> master
=======
>>>>>>> origin/main
    } catch (error) {
      console.error(
        "There was an error logging in:",
        error.response.data.message
      );
    }
<<<<<<< HEAD
<<<<<<< HEAD
    // Sending login data to PHP backend
  };
=======
  };


>>>>>>> master
=======
    // Sending login data to PHP backend
  };
>>>>>>> origin/main
  return (
    <div className={styles.formContainer}>
      <h1>Login</h1>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {loginDetails.map((input) => (
            <Input key={input.id} {...input} onChange={handleChange} />
          ))}

          <PasswordInput
            handleChange={handleChange}
            handlePasswordInvisible={handlePasswordInvisible}
            handlePasswordVisible={handlePasswordVisible}
            passwordVisible={passwordVisible}
          />

          <p className={styles.toggleContainer}>
            Already have an account? Click Here to
            <button className={styles.toggleBtn} onClick={handleToggle}>
              Signup
            </button>
          </p>
          <input type="submit" value="Log In" className={styles.userBtn} />
        </form>
      </div>
    </div>
  );
};

export default Login;
