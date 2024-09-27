import VolunteerInput from "./VolunteerInput";
import volunteer from "../../utils/volunteer";

import styles from "./Volunteer.module.css";

export default function Volunteer() {
  return (
    <section className={styles.container}>
      <p className="mainHeading">Volunteer</p>
      {volunteer.map((item) => (
        <VolunteerInput {...item} key={item.name} />
      ))}

      <fieldset className={styles.fieldset}>
        <label htmlFor="" className={styles.label}>
          I love to contribute in the following ways:
        </label>

        <div>
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Write and Maintain Blog</label>
        </div>
        <div>
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Newsletter Editorial Team</label>
        </div>

        <div>
          <input type="checkbox" />
          <label htmlFor="">Manage Social Media</label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="">Graphic Design and Videos for Promotions</label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="">Get Sponsors for Club Events</label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="">Maintain Knowledge wiki / articles</label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor=""></label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor=""></label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor=""></label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor=""></label>
        </div>
      </fieldset>

      <div className={styles.btnContainer}>
        <button className={styles.btn}>Submit</button>
      </div>
    </section>
  );
}
