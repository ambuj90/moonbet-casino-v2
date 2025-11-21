// src/store/useBlackjackStore.js - Enhanced Version
import { create } from "zustand";
import { devtools, subscribeWithSelector, persist } from "zustand/middleware";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const BACKEND_URL =
  import.meta.env.VITE_BLACKJACK_SOCKET_URL ||
  "http://localhost:5001/blackjack";

const useBlackjackStore = create(
  persist(
    devtools(
      subscribeWithSelector((set, get) => ({
        // Socket connection
        socket: null,
        isConnected: false,
        connectionError: null,
        reconnectAttempts: 0,
        maxReconnectAttempts: 5,

        // Game state
        gameState: {
          state: "waiting", // waiting, betting, playing, dealer_turn, ended
          roundId: null,
          dealerHand: {
            cards: [],
            value: 0,
            hidden: true,
          },
          playerHands: [],
          currentHandIndex: 0,
          availableActions: [],
          insurance: false,
          insuranceBet: 0,
          outcomes: [],
          totalPayout: 0,
          totalBet: 0,
          serverSeedHash: null,
          clientSeed: "",
          nonce: 0,
        },

        // Balance
        balance: {
          platformBalance: 0,
          lockedBalance: 0,
          availableBalance: 0,
        },

        // Public bets tracking
        publicBets: [],
        myActiveBet: null,
        recentWins: [], // Track recent big wins for display

        // UI state
        isPlacingBet: false,
        betAmount: 1,
        selectedChip: 1,
        isDemo: false,
        showProvablyFair: false,
        showHistory: false,
        soundEnabled: true,
        animationSpeed: "normal", // slow, normal, fast

        // Statistics
        stats: {
          totalGames: 0,
          wins: 0,
          losses: 0,
          pushes: 0,
          blackjacks: 0,
          totalWagered: 0,
          totalProfit: 0,
          currentStreak: 0,
          bestStreak: 0,
        },

        // Actions
        connectSocket: (token) => {
          const {
            socket: currentSocket,
            reconnectAttempts,
            maxReconnectAttempts,
          } = get();

          if (currentSocket?.connected) {
            console.log("[Blackjack] Already connected");
            return;
          }

          if (currentSocket) {
            currentSocket.disconnect();
          }

          const socketOptions = {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: maxReconnectAttempts,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 10000,
          };

          if (token) {
            socketOptions.auth = { token };
          }

          const newSocket = io(BACKEND_URL, socketOptions);

          // Connection events
          newSocket.on("connect", () => {
            console.log("[Blackjack] Socket connected");
            set({
              isConnected: true,
              connectionError: null,
              reconnectAttempts: 0,
              balance: {
                platformBalance: 1000,
                lockedBalance: 0,
                availableBalance: 1000,
              },
            });

            if (token) {
              newSocket.emit("blackjack:getState");
              newSocket.emit("blackjack:getStats");
            }

            toast.success("Connected to game server");
            // Join game session (required before any bets)
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = user.id || "690b3476c44bcaf1d6ce9505";
            const username = user.username || "vinayak";
            const mode = "demo"; // or "real" depending on your toggle
            newSocket.emit("join", { userId, username, mode });

            console.log(
              `[Blackjack] Joined game session as ${username} (${mode})`
            );
          });

          newSocket.on("disconnect", (reason) => {
            console.log("[Blackjack] Socket disconnected:", reason);
            set({ isConnected: false });

            if (reason === "io server disconnect") {
              toast.error("Disconnected by server");
            } else if (reason === "transport close") {
              toast.error("Connection lost");
            }
          });

          newSocket.on("reconnect_attempt", (attemptNumber) => {
            set({ reconnectAttempts: attemptNumber });
            console.log(`[Blackjack] Reconnect attempt ${attemptNumber}`);
          });

          newSocket.on("reconnect_failed", () => {
            set({
              connectionError: "Failed to reconnect after maximum attempts",
              reconnectAttempts: 0,
            });
            toast.error("Failed to reconnect. Please refresh the page.");
          });

          newSocket.on("connect_error", (error) => {
            console.error("[Blackjack] Connection error:", error);
            set({
              isConnected: false,
              connectionError: error.message,
            });
          });

          // Game events
          // Game events (aligned with backend)
          newSocket.on("game_state", (data) => {
            console.log("[Blackjack] Cards dealt / game state:", data);
            set({
              gameState: {
                ...get().gameState,
                ...data,
                state: data.state || "playing",
              },
              isPlacingBet: false,
            });
            get().playSound("deal");
            toast.success("Cards dealt!");
            if (
              data.state === "playing" &&
              data.dealerHand.cards.length === 2 &&
              data.playerHands[0]?.cards.length === 2
            ) {
              console.log("[Blackjack] Triggering deal animation stages...");
              let i = 0;
              const stages = [1, 2, 3, 4];
              const interval = setInterval(() => {
                // We can expose setDealStage via callback or custom store hook if needed
                i++;
                if (i >= stages.length) clearInterval(interval);
              }, 350);
            }
          });

          newSocket.on("dealer_turn", (data) => {
            console.log("[Blackjack] Dealer turn:", data);
            set({
              gameState: {
                ...get().gameState,
                ...data,
                state: "dealer_turn",
              },
            });
            get().playSound("dealerTurn");
            toast("Dealer’s turn");
          });

          newSocket.on("round_result", (result) => {
  console.log("[Blackjack] Round result:", result);

  const { stats } = get();
  const netResult = result.totalPayout - result.totalBet;
  const isWin = netResult > 0;
  const isPush = netResult === 0;

  const outcome = isWin ? "win" : isPush ? "push" : "lose";

  set({
    gameState: {
      ...get().gameState,
      ...result,
      state: "ended",
    },
    uiOutcome: outcome, // 🔥 store the visual outcome
    isPlacingBet: false,
  });

  if (isWin) {
    get().playSound("win");
    toast.success(`You won ${netResult.toFixed(2)}!`);
  } else if (isPush) {
    get().playSound("bet");
    toast("Push - Bet returned");
  } else {
    get().playSound("lose");
    toast.error(`You lost ${Math.abs(netResult).toFixed(2)}!`);
  }
});


          newSocket.on("balance_update", (newBalance) => {
            console.log("[Blackjack] Balance update:", newBalance);
            set({ balance: newBalance });
          });

          newSocket.on("public_bet", (betInfo) => {
            console.log("[Blackjack] Public bet event:", betInfo);
            const { publicBets } = get();
            const newBet = {
              id: `${betInfo.username}_${Date.now()}`,
              ...betInfo,
              status: "completed",
              timestamp: new Date(),
            };
            set({ publicBets: [newBet, ...publicBets].slice(0, 100) });
          });

          newSocket.on("timeout_warning", (msg) => {
            console.warn("[Blackjack] Timeout warning:", msg);
            toast.error(msg.message || "You took too long! Auto-standing.");
          });

          set({ socket: newSocket });
        },

        disconnectSocket: () => {
          const { socket } = get();
          if (socket) {
            socket.disconnect();
            set({
              socket: null,
              isConnected: false,
              connectionError: null,
              reconnectAttempts: 0,
            });
          }
        },

        // Game actions
        placeBet: (amount, isDemo = false, clientSeed = "") => {
          const { socket, isConnected, balance } = get();

          if (!socket || !isConnected) {
            toast.error("Not connected to server");
            return;
          }

          if (isDemo) {
            amount = 0;
          } else {
            if (amount <= 0) {
              toast.error("Invalid bet amount");
              return;
            }
            if (amount > balance.availableBalance) {
              toast.error("Insufficient balance");
              return;
            }
          }

          set({
            isPlacingBet: true,
            betAmount: amount,
            isDemo,
          });

          // Track active bet
          const username = localStorage.getItem("username") || "You";
          const myBet = {
            id: `${username}_${Date.now()}`,
            username,
            betAmount: amount,
            status: "active",
            timestamp: new Date(),
            isDemo,
          };
          set({ myActiveBet: myBet });
          console.log("[Client → Server] blackjack:placeBet", {
            amount,
            isDemo,
          });
          socket.emit("bet", {
            amount,
            clientSeed: clientSeed || undefined,
          });

          get().playSound("bet");
        },

        hit: () => {
          const { socket, gameState } = get();
          if (!socket || !gameState.availableActions.includes("hit")) {
            toast.error("Hit not available");
            return;
          }
          socket.emit("action", { action: "hit" });
          get().playSound("card");
        },

        stand: () => {
          const { socket, gameState } = get();
          if (!socket || !gameState.availableActions.includes("stand")) {
            toast.error("Stand not available");
            return;
          }
          socket.emit("action", { action: "stand" });
          get().playSound("stand");
        },

        doubleDown: () => {
          const { socket, gameState, balance } = get();
          if (!socket || !gameState.availableActions?.includes("double")) {
            toast.error("Double not available");
            return;
          }

          const currentBet =
            gameState.playerHands[gameState.currentHandIndex]?.bet || 0;
          if (currentBet * 2 > balance.availableBalance) {
            toast.error("Insufficient balance for double");
            return;
          }

          console.log("[Client → Server] blackjack:double");
          socket.emit("action", { action: "double" });

          // Wait for server to respond with extra card before standing
          const handleDoubleResponse = (data) => {
  console.log("[Server → Client] double response:", data);
  socket.off("game_state", handleDoubleResponse); // remove listener after first hit
  // Auto-stand after short delay
  setTimeout(() => {
    console.log("[Client] Auto-standing after double");
    get().stand();
  }, 800);
};
socket.on("game_state", handleDoubleResponse);

          get().playSound("double");
        },

        split: () => {
          const { socket, gameState, balance } = get();
          if (!socket || !gameState.availableActions.includes("split")) {
            toast.error("Split not available");
            return;
          }

          const currentBet =
            gameState.playerHands[gameState.currentHandIndex]?.bet || 0;
          if (currentBet > balance.availableBalance) {
            toast.error("Insufficient balance for split");
            return;
          }

          socket.emit("action", { action: "split" });
          get().playSound("split");
        },

        insurance: () => {
          const { socket, gameState, balance } = get();
          if (!socket || !gameState.availableActions.includes("insurance")) {
            toast.error("Insurance not available");
            return;
          }

          const insuranceAmount = gameState.totalBet / 2;
          if (insuranceAmount > balance.availableBalance) {
            toast.error("Insufficient balance for insurance");
            return;
          }

          socket.emit("action", { action: "insurance" });
          get().playSound("insurance");
        },

        surrender: () => {
          const { socket, gameState } = get();
          if (!socket || !gameState.availableActions.includes("surrender")) {
            toast.error("Surrender not available");
            return;
          }
          socket.emit("action", { action: "surrender" });
          get().playSound("surrender");
        },

        // UI actions
        setBetAmount: (amount) => set({ betAmount: amount }),
        setSelectedChip: (chip) => set({ selectedChip: chip }),
        setIsDemo: (isDemo) => set({ isDemo }),
        toggleProvablyFair: () =>
          set((state) => ({
            showProvablyFair: !state.showProvablyFair,
          })),
        toggleHistory: () =>
          set((state) => ({
            showHistory: !state.showHistory,
          })),
        toggleSound: () =>
          set((state) => ({
            soundEnabled: !state.soundEnabled,
          })),
        setAnimationSpeed: (speed) => set({ animationSpeed: speed }),

        // Sound system
        playSound: (soundType) => {
          const { soundEnabled } = get();
          if (!soundEnabled) return;

          // Sound implementation would go here
          // For now, just console log
          console.log(`[Sound] Playing: ${soundType}`);
        },

        // Recent wins tracking
        addRecentWin: (win) => {
          const { recentWins } = get();
          set({
            recentWins: [win, ...recentWins].slice(0, 10),
          });
        },

        // Cleanup
        cleanup: () => {
          const { socket } = get();
          if (socket) {
            socket.disconnect();
          }
          set({
            socket: null,
            isConnected: false,
            gameState: {
              state: "waiting",
              roundId: null,
              dealerHand: { cards: [], value: 0, hidden: true },
              playerHands: [],
              currentHandIndex: 0,
              availableActions: [],
              insurance: false,
              insuranceBet: 0,
              outcomes: [],
              totalPayout: 0,
              totalBet: 0,
              serverSeedHash: null,
              clientSeed: "",
              nonce: 0,
            },
            myActiveBet: null,
          });
        },
      }))
    ),
    {
      name: "blackjack-store",
      partialize: (state) => ({
        betAmount: state.betAmount,
        selectedChip: state.selectedChip,
        isDemo: state.isDemo,
        soundEnabled: state.soundEnabled,
        animationSpeed: state.animationSpeed,
        stats: state.stats,
      }),
    }
  )
);

export default useBlackjackStore;
