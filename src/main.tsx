import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/Root/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ClerkProvider } from "@clerk/clerk-react";
import Register from "./pages/Register";

// Clerk user auth
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing publishable key.");
}

const router = createBrowserRouter([
  // Default 404 page
  { errorElement: <NotFound /> },

  // All routes
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
