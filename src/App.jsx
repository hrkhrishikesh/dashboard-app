import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Home from "./components/Pages/Home";
import Dashboard from "./components/Pages/Dashboard";
import Users from "./components/Pages/Users";
import Settings from "./components/Pages/Settings";
import "./styles/main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "analytics",
        element: (
          <div className="p-5 text-center">
            Analytics Page Content (Coming Soon)
          </div>
        ),
      },
      {
        path: "reports",
        element: (
          <div className="p-5 text-center">
            Reports Page Content (Coming Soon)
          </div>
        ),
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
