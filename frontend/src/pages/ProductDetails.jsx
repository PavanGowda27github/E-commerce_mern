import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      const p = response.data.find((item) => item._id === id);
      if (!p) {
        setError("Product not found.");
        return;
      }
      setProduct(p);
    } catch (err) {
      console.error("Error loading product:", err);
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Hook up your cart logic here
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // --- Loading skeleton ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-4 w-40 bg-slate-200 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="aspect-square bg-slate-100 rounded-3xl animate-pulse" />
            <div className="space-y-5 animate-pulse">
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-9 w-3/4 bg-slate-200 rounded" />
              <div className="h-6 w-32 bg-slate-200 rounded" />
              <div className="space-y-2 pt-4">
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-2/3 bg-slate-100 rounded" />
              </div>
              <div className="h-12 w-full bg-slate-200 rounded-xl pt-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Error state ---
  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">😕</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            {error || "Product not found"}
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            The product you're looking for may have been removed or is
            unavailable.
          </p>
          <Link
            to="/"
            className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const inStock = product.stock == null || product.stock > 0;
  const maxQty = product.stock ?? 99;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <span>›</span>
          {product.category && (
            <>
              <span className="text-slate-400">{product.category}</span>
              <span>›</span>
            </>
          )}
          <span className="text-slate-800 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — Image */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-square bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Category badge */}
              {product.category && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold bg-white/90 backdrop-blur text-slate-700 rounded-full shadow-sm">
                  {product.category}
                </span>
              )}

              {/* Out-of-stock overlay */}
              {!inStock && (
                <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                  <span className="px-4 py-2 bg-white text-slate-800 text-sm font-bold rounded-full">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: "🚚", label: "Free shipping" },
                { icon: "↩️", label: "7-day returns" },
                { icon: "🛡️", label: "Secure payment" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl border border-slate-200 text-center"
                >
                  <span className="text-lg">{b.icon}</span>
                  <span className="text-xs text-slate-600 font-medium">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="flex flex-col">
            {/* Title + price */}
            <div className="mb-5">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold text-slate-900">
                  ₹{product.price}
                </p>
                <span className="text-sm text-slate-400 line-through">
                  ₹{Math.round(product.price * 1.25)}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  20% OFF
                </span>
              </div>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-5">
              {inStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600">
                    In Stock
                  </span>
                  {product.stock != null && (
                    <span className="text-sm text-slate-400">
                      · {product.stock} units available
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm font-medium text-red-600">
                    Out of Stock
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                Description
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            {/* Specs */}
            <div className="mb-6 bg-white rounded-2xl border border-slate-200 p-4">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-slate-500">Category</dt>
                  <dd className="font-medium text-slate-800">
                    {product.category || "—"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-auto space-y-4 bg-white rounded-2xl border border-slate-200 p-5 lg:sticky lg:bottom-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700">
                  Quantity
                </span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={!inStock || quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    disabled={!inStock || quantity >= maxQty}
                    className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex-1 font-semibold py-3 px-4 rounded-xl shadow-md transition transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.02] focus:ring-indigo-500"
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  {added
                    ? "✓ Added to Cart"
                    : inStock
                      ? "Add to Cart"
                      : "Out of Stock"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-4 py-3 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium rounded-xl transition"
                >
                  Back
                </button>
              </div>

              <p className="text-xs text-center text-slate-400">
                Free delivery on orders above ₹499 · Cash on delivery available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
