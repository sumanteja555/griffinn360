import { useState } from "react";
import styles from "./User.module.css";

import Login from "./Login";
import Signup from "./Signup";

const User = () => {
  const [signup, setSignup] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

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
          <Signup
            handleToggle={handleToggle}
            passwordVisible={passwordVisible}
            handlePasswordVisible={handlePasswordVisible}
            handlePasswordInvisible={handlePasswordInvisible}
          />
        ) : (
          <Login
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
