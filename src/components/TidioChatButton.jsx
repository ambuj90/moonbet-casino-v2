import { useEffect, useState } from "react";

const TidioChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const onTidioChatApiReady = () => {
      // Hide default widget
      window.tidioChatApi.hide();
      window.tidioChatApi.hideDefaultWidget?.();
      window.tidioChatApi.hideWidget?.();

      // When chat opens → hide button
      window.tidioChatApi.on("open", () => {
        setIsChatOpen(true);
      });

      // When chat closes → show button again
      window.tidioChatApi.on("close", () => {
        setIsChatOpen(false);
        window.tidioChatApi.hide();
        window.tidioChatApi.hideDefaultWidget?.();
        window.tidioChatApi.hideWidget?.();
      });
    };

    if (window.tidioChatApi) {
      window.tidioChatApi.on("ready", onTidioChatApiReady);
    } else {
      document.addEventListener("tidioChat-ready", onTidioChatApiReady);
    }

    return () => {
      document.removeEventListener("tidioChat-ready", onTidioChatApiReady);
    };
  }, []);

  const handleChatOpen = () => {
    if (window.tidioChatApi) {
      window.tidioChatApi.show();
      window.tidioChatApi.open();
    }
  };

  // ⭐ If chat is open → hide the button
  if (isChatOpen) return null;

  return (
    <button
      onClick={handleChatOpen}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#E5EAF2",
            filter: "blur(20px)",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />

        {/* Chat Icon */}
        <img
          src="/icons/chat-icon.svg"
          alt="Chat Icon"
          style={{
            width: "40px",
            height: "40px",
            display: "block",
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>
    </button>
  );
};

export default TidioChatButton;
