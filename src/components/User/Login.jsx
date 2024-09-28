import axios from "axios";
import styles from "./User.module.css";
import Input, { PasswordInput } from "./Input";

import { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch and useSelector
import { useLocation, useNavigate } from "react-router-dom";
import { userActions } from "../../store/store";

const loginDetails = [
  {
    id: "email",
    labelText: "Enter your registered email id or mobile number",
    placeholder: "Email / Number",
    type: "text",
  },
];

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

  const dispatch = useDispatch(); // Initialize dispatch
  const location = useLocation(); // Hook to get the current location object
  const navigate = useNavigate(); // Hook to programmatically navigate


  const redirectTo = location.state?.from || "/"; // Fallback to home page if no "from" location exists

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const response = await axios.post(
        "http://localhost/griffinn360adventures/backend/login.php",
        formData
      );
      
      if (response.data.success) {
        const token = response.data.token;

        // Dispatch the setUser action to store token and user info in Redux
        dispatch(
          userActions.setUser({
            token: token,
            name: response.data.username, // Assuming the name or email comes from formData or decoded token
          })
        );

        navigate(redirectTo);
      }
    }
    catch (error) {
      console.error(
        "There was an error logging in:",
        error.response.data.message
      );
    }


    // Sending login data to PHP backend
  };
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
}

export default Login;
