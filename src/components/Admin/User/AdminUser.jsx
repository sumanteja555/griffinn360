import { useState } from "react";
import styles from "./User.module.css";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import AdminLogin from "./AdminLogin";
import AdminSignup from "./AdminSignup";

const User = () => {
  const [signup, setSignup] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Get login status from Redux

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  function handleToggle() {
    setSignup(!signup);
  }

  function handlePasswordVisible() {
    setPasswordVisible(true);
  }

  function handlePasswordInvisible() {
    setPasswordVisible(false);
  }
  return (
    <>
      <div className={styles.userContainer}>
        {signup ? (
          <AdminSignup
            handleToggle={handleToggle}
            passwordVisible={passwordVisible}
            handlePasswordVisible={handlePasswordVisible}
            handlePasswordInvisible={handlePasswordInvisible}
          />
        ) : (
          <AdminLogin
            handleToggle={handleToggle}
            passwordVisible={passwordVisible}
            handlePasswordVisible={handlePasswordVisible}
            handlePasswordInvisible={handlePasswordInvisible}
          />
        )}
      </div>
    </>
  );
};

export default User;