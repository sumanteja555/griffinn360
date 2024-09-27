import styles from "./BookNow.module.css";

export default function Input({ type, id, placeholder, labelText, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className={styles.input}
        required
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.label}>
        {labelText}
      </label>
    </div>
  );
}
