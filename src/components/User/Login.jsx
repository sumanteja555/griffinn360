import axios from "axios";
import styles from "./User.module.css";
import Input, { PasswordInput } from "./Input";

import { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { useLocation, useNavigate } from "react-router-dom";
import { userActions, snackbarActions } from "../../store/store";

const loginDetails = /* #__PURE__ */ [
  {
    id: "email",
    labelText: "Enter your registered mobile number",
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

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const from = location.state?.from?.pathname || "";

  // backend url
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault(); // Prevent default form submission

      try {
        const response = await axios.post(`${backendURL}/login.php`, formData);

        if (response.data.success) {
          const token = response.data.token;

          // Dispatch the setUser action to store token and user info in Redux
          dispatch(
            userActions.setUser({
              token: token,
              name: response.data.username, // Assuming the name or email comes from formData or decoded token
            })
          );

          dispatch(
            snackbarActions.openBar({
              type: "success",
              message: "logged in Successfully",
            })
          );
          navigate(from, { replace: true });
        }
      } catch (error) {
        dispatch(
          snackbarActions.openBar({
            type: "error",
            message: error.response.data.message,
          })
        );
      }

      // Sending login data to PHP backend
    },
    [dispatch, formData, backendURL, from, navigate]
  );
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
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={handleToggle}
            >
              Signup
            </button>
          </p>
          <input type="submit" value="Log In" className={styles.userBtn} />
        </form>
      </div>
    </div>
  );
};

export default memo(Login);
