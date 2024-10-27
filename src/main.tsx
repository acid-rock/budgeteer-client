import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/Root/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  // Default 404 page
  { errorElement: <NotFound /> },

  // All routes
  { path: "/", element: <App /> },
  { path: "login", element: <Login /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
