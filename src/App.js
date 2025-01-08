import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ErrorPage from "./pages/Error";
import DashboardPage from "./pages/Dashboard";
import ProtectedPages from "./layout/Protected";
import UnprotectedPages from "./layout/Unprotected";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import MenuComponent from "./components/Menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedPages />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/menu",
        element: <MenuComponent />
      }
    ],
  },
  {
    path: "/",
    element: <UnprotectedPages />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
