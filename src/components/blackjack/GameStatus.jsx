// ==========================================
// 8. components/GameStatus.jsx
// ==========================================

import React from 'react';

export const GameStatus = ({ status }) => {
  const statusConfig = {
    disconnected: {
      icon: '⚠',
      title: 'Connection Lost',
      message: 'Unable to connect to game server. Please try again later.'
    },
    loading: {
      icon: '⏳',
      title: 'Loading',
      message: 'Connecting to game server...'
    },
    error: {
      icon: '❌',
      title: 'Error',
      message: 'An error occurred. Please refresh the page.'
    }
  };

  const config = statusConfig[status] || statusConfig.error;

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">{config.icon}</div>
        <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
        <p className="text-gray-400">{config.message}</p>
      </div>
    </div>
  );
};

export default GameStatus;