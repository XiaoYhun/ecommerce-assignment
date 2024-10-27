import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "", element: <Navigate to="/products" replace /> },
      { path: "products", Component: lazy(() => import("@/pages/ProductList")) },
      { path: "cart", Component: lazy(() => import("@/pages/Cart/index.tsx")) },
    ],
  },
]);
