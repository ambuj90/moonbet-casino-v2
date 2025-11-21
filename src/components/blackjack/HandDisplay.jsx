// ==========================================
// 3. components/HandDisplay.jsx
// ==========================================

import React from 'react';
import { Card } from './Card';

export const HandDisplay = ({ hand, isDealer = false, isCurrent = false, outcome = null }) => {
  if (!hand) {
    return (
      <div className="flex justify-center items-center min-h-[140px]">
        <div className="w-20 h-28 md:w-24 md:h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-xs">
            {isDealer ? 'Dealer Cards' : 'Your Cards'}
          </span>
        </div>
      </div>
    );
  }

  const getContainerClass = () => {
    let classes = 'relative p-4 rounded-xl transition-all duration-300';
    
    if (isCurrent && !isDealer) {
      classes += ' ring-2 ring-blue-400 bg-blue-500/10';
    }
    
    if (outcome) {
      switch (outcome.result) {
        case 'win':
        case 'blackjack':
          classes += ' ring-2 ring-green-400 bg-green-500/10';
          break;
        case 'loss':
        case 'bust':
          classes += ' ring-2 ring-red-400 bg-red-500/10';
          break;
        case 'push':
          classes += ' ring-2 ring-yellow-400 bg-yellow-500/10';
          break;
      }
    }
    
    return classes;
  };

  return (
    <div className={getContainerClass()}>
      <div className="flex justify-center items-center min-h-[140px]">
        <div className="flex">
          {hand.cards && hand.cards.length > 0 ? (
            hand.cards.map((card, i) => (
              <Card
                key={i}
                card={card}
                hidden={isDealer && hand.hidden && i === 1}
                index={i}
              />
            ))
          ) : (
            <div className="w-20 h-28 md:w-24 md:h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-xs">Empty</span>
            </div>
          )}
        </div>
      </div>

      {hand.value > 0 && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className={`
            px-3 py-1 rounded-full text-white font-bold text-sm
            ${hand.value > 21 ? 'bg-red-500' : hand.value === 21 ? 'bg-green-500' : 'bg-gray-700'}
          `}>
            {hand.value}
          </div>
        </div>
      )}

      {outcome && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className={`
            px-3 py-1 rounded-full text-white font-bold text-xs uppercase
            ${outcome.result === 'win' || outcome.result === 'blackjack' ? 'bg-green-500' : 
              outcome.result === 'loss' || outcome.result === 'bust' ? 'bg-red-500' : 
              'bg-yellow-500'}
          `}>
            {outcome.result}
          </div>
        </div>
      )}
    </div>
  );
};

export default HandDisplay;