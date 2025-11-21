import React from "react";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0  /80 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]">
      {/* Logo */}
      {/* <img
        src="/icons/logo.svg"
        alt="Loading..."
        className="w-36 h-36 mb-6 animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      /> */}

      {/* GIF LOADER */}
      <img
        src="/icons/moonlogo.gif" // Put your GIF here
        alt="Moon Loader"
        className="w-32 h-32 object-contain"
      />
    </div>
  );
};

export default GlobalLoader;
