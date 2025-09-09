import React, { useEffect, useState } from "react";

const API_BASE = "https://dummyjson.com/products";

function Pagination({ page, setPage, category, limit }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let url = category
      ? `${API_BASE}/category/${category}?limit=0`
      : `${API_BASE}?limit=0`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => setTotal(d.total))
      .catch(() => setTotal(0));
  }, [category]);

  const maxPage = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-blue-200 hover:bg-blue-400 disabled:opacity-50"
      >Prev</button>
      <span className="mx-3 text-lg">{page} / {maxPage}</span>
      <button
        onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
        disabled={page >= maxPage}
        className="px-3 py-1 rounded bg-blue-200 hover:bg-blue-400 disabled:opacity-50"
      >Next</button>
    </div>
  );
}

export default Pagination;
