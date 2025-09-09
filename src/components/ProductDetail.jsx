import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const API_BASE = "https://dummyjson.com/products";

function ProductDetail({ productId, close }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch product details whenever productId changes
  useEffect(() => {
    if (!productId) {
      setProduct(null);
      return;
    }

    setLoading(true);
    fetch(`${API_BASE}/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product:", err);
        setLoading(false);
      });
  }, [productId]);

  return (
    <AnimatePresence>
      {productId && (
        <motion.div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close} // close modal when background clicked
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // stop close when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 text-xl"
              onClick={close}
            >
              &times;
            </button>

            {/* Loading State */}
            {loading && <div className="text-center">Loading...</div>}

            {/* Product Details */}
            {!loading && product && (
              <>
                <h2 className="text-2xl font-bold mb-2">{product.title}</h2>

                {/* Product Images */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={product.title}
                      className="h-16 w-16 object-cover rounded"
                    />
                  ))}
                </div>

                {/* Description */}
                <p className="mb-2">{product.description}</p>

                {/* Brand & Category */}
                <div className="flex gap-4 text-sm mb-2">
                  <span>Brand: {product.brand}</span>
                  <span>Category: {product.category}</span>
                </div>

                {/* Rating, Stock, Price */}
                <div className="flex gap-4 text-sm">
                  <span>Rating: {product.rating}</span>
                  <span>Stock: {product.stock}</span>
                  <span className="font-bold text-green-600">
                    ${product.price}
                  </span>
                </div>
              </>
            )}

            {/* Error State */}
            {!loading && !product && (
              <div className="text-center text-red-500">
                Failed to load product details.
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProductDetail;
