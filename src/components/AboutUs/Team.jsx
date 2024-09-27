import Accordion from "react-bootstrap/Accordion";

import styles from "./AboutUs.module.css";

function Team({ img, title, no, points, info }) {
  return (
    <Accordion.Item eventKey={no}>
      <Accordion.Header className={styles.teamHeading}>
        {title}
      </Accordion.Header>
      <Accordion.Body className={styles.teamBody}>
        <img src={img} alt={title} className={styles.teamImg} />
        <div className={styles.teamInfoDiv}>
          <ul>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {info && <p>{info}</p>}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Team;
