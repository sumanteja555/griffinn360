import styles from "./ContactUs.module.css";

import Form from "./Form.jsx";
import Info from "./Info.jsx";

export default function ContactUs() {
  return (
    <>
      <section className="mainContainer">
        <p className="mainHeading">Contact Us</p>
        <div className={styles.container}>
          <div id={styles.formContainer}>
            <p>Drop us your query. We will get in touch with you.</p>
            <Form />
          </div>
          <div id={styles.infoContainer}>
            <p>Wanna talk to us:</p>
            <Info />
          </div>
        </div>
      </section>
    </>
  );
}
