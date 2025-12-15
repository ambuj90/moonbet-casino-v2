// src/utils/gameDeviceUtils.js

export const getGameDeviceType = (game) => {
  const nameHasMobile = game?.name?.toLowerCase().includes("mobile");

  const isMobileFlag =
    game.is_mobile === 1 ||
    game.is_mobile === true ||
    game.is_mobile === "true";

  if (nameHasMobile) {
    return "mobile-only";
  }

  if (!nameHasMobile && !isMobileFlag) {
    return "desktop-only";
  }

  if (!nameHasMobile && isMobileFlag) {
    return "all";
  }

  return "all";
};

export const canPlayOnDevice = (game, isMobileDevice) => {
  const deviceType = getGameDeviceType(game);

  if (deviceType === "mobile-only") return isMobileDevice;
  if (deviceType === "desktop-only") return !isMobileDevice;

  return true; // all devices
};

export const shouldShowNoDemoPopup = (game) => {
  const isMobileFlag =
    game.is_mobile === 1 ||
    game.is_mobile === true ||
    game.is_mobile === "true";

  return isMobileFlag && game.has_demo === false;
};
