import { useEffect, useState } from "react";

const TidioChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [offset, setOffset] = useState(-60); // default mobile offset

  useEffect(() => {
    const onTidioChatApiReady = () => {
      window.tidioChatApi.hide();
      window.tidioChatApi.hideDefaultWidget?.();
      window.tidioChatApi.hideWidget?.();

      window.tidioChatApi.on("open", () => setIsChatOpen(true));
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

  // Detect viewport and dynamically set placement
  useEffect(() => {
    const updateOffset = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOffset(-50); // desktop image lift
      } else {
        setOffset(10); // mobile image lift
      }
    };

    updateOffset(); // initial load
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
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
          width: "90px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <picture>
          {/* Desktop image */}
          <source
            srcSet="/active-menu/desktop-bot.png"
            media="(min-width: 768px)"
          />

          {/* Mobile image */}
          {/* <img
            src="/active-menu/chat-final.png"
            alt="Chat Icon"
            style={{
              width: "80px",
              height: "auto",
              position: "absolute",
              bottom: `${offset}px`, // dynamic offset
              right: "-6px",
              zIndex: 10,
            }}
          /> */}
        </picture>
      </div>
    </button>
  );
};

export default TidioChatButton;
