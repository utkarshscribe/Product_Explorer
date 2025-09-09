import React from "react";
import { motion } from "framer-motion";

function ProductCard({ product, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: "0 5px 20px rgba(0,0,0,0.1)" }}
      className="bg-white border border-gray-200 rounded-xl cursor-pointer flex flex-col p-4 shadow-sm"
      onClick={onClick}
    >
      <div className="flex justify-center mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-auto object-contain"
        />
      </div>
      <p className="text-gray-600 text-sm min-h-[60px]">
        {product.description}
      </p>
      <div className="mt-auto flex justify-end">
        <span className="bg-gray-100 text-gray-400 text-xs rounded-full px-3 py-1 select-none">
          {product.category}
        </span>
      </div>
    </motion.div>
  );
}

export default ProductCard;
