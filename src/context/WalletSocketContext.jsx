import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const WalletSocketContext = createContext(null);

export function WalletSocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io("https://api.moonbet.games", {
      transports: ["websocket"],
      path: "/wallet-service/socket.io",
      reconnection: true,
    });

    s.on("connect", () => {
      console.log("🔗 Wallet socket connected:", s.id);
      setSocket(s); // 🔥 this updates context → children re-render with real socket
    });

    s.on("disconnect", () => console.log("❌ Wallet socket disconnected"));

    return () => s.disconnect();
  }, []);

  return (
    <WalletSocketContext.Provider value={socket}>
      {children}
    </WalletSocketContext.Provider>
  );
}

export const useWalletSocket = () => useContext(WalletSocketContext);
