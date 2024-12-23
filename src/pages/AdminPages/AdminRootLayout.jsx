import { Outlet } from "react-router-dom";
import SnackBar from "../../components/SnackBar/SnackBar.jsx";
import ScrollToTop from "../../utils/scrollToTop.js";

export default function AdminRootLayout() {
  return (
    <>
      <main>
        <ScrollToTop />
        <SnackBar />
        <Outlet />
      </main>
    </>
  );
}
