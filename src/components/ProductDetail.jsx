import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const API_BASE = "https://dummyjson.com/products";

function ProductDetail({ productId, close }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(""); 

  
  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setMainImage("");
      return;
    }

    setLoading(true);
    fetch(`${API_BASE}/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.images[0]); 
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
          onClick={close}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative flex"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600"
              onClick={close}
            >
              &times;
            </button>

            {/* Loading State */}
            {loading && (
              <div className="w-full text-center">Loading...</div>
            )}

            {/* Product Details */}
            {!loading && product && (
              <div className="flex flex-col md:flex-row gap-6 w-full">
                
                <div className="md:w-1/2 flex flex-col items-center">
                  {/* Main Image */}
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="w-full max-h-64 object-contain rounded mb-4"
                  />
                  {/* Thumbnails */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {product.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={product.title}
                        className={`h-16 w-16 object-cover rounded border cursor-pointer ${
                          mainImage === img ? "border-blue-500" : ""
                        }`}
                        onClick={() => setMainImage(img)} 
                      />
                    ))}
                  </div>
                </div>

                {/* Right Side: Info */}
                <div className="md:w-2/3 flex flex-col">
                  <h2 className="text-2xl font-bold mb-2 text-blue-600">
                    {product.title}
                  </h2>

                  <p className="mb-2 text-gray-700">
                    {product.description}
                  </p>

                  <div className="flex gap-4 text-sm mb-2 text-gray-600">
                    <span>Brand: {product.brand}</span>
                    <span>Category: {product.category}</span>
                  </div>

                  <div className="flex gap-4 text-sm mb-2 text-gray-600">
                    <span>Rating: {product.rating}</span>
                    <span>Stock: {product.stock}</span>
                  </div>

                  <span className="text-xl font-bold text-green-600 mt-4">
                    Price: ${product.price}
                  </span>
                </div>
              </div>
            )}

            {/* Error State */}
            {!loading && !product && (
              <div className="w-full text-center text-red-500">
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
