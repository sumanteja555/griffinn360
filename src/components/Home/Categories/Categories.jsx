import Item from "./Item.jsx";
import styles from "./Categories.module.css";

import { categories } from "../../../utils/Home.js";

export default function Categories() {
  return (
    <section className={styles.container}>
      {categories.map((item) => {
        return <Item {...item} key={item.title} />;
      })}
    </section>
  );
}
