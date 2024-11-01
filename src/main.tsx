import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/Root/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ClerkProvider } from "@clerk/clerk-react";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardIndex from "./pages/Dashboard/DashboardIndex";
import Transactions from "./pages/Dashboard/Transactions";
import Protected from "./pages/Protected";
import Form from "./components/Form.tsx";
import TransactionList from "./pages/Dashboard/Transactions/TransactionsList";
import Overview from "./pages/Dashboard/Overview";

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
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
    children: [
      {
        path: "/dashboard/",
        element: (
          <Protected>
            <DashboardIndex />
          </Protected>
        ),
      },

      {
        path: "/dashboard/transactions",
        element: (
          <Protected>
            <Transactions />
          </Protected>
        ),
        children: [
          {
            path: "/dashboard/transactions/",
            element: (
              <Protected>
                <TransactionList />
              </Protected>
            ),
          },
          {
            path: "/dashboard/transactions/add",
            element: (
              <Protected>
                <Form mode="add" />
              </Protected>
            ),
          },

          {
            path: "/dashboard/transactions/edit/:id",
            element: (
              <Protected>
                <Form mode="edit" />
              </Protected>
            ),
          },
        ],
      },

      {
        path: "/dashboard/overview",
        element: (
          <Protected>
            <Overview />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
