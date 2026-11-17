import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch products
  useEffect(() => {
    let ignore = false;

    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        if (!ignore) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (!ignore) alert("Failed to load products");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, []);

  // Refresh products
  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error refreshing products:", error);
      alert("Failed to refresh products");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted successfully");
      await loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  // Search products
  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-indigo-600 mb-1">
              ADMIN DASHBOARD
            </p>
            <h1 className="text-3xl font-bold text-slate-800">Products</h1>
            <p className="text-slate-500 mt-1">
              Manage and organize your store products.
            </p>
          </div>

          <Link
            to="/admin/add-product"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-indigo-200 transition duration-200"
          >
            <span className="text-xl">+</span>
            Add New Product
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">Total Products</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {products.length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">In Stock</p>
            <h2 className="text-3xl font-bold text-emerald-600 mt-2">
              {products.filter((p) => Number(p.stock) > 0).length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">Out of Stock</p>
            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {products.filter((p) => Number(p.stock) <= 0).length}
            </h2>
          </div>
        </div>

        {/* Product Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Table Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">All Products</h2>
              <p className="text-sm text-slate-500 mt-1">
                View, edit and delete your products.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3 pl-4 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-slate-50 transition duration-150"
                    >
                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              product.image ||
                              "https://placehold.co/60x60?text=Product"
                            }
                            alt={product.title}
                            className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200"
                          />
                          <div>
                            <p className="font-semibold text-slate-800">
                              {product.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              ID: {product._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-semibold">
                          {product.category || "Uncategorized"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            Number(product.stock) > 0
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {Number(product.stock) > 0
                            ? `${product.stock} In Stock`
                            : "Out of Stock"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="px-3 py-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 text-sm font-semibold transition"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-16">
                      <div className="text-4xl mb-3">📦</div>
                      <h3 className="text-lg font-semibold text-slate-700">
                        No products found
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {search
                          ? "Try searching with a different product name."
                          : "Start by adding your first product."}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {products.length}
              </span>{" "}
              products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
