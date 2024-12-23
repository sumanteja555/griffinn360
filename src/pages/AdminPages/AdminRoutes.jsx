import AdminBookings from "../../components/Admin/AdminBookings/AdminBookings";
import AdminUser from "../../components/Admin/User/AdminUser";
import AdminRootLayout from "./AdminRootLayout";
import { Suspense } from "react";

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

const AdminRoutes = {
  path: "/admin",
  element: <AdminRootLayout />,
  children: [
    {
      index: true,
      element: (
        <SuspenseWrapper>
          <AdminBookings />
        </SuspenseWrapper>
      ),
    },
    {
      path: "adminuser",
      element: (
        <SuspenseWrapper>
          <AdminUser />
        </SuspenseWrapper>
      ),
    },
  ],
};

export default AdminRoutes;
