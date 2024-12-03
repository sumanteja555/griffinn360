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

      <h3>Cancellation Window:</h3>
      <ul>
        <li>61 days and above- Full refund provided.</li>
        <li>45-60 days prior to trip start date- 50% refund provided.</li>
        <li>30-45 days prior to trip start date- 30% refund provided.</li>
        <li>
          0-30 days prior to the trip start date- NO refund. 100% of tour cost
          is forfeited.
        </li>
      </ul>
      <p>
        Any booking amount for airline / railway, or other pre-purchased travel
        tickets are non-refundable.
      </p>

      <h3>No-Show policy</h3>
      <p>
        If you fail to join a trip or cancel without prior notice, no refunds
        will be issued. Please inform us promptly if you cannot make it to your
        scheduled adventure.
      </p>

      <h3>Refund Processing</h3>
      <p>
        Refunds, if applicable, will be processed within 30 days of receiving
        your cancellation request in writing. Please drop a mail with your
        contact details to info@griffinnadventures.com.
      </p>
      <p>
        Any cancellations sent on weekends or public holidays will be considered
        on the next working day.
      </p>

      <h3>
        Note: Tailor-made tours may be subject to alternative cancellation
        terms, which will be communicated individually
      </h3>

      <p>
        Please note that the above policy may be subject to specific terms and
        conditions for individual trips. We encourage you to review the
        cancellation policy provided with your trip itinerary for any additional
        details or modifications that may apply.
      </p>

      <p>
        If you have any questions or require further clarification, please do
        not hesitate to contact our team. We look forward to assisting you with
        your travel adventures.
      </p>
    </section>
  );
};

export default CancellationPolicy;
