import AdminBookings from "../../components/Admin/AdminBookings/AdminBookings";
import AdminUser from "../../components/Admin/AdminUser/AdminUser";
import AdminRootLayout from "./AdminRootLayout";
import { Suspense } from "react";

import AdminPrivateRoute from "./AdminPrivateRoute";

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

const AdminPrivateRouteWrapper = ({ children }) => {
  return (
    <AdminPrivateRoute>
      <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
    </AdminPrivateRoute>
  );
};

const AdminRoutes = {
  path: "/admin",
  element: <AdminRootLayout />,
  children: [
    {
      index: true,
      element: (
        <SuspenseWrapper>
          <AdminUser />
        </SuspenseWrapper>
      ),
    },
    {
      path: "adminbookings",
      element: (
        <AdminPrivateRouteWrapper>
          <AdminBookings />
        </AdminPrivateRouteWrapper>
      ),
    },
  ],
};

export default AdminRoutes;
