import styles from "./CancellationPolicy.module.css";

const CancellationPolicy = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Cancellation and refund policy</h1>
      <p>
        We understand that plans can change. You may need to cancel or
        reschedule your travel arrangements. To ensure a fair and transparent
        process, please review the following cancellation guidelines:
      </p>
    </section>
  );
};

export default CancellationPolicy;
