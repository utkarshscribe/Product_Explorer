import React from "react";
import { motion } from "framer-motion";

function ProductCard({ product, onClick }) {
  return (
    <motion.div
      // Simple animation when card shows up
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white border rounded-lg shadow-sm p-4 cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="flex justify-center mb-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-36 w-auto object-contain"
        />
      </div>

      {/* Product Title */}
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        {product.title}
      </h2>

      {/* Product Description */}
      <p className="text-sm text-gray-600 mb-3">
        {product.description}
      </p>

      {/* Price + Category */}
      <div className="flex justify-between items-center mt-auto">
        <span className="font-bold text-gray-800">${product.price}</span>
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>
    </motion.div>
  );
}

export default ProductCard;
