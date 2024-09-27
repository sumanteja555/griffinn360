import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./PaymentSuccess.module.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage after 10 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.tickContainer}>
        <i className={styles.tickmark}>✓</i>
      </div>
      <h1 className={styles.h1}>Payment Successful!</h1>
      <p className={styles.p}>
        You will receive the confirmation details to your email shortly. Thank
        You.
      </p>
    </div>
  );
};

export default PaymentSuccess;
