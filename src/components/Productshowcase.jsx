import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductShowcase = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const products = [
    {
      id: 1,
      category: "Home & Living",
      title: "SOFA",
      price: "$899.99",
      image: "/api/placeholder/300/200", // Replace with actual sofa image
      bgColor: "bg-gray-100",
      accentColor: "border-gray-300",
      delay: 0,
    },
    {
      id: 2,
      category: "Clothing & Shoes",
      title: "SNEAKERS",
      price: "$159.99",
      image: "/api/placeholder/300/200", // Replace with actual sneakers image
      bgColor: "bg-blue-50",
      accentColor: "border-blue-300",
      delay: 0.1,
    },
    {
      id: 3,
      category: "Toys & Entertainment",
      title: "TOY TRAIN",
      price: "$49.99",
      image: "/api/placeholder/300/200", // Replace with actual toy train image
      bgColor: "bg-yellow-50",
      accentColor: "border-yellow-300",
      delay: 0.2,
    },
    {
      id: 4,
      category: "Toys & Entertainment",
      title: "TOY TRAIN",
      price: "$79.99",
      image: "/api/placeholder/300/200", // Replace with actual toy train image
      bgColor: "bg-orange-50",
      accentColor: "border-orange-300",
      delay: 0.3,
    },
    {
      id: 5,
      category: "Home & Garden",
      title: "PARTY DECORS",
      price: "$34.99",
      image: "/api/placeholder/300/200", // Replace with actual party decors image
      bgColor: "bg-green-50",
      accentColor: "border-green-300",
      delay: 0.4,
    },
    {
      id: 6,
      category: "Jewelry & Accessories",
      title: "DIAMOND RING",
      price: "$2,999.99",
      discount: "Special Offer",
      image: "/api/placeholder/300/200", // Replace with actual ring image
      bgColor: "bg-pink-50",
      accentColor: "border-pink-300",
      delay: 0.5,
    },
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Hover animation for cards
  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Image animation on hover
  const imageVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: [-1, 1, -1, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut",
        },
        scale: {
          duration: 0.3,
        },
      },
    },
  };

  // Badge animation
  const badgeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.2,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg">
            Discover our amazing collection of premium items
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
            >
              <motion.div
                variants={cardHoverVariants}
                className={`${product.bgColor} rounded-2xl overflow-hidden shadow-lg 
                         border-2 ${product.accentColor} relative cursor-pointer
                         transition-shadow duration-300 hover:shadow-2xl`}
              >
                {/* Category Label */}
                <div className="absolute top-4 left-4 z-10">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: product.delay + 0.3 }}
                    className="text-xs text-gray-600 font-medium tracking-wide"
                  >
                    {product.category}
                  </motion.span>
                </div>

                {/* Discount Badge */}
                {product.discount && (
                  <motion.div
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="absolute top-4 right-4 z-10"
                  >
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.discount}
                    </span>
                  </motion.div>
                )}

                {/* Product Image Container */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-white/50">
                  <motion.div
                    variants={imageVariants}
                    initial="initial"
                    animate={hoveredCard === product.id ? "hover" : "initial"}
                    className="w-full h-full flex items-center justify-center p-4"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                      {/* Replace with actual image */}
                      <span className="text-gray-500 text-sm">
                        Product Image
                      </span>
                    </div>
                  </motion.div>

                  {/* Floating elements on hover */}
                  <AnimatePresence>
                    {hoveredCard === product.id && (
                      <>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.3 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl"
                        />
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.3 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ delay: 0.1 }}
                          className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl"
                        />
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: product.delay + 0.4 }}
                    className="text-2xl font-bold text-gray-800 mb-2"
                  >
                    {product.title}
                  </motion.h3>

                  <div className="flex items-center justify-between">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: product.delay + 0.5 }}
                      className="text-xl font-semibold text-gray-700"
                    >
                      {product.price}
                    </motion.span>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: product.delay + 0.5 }}
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg 
                               hover:bg-gray-700 transition-colors duration-200
                               flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Add</span>
                    </motion.button>
                  </div>
                </div>

                {/* Hover Overlay Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === product.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
                />
              </motion.div>

              {/* Shadow effect on hover */}
              <AnimatePresence>
                {hoveredCard === product.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 
                             rounded-2xl blur-2xl -z-10"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                     text-white font-bold rounded-xl shadow-lg 
                     hover:shadow-xl transition-all duration-300"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
