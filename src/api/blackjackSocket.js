import { io } from "socket.io-client";

const BLACKJACK_SOCKET_URL =
  import.meta.env.VITE_BLACKJACK_SOCKET_URL || "http://localhost:5001/blackjack";

export const blackjackSocket = io("http://localhost:5001/blackjack", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

blackjackSocket.on("connect", () => {
  console.log("🎲 Connected to Blackjack microservice:", blackjackSocket.id);
});

blackjackSocket.on("disconnect", () => {
  console.warn("⚠️ Disconnected from Blackjack microservice");
});
