import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>PRIVACY POLICY</h1>

      <p>
        Griff-In Adventures deeply respects your privacy and always strives to
        protect your personal information that you provide to us when you use
        our website (www.griffinnadventures.com).
      </p>
      <p>
        This Privacy Policy describes how we treat personal information received
        about you when you visit our website.
      </p>
      <ul>
        <li>
          Information we collect : <br />
          During bookings, or at the time of sending a query, your personal
          information that helps identify you (name, number, address) is
          collected by our website.
        </li>
        <li>
          Cookies : <br />
          Some webpages of our websites use cookies, to help us serve you
          better, with tailor-made services that suit your liking. Cookies are
          identifiers which a website can send to your browser to keep on your
          computer to facilitate your next visit on our site.
        </li>
        <li>
          Third-Parties : <br />
          Griff-In (company) does not sell, disclose or trade your information
          to any third parties without the consent of the customer, except in
          cases required by subpoena, search warrant or other legal processes.
        </li>
        <li>
          Safety : <br />
          The company will take appropriate steps to protect the information you
          share with us. We have implemented technology and security features
          and strict policy guidelines to safeguard the privacy of your
          personally identifiable information from unauthorized access and
          improper use or disclosure.
        </li>
        <li>
          Security : <br /> Griff-In Adventures will continue to enhance our
          security procedures as new technology becomes available.
        </li>
        <li>
          Comments and Questions : <br />
          If you have any questions, comments or concerns about our Privacy
          Policy, please contact us.
        </li>
      </ul>
    </section>
  );
};

export default PrivacyPolicy;
