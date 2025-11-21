// ==========================================
// 9. ActiveBetsPanel.jsx - Public Bets Display
// ==========================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useBlackjackStore from '../../store/useBlackjackStore';

export const ActiveBetsPanel = () => {
  const { publicBets, recentWins } = useBlackjackStore();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-semibold">Live Bets</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <AnimatePresence>
          {publicBets.slice(0, 20).map((bet) => (
            <motion.div
              key={bet.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`
                p-3 rounded-lg bg-[#0F212E] border
                ${bet.status === 'active' ? 'border-blue-500/50' : 
                  bet.outcome === 'win' ? 'border-green-500/50' : 
                  bet.outcome === 'loss' ? 'border-red-500/50' : 
                  'border-yellow-500/50'}
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-sm">{bet.username}</div>
                  <div className="text-xs text-gray-400">
                    Bet: ${bet.betAmount}
                  </div>
                </div>
                <div className="text-right">
                  {bet.status === 'active' ? (
                    <span className="text-xs text-blue-400">Playing...</span>
                  ) : (
                    <>
                      <div className={`text-xs font-semibold ${
                        bet.outcome === 'win' ? 'text-green-400' : 
                        bet.outcome === 'loss' ? 'text-red-400' : 
                        'text-yellow-400'
                      }`}>
                        {bet.outcome?.toUpperCase()}
                      </div>
                      {bet.payout > 0 && (
                        <div className="text-xs text-gray-400">
                          +${bet.payout.toFixed(2)}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {recentWins.length > 0 && (
        <div className="p-4 border-t border-gray-800">
          <h4 className="text-sm font-semibold mb-2 text-yellow-400">Recent Big Wins</h4>
          <div className="space-y-1">
            {recentWins.slice(0, 3).map((win, i) => (
              <div key={i} className="text-xs flex justify-between">
                <span className="text-gray-400">
                  {win.multiplier.toFixed(1)}x
                </span>
                <span className="text-green-400 font-semibold">
                  +${win.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveBetsPanel;