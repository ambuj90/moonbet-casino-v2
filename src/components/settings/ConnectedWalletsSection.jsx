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
        <div className="w-10 h-10 bg-gradient-to-br from-[#5A3799] to-[#DC1FFF] rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_9409_571)">
              <g filter="url(#filter0_d_9409_571)">
                <path
                  d="M17.4646 3.1001C17.9974 3.1002 18.4286 3.55698 18.4287 4.1199C18.4287 4.68288 17.9974 5.13961 17.4646 5.13971H5.5713C5.21715 5.13976 4.9283 5.44463 4.92824 5.8199C4.92824 6.19523 5.21712 6.50004 5.5713 6.5001H19.3928C20.2787 6.5001 21 7.26239 21 8.2001V9.9001H17.7856C16.0134 9.9002 14.5713 11.4254 14.5713 13.3001C14.5714 15.1747 16.0134 16.7 17.7856 16.7001H21V18.4001C20.9999 19.3377 20.2786 20.1001 19.3928 20.1001H5.5713C4.1533 20.1 3.00019 18.8802 3 17.3803C3 17.3803 3 5.8301 3 5.8199C3.00005 4.31991 4.15321 3.10015 5.5713 3.1001H17.4646Z"
                  fill="white"
                />
                <path
                  d="M21 15.3397H17.7856C16.7206 15.3396 15.8575 14.4267 15.8574 13.3001C15.8574 12.1734 16.7205 11.2596 17.7856 11.2595H21V15.3397Z"
                  fill="white"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_9409_571"
                x="0"
                y="0.100098"
                width="24"
                height="23"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_9409_571"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_9409_571"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_9409_571">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
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
            className="px-6 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-transform  disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "var(--cta-gradient)",
            }}
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
