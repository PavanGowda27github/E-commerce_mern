import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch product details
  useEffect(() => {
    let ignore = false;

    const fetchProduct = async () => {
      try {
        const response = await api.get("/products");
        const productData = response.data.find((product) => product._id === id);

        if (!productData) {
          setError("Product not found. Redirecting...");
          setTimeout(() => navigate("/admin/products"), 1500);
          return;
        }

        if (!ignore) {
          setForm({
            title: productData.name || "",
            description: productData.description || "",
            price: productData.price ?? "",
            category: productData.category || "",
            image: productData.image || "",
            stock: productData.stock ?? "",
          });
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        if (!ignore) {
          setError("Failed to load product. Redirecting...");
          setTimeout(() => navigate("/admin/products"), 1500);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");
    try {
      await api.put(`/products/update/${id}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setSuccess(true);
      setTimeout(() => navigate("/admin/products"), 1200);
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  // --- Loading skeleton ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
          <div className="h-5 w-40 bg-slate-200 rounded mb-3" />
          <div className="h-9 w-64 bg-slate-200 rounded mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-28 bg-slate-200 rounded mb-2" />
                  <div className="h-11 w-full bg-slate-100 rounded-xl" />
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="aspect-square w-full bg-slate-100 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition"
              aria-label="Back to products"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-slate-900 truncate">
                Edit Product
              </h1>
              <p className="text-xs text-slate-500 truncate">
                #{id} · Update details and save
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="edit-product-form"
              disabled={updating || success}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-600/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <span className="text-red-500 text-lg leading-none">⚠</span>
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-emerald-500 text-lg leading-none">✓</span>
            <p className="text-sm font-medium text-emerald-700">
              Product updated successfully. Redirecting...
            </p>
          </div>
        )}

        <form
          id="edit-product-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT — Main details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6 pb-4 border-b border-slate-100">
                Basic Information
              </h2>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe the product features, materials, and benefits..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition resize-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                    <span>Be clear and descriptive</span>
                    <span>{form.description.length} characters</span>
                  </div>
                </div>

                {/* Price + Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
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
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
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
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Electronics"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Image + status */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6 pb-4 border-b border-slate-100">
                Product Image
              </h2>

              <div className="aspect-square w-full rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden mb-4 relative">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div
                  className={`text-center text-slate-400 px-4 ${form.image ? "hidden" : ""}`}
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-2 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs">Image preview</p>
                </div>
              </div>

              <label
                htmlFor="image"
                className="block text-sm font-medium text-slate-700 mb-1.5"
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
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition text-sm"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Paste a direct link to your product image.
              </p>
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 pb-4 border-b border-slate-100">
                Summary
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Product ID</dt>
                  <dd className="font-mono text-xs text-slate-700 truncate max-w-[120px]">
                    {id}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Status</dt>
                  <dd className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Stock</dt>
                  <dd className="font-medium text-slate-800">
                    {form.stock || 0} units
                  </dd>
                </div>
              </dl>
            </div>

            {/* Mobile actions */}
            <div className="sm:hidden space-y-3">
              <button
                type="submit"
                disabled={updating || success}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="w-full border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-xl transition"
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
