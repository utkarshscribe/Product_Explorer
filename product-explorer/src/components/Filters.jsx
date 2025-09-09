import React, { useEffect, useState } from "react";

const CATEGORY_API = "https://dummyjson.com/products/categories";

function Filters({ selectedCategory, setCategory, sortType, setSortType }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(CATEGORY_API)
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="flex gap-4 mb-6 flex-wrap justify-center">
      <select
        value={selectedCategory}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option value={cat.slug} key={cat.slug}>{cat.name}</option>
        ))}
      </select>
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
      </select>
    </div>
  );
}

export default Filters;
