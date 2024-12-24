import { useState } from "react";
import styles from "./AdminUser.module.css";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import AdminLogin from "./AdminLogin";

const AdminUser = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn); // Get login status from Redux

  if (isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
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
        <AdminLogin
          passwordVisible={passwordVisible}
          handlePasswordVisible={handlePasswordVisible}
          handlePasswordInvisible={handlePasswordInvisible}
        />
      </div>
    </>
  );
};

export default AdminUser;
