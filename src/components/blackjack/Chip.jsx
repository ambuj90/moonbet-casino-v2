// ==========================================
// 6. components/Chip.jsx
// ==========================================

import React from 'react';
import { motion } from 'framer-motion';

export const Chip = ({ value, selected, onClick, disabled }) => {
  const chipColors = {
    1: 'bg-gray-500 border-gray-400',
    5: 'bg-green-600 border-green-500',
    10: 'bg-blue-600 border-blue-500',
    25: 'bg-purple-600 border-purple-500',
    50: 'bg-yellow-500 border-yellow-400',
    100: 'bg-gray-900 border-gray-700',
    200: 'bg-red-600 border-red-500',
    500: 'bg-pink-600 border-pink-500'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-14 h-14 rounded-full border-4
        ${chipColors[value] || 'bg-gray-700 border-gray-600'}
        ${selected ? 'ring-4 ring-yellow-400' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-200 shadow-lg
        flex items-center justify-center
      `}
    >
      <span className="text-white font-bold text-sm">${value}</span>
      <div className="absolute inset-1 rounded-full border border-white/20"></div>
    </motion.button>
  );
};

export default Chip;