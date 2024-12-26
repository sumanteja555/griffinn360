import { lazy, Suspense } from "react";

// dynamic imports
const AdminBookings = lazy(() =>
  import("../../components/Admin/AdminBookings/AdminBookings")
);

const AdminVolunteers = lazy(() =>
  import("../../components/Admin/AdminVolunteers/AdminVolunteers")
);

const AdminUser = lazy(() =>
  import("../../components/Admin/AdminUser/AdminUser")
);

const AdminRootLayout = lazy(() => import("./AdminRootLayout"));

const AdminPrivateRoute = lazy(() => import("./AdminPrivateRoute"));

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
    {
      path: "adminvolunteers",
      element: (
        <AdminPrivateRouteWrapper>
          <AdminVolunteers />
        </AdminPrivateRouteWrapper>
      ),
    },
  ],
};

export default AdminRoutes;
