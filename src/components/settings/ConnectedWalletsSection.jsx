// src/components/settings/ConnectedWalletsSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const ConnectedWalletsSection = () => {
  const [wallets, setWallets] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);

    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      // Add wallet connection logic here
      console.log("Connect wallet clicked");
    }, 1000);
  };

  const handleDisconnectWallet = (walletId) => {
    setWallets(wallets.filter((w) => w.id !== walletId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
        <p className="text-xl font-bold text-white">Connected Wallets</p>
      </div>

      {wallets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/10 rounded-lg">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </motion.div>
          <p className="text-gray-400 text-center mb-4 font-medium">
            No Connected Wallets
          </p>
          <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
            Connect your wallet to start playing and manage your crypto assets
          </p>
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="px-6 py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-[#F07730]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Connecting...
              </span>
            ) : (
              "Connect Wallet"
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{wallet.name}</h3>
                  <p className="text-sm text-gray-400 font-mono">
                    {wallet.address}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDisconnectWallet(wallet.id)}
                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-sm font-semibold transition-all"
              >
                Disconnect
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ConnectedWalletsSection;
