import { NavLink } from "react-router";
import styles from "./AdminHome.module.css";

const routes = [
  {
    name: "Bookings",
    path: "/admin/adminbookings",
  },
  {
    name: "Volunteers",
    path: "/admin/adminvolunteers",
  },
  {
    name: "Adventure Park Update",
    path: "/admin/adventureparkupdate",
  },
];

const AdminHome = () => {
  return (
    <section className={styles.container}>
      {routes.map(({ name, path }) => (
        <NavLink to={path} key={path} className={styles.link}>
          {name}
        </NavLink>
      ))}
    </section>
  );
};

export default AdminHome;
