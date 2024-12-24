import { Outlet } from "react-router-dom";
import SnackBar from "../../components/SnackBar/SnackBar.jsx";
import ScrollToTop from "../../utils/scrollToTop.js";
import AdminNavbar from "../../components/Admin/AdminNavbar/AdminNavbar.jsx";

export default function AdminRootLayout() {
  return (
    <>
      <AdminNavbar />
      <main>
        <ScrollToTop />
        <SnackBar />
        <Outlet />
      </main>
    </>
  );
}
