import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const API_BASE = "https://dummyjson.com/products";

function ProductDetail({ productId, close }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      return;
    }
    setLoading(true);
    fetch(`${API_BASE}/${productId}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  return (
    <AnimatePresence>
      {productId && (
        <motion.div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-xl"
              onClick={close}
            >
              &times;
            </button>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : product ? (
              <>
                <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                <div className="flex gap-4 mb-4 flex-wrap">
                  {product.images.map((imgUrl, i) => (
                    <img key={i} src={imgUrl} alt="" className="h-16 w-16 object-cover rounded" />
                  ))}
                </div>
                <p className="mb-2">{product.description}</p>
                <div className="flex gap-4 text-sm mb-2">
                  <span>Brand: {product.brand}</span>
                  <span>Category: {product.category}</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span>Rating: {product.rating}</span>
                  <span>Stock: {product.stock}</span>
                  <span className="font-bold text-green-600">${product.price}</span>
                </div>
              </>
            ) : (
              <div className="text-center text-red-500">Failed to load product details.</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProductDetail;
