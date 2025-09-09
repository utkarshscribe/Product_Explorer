import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";

const API_BASE = "https://dummyjson.com/products";

function ProductList({
  category,
  sortType,
  page,
  limit,
  setSelectedProductId,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  setLoading(true);
  setError("");
  let url = `${API_BASE}?limit=${limit}&skip=${(page - 1) * limit}`;
  if (category && category.trim() !== "")
    url = `${API_BASE}/category/${encodeURIComponent(category)}?limit=${limit}&skip=${(page - 1) * limit}`;

  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      setProducts(data.products);
      setLoading(false);
    })
    .catch(() => {
      setError("Failed to fetch products.");
      setLoading(false);
    });
}, [category, page, limit]);
  // Client-side sorting
  useEffect(() => {
    if (!products.length) return;
    let sorted = [...products];
    if (sortType === "price-asc")
      sorted.sort((a, b) => a.price - b.price);
    else if (sortType === "price-desc")
      sorted.sort((a, b) => b.price - a.price);
    else if (sortType === "title-asc")
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortType === "title-desc")
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    setProducts(sorted);
  }, [sortType]);

if (loading)
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-gray-500 text-lg animate-pulse select-none">
        Loading products...
      </div>
    </div>
  );

if (error)
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-red-500 text-lg select-none">
        {error}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} onClick={() => setSelectedProductId(prod.id)} />
        ))}
      </div>
    </AnimatePresence>
  );
}

export default ProductList;
