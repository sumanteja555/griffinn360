import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRoutes from "./pages/UserRoutes";
import AdminRoutes from "./pages/AdminPages/AdminRoutes";

const router = createBrowserRouter([UserRoutes, AdminRoutes]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
