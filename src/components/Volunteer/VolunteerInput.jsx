import styles from "./Volunteer.module.css";

export default function VolunteerInput({ type, name, label, required }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        name={name}
        id={name}
        required={required === true && true}
      />
    </div>
  );
}
