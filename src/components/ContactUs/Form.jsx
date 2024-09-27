import styles from "./ContactUs.module.css";

export default function Form() {
  return (
    <form action="">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name:"
        className={styles.input}
      />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your Email Id"
        className={styles.input}
      />
      <input
        type="number"
        id="number"
        name="number"
        placeholder="Enter your mobile Number "
        className={styles.input}
      />
      <select name="type" id="type" className={styles.select}>
        <option className={styles.option}>Select an option</option>
        <option value="" className={styles.option}>
          Treks
        </option>
        <option value="" className={styles.option}>
          Tours
        </option>
        <option value="" className={styles.option}>
          Travels
        </option>
      </select>
      <textarea
        name="message"
        id="message"
        className={styles.message}
        cols="30"
        rows="10"
        placeholder="Message"
      ></textarea>
      <div id={styles.submitContainer}>
        <input type="submit" value="Submit" className={styles.submit} />
      </div>
    </form>
  );
}
