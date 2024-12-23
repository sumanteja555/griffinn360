const AdminRoutes = {
  path: "/admin",
  element: <RootLayout />,
  // errorElement: <Error />,
  children: [
    {
      index: true,
      element: (
        <Suspense>
          <HomePage />
        </Suspense>
      ),
    },
  ],
};

export default AdminRoutes;
