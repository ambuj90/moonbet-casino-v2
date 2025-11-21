import ReactDOM from "react-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Card from "../components/blackjack/Card";
import useBlackjackStore from "../store/useBlackjackStore";

// =============================================================
// 🌀 Fly-from-deck animation variant (shared for dealer/player)
// =============================================================
const cardFlight = {
  initial: ({ fromX, fromY }) => ({
    x: fromX,
    y: fromY,
    scale: 0.6,
    rotate: 15,
    opacity: 0,
  }),
  animate: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Blackjack = () => {
  const {
    connectSocket,
    cleanup,
    gameState,
    balance,
    isConnected,
    isPlacingBet,
    betAmount,
    setBetAmount,
    placeBet,
    hit,
    stand,
    doubleDown,
    split,
  } = useBlackjackStore();

  const availableActions = gameState?.availableActions ?? [];
  const flyKeys = useRef(new Set());
  const dealerHand = gameState?.dealerHand ?? {};
  const playerHands = gameState?.playerHands ?? [];
  const state = gameState?.state ?? "waiting";
  const outcomes = gameState?.outcomes ?? [];
  const currentHandIndex = gameState?.currentHandIndex ?? 0;
  const balanceValue =
    typeof balance === "number" ? balance : balance?.availableBalance ?? 0;
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [deckShuffle, setDeckShuffle] = useState(0);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [dealStage, setDealStage] = useState(0);
  const balanceControls = useAnimation();
  const { uiOutcome } = useBlackjackStore();
  const [hasBetStarted, setHasBetStarted] = useState(false);

  // Refs for physical layout mapping
  const deckRef = useRef(null);
  const dealerZoneRef = useRef(null);
  const playerZoneRef = useRef(null);

  const getRoundOutcome = (outcomes) => {
    if (!outcomes || outcomes.length === 0) return null;
    const res = outcomes[0].result?.toLowerCase();
    if (res === "win")
      return { text: "YOU WIN", color: "text-green-400", sound: "win" };
    if (res === "push")
      return { text: "PUSH", color: "text-yellow-400", sound: "bet" };
    return { text: "YOU LOSE", color: "text-red-500", sound: "lose" };
  };

  // 🎵 Sounds
  const sounds = {
    deal: useRef(new Audio("/sounds/deal.mp3")),
    win: useRef(new Audio("/sounds/win.mp3")),
    lose: useRef(new Audio("/sounds/lose.mp3")),
    bet: useRef(new Audio("/sounds/bet.mp3")),
    card: useRef(new Audio("/sounds/card.mp3")),
    chip: useRef(new Audio("/sounds/chip-click.mp3")),
  };

  const playSound = (key) => {
    const sound = sounds[key]?.current;
    if (sound) {
      sound.currentTime = 0;
      sound.volume = 0.8;
      sound.play().catch(() => {});
    }
  };

  useEffect(() => {
    connectSocket(localStorage.getItem("token"));
    return () => cleanup?.();
  }, []);

  const dealerServerCards = useMemo(
    () => dealerHand?.cards || [],
    [dealerHand]
  );
  const playerServerCards = useMemo(
    () => playerHands?.[currentHandIndex]?.cards ?? [],
    [playerHands, currentHandIndex]
  );

  // 🧹 Reset all card memory ONLY when a *new* roundId starts
  const prevRoundId = useRef(null);

  useEffect(() => {
    const currentRoundId = gameState?.roundId;
    if (
      state === "playing" &&
      currentRoundId &&
      currentRoundId !== prevRoundId.current
    ) {
      console.log("[Round Reset] New round detected → clearing board");
      prevRoundId.current = currentRoundId;
      flyKeys.current.clear();
      setDealerCards([]);
      setPlayerCards([]);
      setDealStage(0);
    }
  }, [state, gameState?.roundId]);

  // =============================================================
  // 🎬 Core dealing logic
  // =============================================================
  useEffect(() => {
    const playerCardsNow = JSON.stringify(
      playerHands?.[currentHandIndex]?.cards ?? []
    );
    const dealerCardsNow = JSON.stringify(dealerHand?.cards ?? []);
    console.log("[EffectTrigger]", { playerCardsNow, dealerCardsNow, state });
    if (!dealerHand?.cards || !playerHands?.length) return;

    // 🔄 Clear board at end of round → but only when player is ready to bet again
    if (state === "waiting" && prevRoundId.current) {
      console.log(
        "[Round End] Keeping table visible — waiting for next bet..."
      );
      return;
    }

    // 🧹 Reset all card memory on new round start
    // if (state === "playing" && dealerCards.length === 0 && playerCards.length === 0) {
    //   flyKeys.current.clear(); // <— clear animation cache
    //   console.log("[Round Reset] Cleared flyKeys + reset cards for new round");
    //   setDealerCards([]);
    //   setPlayerCards([]);
    // }

    // 🔥 First deal
    if (
      state === "playing" &&
      dealerHand.cards?.length >= 1 &&
      playerHands?.[currentHandIndex]?.cards?.length >= 1 &&
      dealerCards.length === 0 &&
      playerCards.length === 0
    ) {
      setDeckShuffle((d) => d + 1);
      flyKeys.current.clear();
      const seq = [
        { who: "dealer", card: dealerHand.cards[0] },
        { who: "player", card: playerHands[currentHandIndex].cards[0] },
        { who: "dealer", card: dealerHand.cards[1] },
        { who: "player", card: playerHands[currentHandIndex].cards[1] },
      ];
      seq.forEach((step, i) => {
        setTimeout(() => {
          setDealStage(i + 1);
          playSound("deal");
          if (step.who === "dealer") setDealerCards((p) => [...p, step.card]);
          else setPlayerCards((p) => [...p, step.card]);
        }, i * 450);
      });
      return;
    }

    // ⛔ Preserve cards if backend clears them at round end
    if (state === "ended") {
      const serverPlayerCards = playerHands?.[currentHandIndex]?.cards ?? [];
      const serverDealerCards = dealerHand?.cards ?? [];

      // If backend wiped player's cards but we still have visible ones → keep them
      if (serverPlayerCards.length === 0 && playerCards.length > 0) {
        console.log("[Preserve] Keeping player cards visible after round end");
        return;
      }

      // Also keep dealer cards visible during result popup
      if (serverDealerCards.length === 0 && dealerCards.length > 0) {
        console.log("[Preserve] Keeping dealer cards visible after round end");
        return;
      }
    }

    // 🃏 Extra cards drawn mid-round
    const newDealerCards = dealerHand.cards || [];
    const newPlayerCards = playerHands[currentHandIndex]?.cards || [];

    if (newDealerCards.length > dealerCards.length) {
      const toAdd = newDealerCards.slice(dealerCards.length);
      toAdd.forEach((c, i) =>
        setTimeout(() => {
          playSound("card");
          setDealerCards((prev) => [...prev, c]);
        }, i * 300)
      );
    }

    if (newPlayerCards.length > playerCards.length) {
      const toAdd = newPlayerCards.slice(playerCards.length);
      console.log("[New Player Cards Detected]", toAdd);
      toAdd.forEach((c, i) =>
        setTimeout(() => {
          playSound("card");
          setPlayerCards((prev) => [...prev, c]);
        }, i * 300)
      );
    }

    // 🏁 End of round popup
    // 🏁 End of round popup & instant feedback
    if (state === "ended" && outcomes?.length > 0 && !showResultPopup) {
      const outcome = getRoundOutcome(outcomes);
      if (outcome) {
        console.log("[Result]", outcome.text);
        playSound(outcome.sound);
        setShowResultPopup(true);
        setTimeout(() => setShowResultPopup(false), 2500);
      }
    }
  }, [state, dealerHand, playerHands, outcomes, currentHandIndex]);

  useEffect(() => {
    if (uiOutcome) {
      setShowResultPopup(true);

      const timer = setTimeout(() => {
        setShowResultPopup(false);
        useBlackjackStore.setState({
          uiOutcome: null,
          gameState: {
            ...useBlackjackStore.getState().gameState,
            state: "waiting",
          }, // ✅ force waiting
        });

        // ✅ reset visuals
        setDealerCards([]);
        setPlayerCards([]);
        flyKeys.current.clear();
        setDealStage(0);
        setHasBetStarted(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [uiOutcome]);

  // =============================================================
  // 🪄 Helper: compute flight vector from deck → target zone
  // =============================================================
  const getFlightVector = (targetRef) => {
    const deck = deckRef.current?.getBoundingClientRect();
    const target = targetRef.current?.getBoundingClientRect();
    if (!deck || !target) return { fromX: 0, fromY: 0 };
    const fromX = deck.left - target.left;
    const fromY = deck.top - target.top;
    return { fromX, fromY };
  };

  // =============================================================
  // 🎴 Fly-from-deck renderer for Dealer & Player
  // =============================================================
  const flyFromDeck = (card, i, targetRef, hidden) => {
    if (!card) return null; // ⛔ safeguard
    const uniqueKey = `${card.rank}-${card.suit}-${i}`;
    if (flyKeys.current.has(uniqueKey)) {
      // Already flew this card – just render static card
      return (
        <Card
          key={uniqueKey}
          card={card}
          hidden={hidden && i === 1}
          index={i}
        />
      );
    }

    flyKeys.current.add(uniqueKey);
    const cardKey = `${
      card?.display || `${card?.rank || "?"}${card?.suit || "?"}`
    }-${i}-${Date.now()}`;
    const deck = deckRef.current?.getBoundingClientRect();
    const target = targetRef.current?.getBoundingClientRect();
    console.log("[Rects]", { deck, target });
    let layer = document.getElementById("card-fly-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "card-fly-layer";
      layer.className = "pointer-events-none fixed inset-0 z-[999999]";
      document.body.appendChild(layer);
    }

    if (!deck || !target) {
      return (
        <Card
          key={`${card.display}-${i}`}
          card={card}
          hidden={hidden && i === 1}
          index={i}
        />
      );
    }
    if (!layer) {
      console.warn("⚠️ #card-fly-layer not found — creating it manually");
      const div = document.createElement("div");
      div.id = "card-fly-layer";
      div.className = "pointer-events-none fixed inset-0 z-[9999]";
      document.body.appendChild(div);
      return null;
    }

    const fromX = deck.left + deck.width / 2;
    const fromY = deck.top + deck.height / 2;
    const toX = target.left + target.width / 2;
    const toY = target.top + target.height / 2;
    const deltaX = fromX - toX;
    const deltaY = fromY - toY;
    console.log("[FlyFromDeck]", {
      fromX,
      fromY,
      toX,
      toY,
      deltaX,
      deltaY,
      card,
    });
    console.log("[FlyFromDeck] ⬅ Rendering portal for:", card);

    // return ReactDOM.createPortal(
    //   <motion.div
    //     key={`${card.display}-${i}`}
    //     custom={{ fromX: deltaX, fromY: deltaY }}
    //     variants={cardFlight}
    //     initial="initial"
    //     animate="animate"
    //     transition={{
    //       delay: i * 0.15,
    //       duration: 0.6,
    //       ease: "easeOut",
    //     }}
    //     style={{
    //       position: "fixed",
    //       top: `${toY}px`,
    //       left: `${toX}px`,
    //       transform: "translate(-50%, -50%)",
    //       width: target.width || 80,
    //       height: target.height || 110,
    //       zIndex: 2147483647,
    //       filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6))",
    //     }}
    //   >
    //     <Card card={card} hidden={hidden && i === 1} index={i} />
    //   </motion.div>,
    //   layer
    // );
    const portal = ReactDOM.createPortal(
      <motion.div
        key={cardKey}
        custom={{ fromX: deltaX, fromY: deltaY }}
        variants={cardFlight}
        initial="initial"
        animate="animate"
        transition={{
          delay: i * 0.15,
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{
          position: "fixed",
          top: `${toY}px`,
          left: `${toX}px`,
          transform: "translate(-50%, -50%)",
          width: target.width || 80,
          height: target.height || 110,
          zIndex: 2147483647,
          border: "2px solid red", // temporary visual debug
        }}
        onAnimationStart={() => console.log("[FlyCard] mount start", cardKey)}
        onAnimationComplete={() =>
          console.log("[FlyCard] animation complete", cardKey)
        }
      >
        <Card card={card} hidden={hidden && i === 1} index={i} />
      </motion.div>,
      layer
    );
    console.log("[FlyFromDeck] Portal created:", cardKey);
    return portal;
  };

  const renderDealerCard = (card, i, hidden) => {
    if (hidden) {
      return (
        <div
          key={`hidden-${i}`}
          className="relative w-[60px] sm:w-[80px] h-[90px] sm:h-[110px] rounded-[10px] overflow-hidden border border-white/30 shadow-[0_6px_16px_rgba(0,0,0,0.5)]"
        >
          <img
            src="/games/back_card.svg"
            alt="Hidden Card"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
      );
    }

    if (!card) return null;
    return flyFromDeck(card, i, dealerZoneRef, false);
  };

  const renderPlayerCard = (card, i) =>
    flyFromDeck(card, i, playerZoneRef, false);

  // =============================================================
  // 💰 Controls + UI
  // =============================================================
  const chipValues = [1, 5, 25, 100, 500];

  const handleBetNow = () => {
    if (isPlacingBet) return;
    setHasBetStarted(true);
    playSound("chip");
    // Clear for next round start
    setDealerCards([]);
    setPlayerCards([]);
    flyKeys.current.clear();
    setDealStage(0);
    placeBet(betAmount);
  };

  // =============================================================
  // 🎨 Render
  // =============================================================
  return (
    <div className="relative min-h-screen flex flex-col justify-start items-center text-white font-sans overflow-hidden">
      {/* 🎥 Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dyp5px1nj/video/upload/v1759992388/blackjack-video_cterrc.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0  /50 backdrop-blur-[1.5px]" />

      {/* ==================== TABLE ==================== */}
      <div className="relative w-full max-w-[1366px] h-[500px] sm:h-[501px] rounded-[24px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col p-4 md:p-6 bg-transparent mt-5 overflow-visible">
        {/* Header */}
        <div className="flex items-center gap-2 text-[#d5dde8] mb-2 relative z-10 text-sm sm:text-base">
          <span className="text-lg sm:text-xl">🂡</span>
          <span className="font-semibold">Blackjack</span>
        </div>

        {/* Orbit */}
        <img
          src="/games/full-circle.svg"
          alt="Table Orbit"
          className="absolute top-1/2 left-1/2 w-[95%] sm:w-[78%] md:w-[70%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80"
        />

        {/* Deck (origin point) */}
        <motion.div
          ref={deckRef}
          key={deckShuffle}
          className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-[60px] sm:w-[78px] h-[90px] sm:h-[110px] z-[1] pointer-events-none"
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{
            rotateY: 0,
            opacity: 1,
            y: [0, -6, 0],
            rotateZ: [0, -4, 4, 0],
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-[#dcdcdc] to-[#f6f6f6] border border-white/40 shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
              style={{ top: i * 3 }}
            />
          ))}
          <div className="absolute inset-0 rounded-[12px] bg-[conic-gradient(from_210deg,#fefefe,#f5dfff,#b2e3ff,#fefefe)] border-2 border-white shadow-[0_14px_26px_rgba(0,0,0,0.55)]" />
        </motion.div>

        {/* DEALER SECTION */}
        <div
          ref={dealerZoneRef}
          className="absolute top-[0%] left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="flex gap-2 sm:gap-3 relative">
            {/* Always show two dealer cards: first real, second back image if hidden */}
            {renderDealerCard(dealerHand.cards?.[0], 0, false)}
            {dealerHand.hidden && hasBetStarted
              ? renderDealerCard(null, 1, true) // ✅ show back only after first bet
              : !dealerHand.hidden && dealerHand.cards?.[1]
              ? renderDealerCard(dealerHand.cards?.[1], 1, false)
              : null}
          </div>

          {dealStage >= 1 && (
            <motion.div
              className="mt-2 bg-[#214a3a] text-[#baf6d3] text-[10px] sm:text-xs font-semibold rounded-full px-2 sm:px-3 py-0.5 sm:py-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              Dealer
            </motion.div>
          )}
        </div>

        {/* PLAYER SECTION */}
        <div
          ref={playerZoneRef}
          className="absolute bottom-[0%] left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          {dealStage >= 2 && (
            <div className="flex gap-2 mb-1 sm:mb-2">
              <span className="bg-[#22262f] text-[#d1d5e5] text-[10px] sm:text-xs font-semibold rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
                Player
              </span>
            </div>
          )}

          {/* show only first two player cards */}
          <div className="flex gap-2 sm:gap-3 relative">
            {playerCards.map((c, i) => renderPlayerCard(c, i))}
          </div>
        </div>
      </div>

      {/* ==================== CONTROLS ==================== */}
      <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center space-y-4 w-full max-w-[900px] z-10 px-2">
        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {["double", "stand", "hit", "split"].map((action) => {
            const enabled =
              availableActions.includes(action) &&
              !(action === "double" && gameState?.hasDoubled);
            const base =
              "flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[8px] border text-xs sm:text-sm font-medium w-[110px] sm:w-[124px] h-[36px] sm:h-[38px]";
            const active =
              action === "double"
                ? "border-[#27b35f] bg-[rgba(30,60,30,0.6)] text-[#baf6d3]"
                : "border-white/10  /40 text-[#d2d8e8] hover:bg-white/10";
            const disabled =
              "border-white/5  /30 text-[#555] cursor-not-allowed opacity-50";
            const onClick = () => {
              if (!enabled) return;
              if (action === "hit") hit();
              if (action === "stand") stand();
              if (action === "double") doubleDown();
              if (action === "split") split();
              playSound("card");
            };
            return (
              <button
                key={action}
                disabled={!enabled}
                onClick={onClick}
                className={`${base} ${enabled ? active : disabled}`}
              >
                {action === "double" && (
                  <span className="bg-green-500 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                    x2
                  </span>
                )}
                {action === "stand" && <>✋ Stand</>}
                {action === "hit" && <>⚔ Hit</>}
                {action === "split" && <>🂠 Split</>}
              </button>
            );
          })}
        </div>

        {/* 💵 Chips + Bet Controls */}
        <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {chipValues.map((v) => (
              <motion.button
                key={v}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-full ${
                  betAmount === v ? "ring-2 ring-white" : ""
                }`}
                onClick={() => {
                  playSound("chip");
                  setBetAmount(v);
                }}
              >
                <img
                  src={`/chips/chip-${v}.svg`}
                  alt={`Chip ${v}`}
                  className="w-full h-full object-contain"
                />
                <span className="absolute text-[10px] sm:text-[11px] font-bold text-white">
                  {v}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 rounded-[10px] border border-[rgba(255,255,255,0.2)] bg-[linear-gradient(0deg,rgba(30,30,30,0.15)_0%,rgba(75,75,75,0.15)_100%)] px-2 sm:px-3 py-2 backdrop-blur-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-md border border-[rgba(255,255,255,0.1)] text-white/90">
              <img src="/chips/icon.svg" className="w-4 sm:w-5" alt="∞" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                ${betAmount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setBetAmount((v) => Math.max(1, Math.floor(v / 2)))
                }
                className="w-10 sm:w-12 h-8 flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white/80 text-xs hover:bg-[rgba(255,255,255,0.1)]"
              >
                1/2
              </button>
              <button
                onClick={() => setBetAmount((v) => v * 2)}
                className="w-10 sm:w-12 h-8 flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white/80 text-xs hover:bg-[rgba(255,255,255,0.1)]"
              >
                2x
              </button>
              <button
                onClick={() =>
                  setBetAmount(balance?.availableBalance ?? balanceValue)
                }
                className="w-10 sm:w-12 h-8 flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white/80 text-xs hover:bg-[rgba(255,255,255,0.1)]"
              >
                Max
              </button>
            </div>
          </div>
        </div>

        {/* Balance + Bet Now */}
        <div className="flex items-center justify-center w-full max-w-sm mt-4 gap-4">
          <motion.div
            animate={balanceControls}
            className="text-sm text-[#aeb5c9]"
          >
            Balance:{" "}
            <span className="text-[#f6d18f] font-semibold">
              ${balance?.availableBalance?.toFixed(2) ?? balance ?? 0}
            </span>
          </motion.div>
          <motion.button
            whileHover={{ scale: state === "waiting" ? 1.05 : 1 }}
            whileTap={{ scale: state === "waiting" ? 0.97 : 1 }}
            disabled={state !== "waiting"}
            onClick={handleBetNow}
            className={`px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-bold text-[#111] text-[14px] sm:text-[15px] ${
              state !== "waiting"
                ? "bg-gradient-to-r from-[#999] to-[#555] cursor-not-allowed"
                : "bg-gradient-to-r from-[#f07730] to-[#efd28e]"
            } shadow-[0_14px_32px_rgba(0,0,0,0.7)]`}
          >
            {state === "dealing" ? "Dealing..." : "BET NOW"}
          </motion.button>
        </div>

        {/* 🎉 Result Popup */}
        <AnimatePresence>
          {(showResultPopup || uiOutcome) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`absolute bottom-[25%] left-1/2 -translate-x-1/2 
      px-6 py-4 rounded-[14px] font-extrabold text-4xl sm:text-5xl
      backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.6)]
      ${
        uiOutcome === "win"
          ? "text-green-400 bg-[rgba(0,255,100,0.1)]"
          : uiOutcome === "push"
          ? "text-yellow-400 bg-[rgba(255,255,0,0.1)]"
          : "text-red-500 bg-[rgba(255,0,0,0.1)]"
      }`}
            >
              {uiOutcome === "win"
                ? "YOU WIN"
                : uiOutcome === "push"
                ? "PUSH"
                : "YOU LOSE"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Blackjack;
