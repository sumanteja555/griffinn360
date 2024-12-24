import axios from "axios";
import styles from "./AdminUser.module.css";
import Input, { PasswordInput } from "./AdminInput";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { useLocation, useNavigate } from "react-router-dom";
import { adminActions, snackbarActions } from "../../../store/store.js";

const loginDetails = [
  {
    id: "adminId",
    labelText: "Enter your admin user id:",
    placeholder: "Enter your admin user id",
    type: "text",
  },
];

const AdminLogin = ({
  passwordVisible,
  handlePasswordVisible,
  handlePasswordInvisible,
}) => {
  const [formData, setFormData] = useState({
    adminId: "",
    adminPassword: "",
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn);
  const from = location.state?.from?.pathname || "/";

  // backend url
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isAdminLoggedIn, navigate, from]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData);

    try {
      const response = await axios.post(
        `${backendURL}/adminLogin.php`,
        formData
      );

      if (response.data.success) {
        const token = response.data.token;
        const adminId = response.data.adminId;

        // Dispatch the setUser action to store token and user info in Redux
        dispatch(
          adminActions.setUser({
            token: token,
            adminId: adminId,
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
      // console.error(
      //   "There was an error logging in:",
      //   error.response.data.message
      // );

      dispatch(
        snackbarActions.openBar({
          type: "error",
          message: error.response.data.message,
        })
      );
    }

    // Sending login data to PHP backend
  };
  return (
    <div className={styles.formContainer}>
      <h1>Admin Login</h1>
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

          <input type="submit" value="Log In" className={styles.userBtn} />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
