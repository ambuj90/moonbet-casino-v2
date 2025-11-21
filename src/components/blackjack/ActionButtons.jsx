// ==========================================
// 5. components/ActionButtons.jsx
// ==========================================

import React from 'react';
import { motion } from 'framer-motion';

export const ActionButtons = ({
  availableActions = [],
  onHit,
  onStand,
  onDouble,
  onSplit,
  onInsurance,
  onSurrender
}) => {
  const actions = [
    { key: 'hit', label: 'Hit', icon: '👆', color: 'bg-blue-600 hover:bg-blue-700', handler: onHit },
    { key: 'stand', label: 'Stand', icon: '✋', color: 'bg-green-600 hover:bg-green-700', handler: onStand },
    { key: 'double', label: 'Double', icon: '×2', color: 'bg-purple-600 hover:bg-purple-700', handler: onDouble },
    { key: 'split', label: 'Split', icon: '↔', color: 'bg-orange-600 hover:bg-orange-700', handler: onSplit },
    { key: 'insurance', label: 'Insurance', icon: '🛡', color: 'bg-cyan-600 hover:bg-cyan-700', handler: onInsurance },
    { key: 'surrender', label: 'Surrender', icon: '🏳', color: 'bg-red-600 hover:bg-red-700', handler: onSurrender }
  ];

  return (
    <div className="flex justify-center gap-2">
      {actions.map(action => (
        <motion.button
          key={action.key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.handler}
          disabled={!availableActions.includes(action.key)}
          className={`
            px-4 py-3 rounded-lg font-semibold transition-all
            ${availableActions.includes(action.key) ? action.color : 'bg-gray-700 opacity-50 cursor-not-allowed'}
            flex flex-col items-center gap-1 min-w-[80px]
          `}
        >
          <span className="text-lg">{action.icon}</span>
          <span className="text-xs">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ActionButtons;