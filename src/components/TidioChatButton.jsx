import { useEffect, useState } from "react";

const TidioChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const onTidioChatApiReady = () => {
      window.tidioChatApi.hide();
      window.tidioChatApi.hideDefaultWidget?.();
      window.tidioChatApi.hideWidget?.();

      window.tidioChatApi.on("open", () => {
        setIsChatOpen(true);
      });

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
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <picture>
          {/* Desktop image */}
          <source
            srcSet="/active-menu/moonbet-logo.png"
            media="(min-width: 768px)"
          />
          {/* Mobile image (default) */}
          <img
            src="/active-menu/chat-final.png"
            alt="Chat Icon"
            style={{
              width: "150px",
              height: "auto",
              display: "block",
              position: "relative",
              zIndex: 10,
            }}
          />
        </picture>
      </div>
    </button>
  );
};

export default TidioChatButton;
