import { lazy, Suspense } from "react";
import AdminHome from "../../components/Admin/AdminHome/AdminHome";

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

const AdventureParkUpdate = lazy(() =>
  import("../../components/Admin/AdventureParkUpdate/AdventureParkUpdate")
);

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
        <AdminPrivateRouteWrapper>
          <AdminHome />
        </AdminPrivateRouteWrapper>
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
    {
      path: "adventureparkupdate",
      element: (
        <AdminPrivateRouteWrapper>
          <AdventureParkUpdate />
        </AdminPrivateRouteWrapper>
      ),
    },
  ],
};

export default AdminRoutes;
