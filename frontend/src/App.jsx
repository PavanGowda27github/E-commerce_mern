import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/product/:id", element: <ProductDetails /> },
  { path: "/admin/add-product", element: <AddProduct /> },
  { path: "/admin/products", element: <ProductList /> },
  { path: "/admin/products/edit/:id", element: <EditProduct /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
