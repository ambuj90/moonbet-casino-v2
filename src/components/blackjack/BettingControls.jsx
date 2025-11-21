// ==========================================
// 4. components/BettingControls.jsx
// ==========================================

import React from 'react';
import { motion } from 'framer-motion';
import { Chip } from './Chip';

export const BettingControls = ({
  betAmount,
  setBetAmount,
  isDemo,
  setIsDemo,
  onPlaceBet,
  isPlacingBet,
  maxBet
}) => {
  const chipValues = [1, 5, 10, 25, 50, 100, 200, 500];
  const availableChips = isDemo ? chipValues : chipValues.filter(v => v <= maxBet);

  const adjustBet = (multiplier) => {
    const newAmount = betAmount * multiplier;
    const max = isDemo ? 10000 : maxBet;
    setBetAmount(Math.max(1, Math.min(max, Math.floor(newAmount))));
  };

  return (
    <div className="space-y-4">
      {/* Chips */}
      <div className="flex justify-center gap-2 flex-wrap">
        {availableChips.map(value => (
          <Chip
            key={value}
            value={value}
            selected={betAmount === value}
            onClick={() => setBetAmount(value)}
            disabled={!isDemo && value > maxBet}
          />
        ))}
      </div>

      {/* Bet Input and Controls */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2 bg-[#0F212E] rounded-lg p-2">
          <button
            onClick={() => adjustBet(0.5)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-semibold transition-colors"
          >
            ½
          </button>
          
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Math.max(1, parseFloat(e.target.value) || 0))}
            className="w-24 bg-transparent text-center text-white font-semibold outline-none"
            disabled={isPlacingBet}
          />
          
          <button
            onClick={() => adjustBet(2)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-semibold transition-colors"
          >
            2×
          </button>
          
          <button
            onClick={() => setBetAmount(isDemo ? 1000 : maxBet)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-semibold transition-colors"
          >
            MAX
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPlaceBet}
          disabled={isPlacingBet}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors"
        >
          {isPlacingBet ? 'PLACING BET...' : 'DEAL CARDS'}
        </motion.button>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isDemo}
            onChange={(e) => setIsDemo(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-400">Demo Mode</span>
        </label>
      </div>
    </div>
  );
};

export default BettingControls;