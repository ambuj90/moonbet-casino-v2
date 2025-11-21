// src/api/walletSocket.js
import { io } from "socket.io-client";

let walletSocket = null;

export function getWalletSocket() {
  if (!walletSocket) {
    walletSocket = io("https://api.moonbet.games", {
      transports: ["websocket"],
      path: "/wallet-service/socket.io",
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    walletSocket.on("connect", () => {
      console.log("🔌 Wallet socket connected:", walletSocket.id);

      // Auto-join deposit room if user already logged in
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.id) {
        walletSocket.emit("joinDepositRoom", user.id);
        console.log("🟦 Auto-joined wallet room user_", user.id);
      }
    });

    walletSocket.on("disconnect", () => {
      console.warn("⚠️ Wallet socket disconnected");
    });
  }

  return walletSocket;
}
