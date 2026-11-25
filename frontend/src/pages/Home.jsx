import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products", {
        params: { search, category },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const categories = [
    { value: "", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Laptop", label: "Laptop" },
    { value: "Smartphone", label: "Smartphone" },
    { value: "Fashion", label: "Fashion" },
    { value: "Home", label: "Home & Kitchen" },
    { value: "Books", label: "Books" },
    { value: "Sports", label: "Sports" },
    { value: "Beauty", label: "Beauty" },
    { value: "Toys", label: "Toys" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-32 -mb-32" />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wide mb-4 backdrop-blur">
              🛍️ NEW SEASON DROPS
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
              Discover your{" "}
              <span className="text-amber-300">next favorite</span>
              <br className="hidden sm:block" /> product.
            </h1>
            <p className="text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
              Shop thousands of curated products across electronics, fashion,
              home and more — all in one place.
            </p>

            {/* Search bar inside hero */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-2xl">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-transparent text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="sm:w-48 px-4 py-3 rounded-xl bg-slate-50 border border-transparent text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {category ? category : "All Products"}
            </h2>
            <p className="text-sm text-slate-500">
              {loading
                ? "Loading..."
                : `${products.length} item${products.length !== 1 ? "s" : ""} found`}
              {search && !loading && ` for "${search}"`}
            </p>
          </div>

          {/* Active filter chip */}
          {(search || category) && !loading && (
            <button
              onClick={() => {
                setSearch("");
                setCategory("");
              }}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-slate-100" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              No products found
            </h3>
            <p className="text-sm text-slate-500 max-w-sm">
              We couldn't find anything matching your search. Try different
              keywords or clear the filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("");
              }}
              className="mt-5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
            >
              Reset filters
            </button>
          </div>
        ) : (
          /* PRODUCT GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Out of stock overlay */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                      <span className="px-3 py-1.5 bg-white text-slate-800 text-xs font-bold rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2 leading-snug group-hover:text-indigo-600 transition">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-slate-900">
                      ₹{product.price}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition">
                      View
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER STRIP */}
      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} ShopEase · Made with 💙 for modern
          shopping
        </div>
      </footer>
    </div>
  );
}
