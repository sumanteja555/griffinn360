import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavbarItem from "../components/Navbar/NavbarItem";

export default function RootLayout() {
  return (
    <>
      <NavbarItem />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
