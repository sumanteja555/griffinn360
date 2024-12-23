import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRoutes from "./pages/UserRoutes";

const router = createBrowserRouter([{ ...UserRoutes }]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
