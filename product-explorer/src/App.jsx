import React, { useState } from "react";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import ProductDetail from "./components/ProductDetail";

const PRODUCTS_LIMIT = 9;

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Reset to first page when filter changes
  const handleCategory = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Showcase Explorer</h1>
      <Filters
        selectedCategory={selectedCategory}
        setCategory={handleCategory}
        sortType={sortType}
        setSortType={setSortType}
      />
      <ProductList
        category={selectedCategory}
        sortType={sortType}
        page={page}
        limit={PRODUCTS_LIMIT}
        setSelectedProductId={setSelectedProductId}
      />
      <Pagination
        page={page}
        setPage={setPage}
        category={selectedCategory}
        limit={PRODUCTS_LIMIT}
      />
      <ProductDetail
        productId={selectedProductId}
        close={() => setSelectedProductId(null)}
      />
    </div>
  );
}

export default App;
