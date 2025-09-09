import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AnimatePresence } from "framer-motion";

const API_BASE = "https://dummyjson.com/products";

function ProductList({ category, sortType, page, limit, setSelectedProductId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products whenever category/page/limit changes
  useEffect(() => {
    setLoading(true);
    setError("");

    // Build API URL
    let url = `${API_BASE}?limit=${limit}&skip=${(page - 1) * limit}`;
    if (category && category.trim() !== "") {
      url = `${API_BASE}/category/${encodeURIComponent(category)}?limit=${limit}&skip=${(page - 1) * limit}`;
    }

    // Fetch products
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products.");
        setLoading(false);
      });
  }, [category, page, limit]);

  // Sort products whenever sortType changes
  useEffect(() => {
    if (!products.length) return;

    let sorted = [...products];
    if (sortType === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortType === "title-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "title-desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    setProducts(sorted);
  }, [sortType]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-500 text-lg animate-pulse">
          Loading products...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  // Product grid
  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onClick={() => setSelectedProductId(prod.id)}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}

export default ProductList;
