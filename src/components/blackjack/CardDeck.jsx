// ==========================================
// 7. components/CardDeck.jsx
// ==========================================

import React from 'react';

export const CardDeck = ({ cardsRemaining = 312 }) => {
  return (
    <div className="absolute top-4 right-4 opacity-50">
      <div className="relative">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg shadow-lg"
            style={{
              width: '60px',
              height: '84px',
              top: `${i * -2}px`,
              left: `${i * -2}px`,
              zIndex: 5 - i
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-blue-200 font-bold text-xs">MB</div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mt-20 text-center">
        {cardsRemaining} cards
      </div>
    </div>
  );
};

export default CardDeck;