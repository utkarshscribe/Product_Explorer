import React, { useEffect, useState } from "react";

const API_BASE = "https://dummyjson.com/products";

function Pagination({ page, setPage, category, limit }) {
  const [total, setTotal] = useState(0);

  // Get total number of products when category changes
  useEffect(() => {
    let url = category
      ? `${API_BASE}/category/${category}?limit=0`
      : `${API_BASE}?limit=0`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.total);
      })
      .catch((err) => {
        console.error("Error fetching total:", err);
        setTotal(0);
      });
  }, [category]);

  // How many pages we need
  const maxPage = Math.ceil(total / limit);

  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      {/* Previous Button */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-blue-200 hover:bg-blue-400 disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Info */}
      <span className="mx-3 text-lg">
        {page} / {maxPage || 1}
      </span>

      {/* Next Button */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === maxPage}
        className="px-3 py-1 rounded bg-blue-200 hover:bg-blue-400 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
