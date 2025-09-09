import React, { useEffect, useState } from "react";

const CATEGORY_API = "https://dummyjson.com/products/categories";

function Filters({ selectedCategory, setCategory, sortType, setSortType }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(CATEGORY_API)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Could not load categories");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex gap-4 mb-6 flex-wrap justify-center">
      {/* Category Dropdown */}
      <div>
        <label htmlFor="category" className="mr-2 font-medium">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {loading && <option disabled>Loading...</option>}
          {!loading &&
            categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Sort Dropdown */}
      <div>
        <label htmlFor="sort" className="mr-2 font-medium">
          Sort
        </label>
        <select
          id="sort"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price (Low → High)</option>
          <option value="price-desc">Price (High → Low)</option>
          <option value="title-asc">Title (A → Z)</option>
          <option value="title-desc">Title (Z → A)</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
