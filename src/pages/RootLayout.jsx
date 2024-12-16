import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavbarItem from "../components/Navbar/NavbarItem";
import SnackBar from "../components/SnackBar/SnackBar";
import ScrollToTop from "../utils/scrollToTop";

export default function RootLayout() {
  return (
    <>
      <NavbarItem />

      <main>
        <ScrollToTop />
        <SnackBar />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
