import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/products/add", form);
      navigate("/admin/products");
    } catch (err) {
      console.error("Error adding product:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add product. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Books",
    "Toys",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 transition"
            aria-label="Back to products"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Add New Product
            </h1>
            <p className="text-sm text-gray-500">
              Fill in the details below to list a product in your store.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* LEFT — Main details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Product Information
              </h2>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Wireless Noise-Cancelling Headphones"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe the product features, materials, and benefits..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    {form.description.length} characters
                  </p>
                </div>

                {/* Price + Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      step="1"
                      placeholder="0"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Image + actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Product Image
              </h2>

              <div className="aspect-square w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden mb-4">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="text-center text-gray-400 px-4">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-xs">Image preview will appear here</p>
                  </div>
                )}
              </div>

              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Paste a direct link to your product image.
              </p>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? "Adding product..." : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
