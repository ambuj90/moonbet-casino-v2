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
        bottom: "64px",
        right: "18px",
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
          width: "100px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/home-assets/moonbet-logo.png"
          alt="Chat Desktop Icon"
          className="hidden md:block"
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
        />
        {/* MOBILE ICON - only visible on mobile (md:hidden) */}
        <img
          src="/home-assets/chat-final.png"
          alt="Chat Mobile Icon"
          className="block md:hidden"
          style={{
            width: "60px",
            height: "60px",
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
        />
      </div>
      {/* Desktop-specific position override */}
      <style>
        {`
          @media (min-width: 768px) {
            button {
              bottom: 40px !important;
              right: 40px !important;
            }
          }
        `}
      </style>
    </button>
  );
};

export default TidioChatButton;
