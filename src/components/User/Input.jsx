import styles from "./User.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { memo } from 'react';

const Input = memo(({ labelText, type, placeholder, id, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{labelText} :</label>
      <input
        required
        type={type} // Toggle type between password/text}
        placeholder={placeholder}
        name={id}
        id={id}
        onChange={onChange}
      />
    </div>
  );
};

export const PasswordInput = memo(({
  handlePasswordInvisible,
  handlePasswordVisible,
  handleChange,
  passwordVisible,
}) => {
  return (
    <div className={styles.passwordWrapper}>
      <label>Enter your password :</label>
      <input
        type={passwordVisible ? "text" : "password"}
        name="password"
        id="password"
        required
        placeholder="Enter Your Password"
        onChange={handleChange}
      />
      {passwordVisible ? (
        <VisibilityOffIcon
          className={styles.eyeIcon}
          onClick={handlePasswordInvisible}
        />
      ) : (
        <VisibilityIcon
          className={styles.eyeIcon}
          onClick={handlePasswordVisible}
        />
      )}
    </div>
  );
}

});  // Close PasswordInput memo

export default Input;  // Input is already memoized above
