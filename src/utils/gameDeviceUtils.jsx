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

// export const shouldShowNoDemoPopup = (game) => {
//   const isMobileFlag =
//     game.is_mobile === 1 ||
//     game.is_mobile === true ||
//     game.is_mobile === "true";

//   return isMobileFlag && game.has_demo === false;
// };

export const shouldShowNoDemoPopup = (game) => {
  if (!game) return false;

  const isMobile = window.innerWidth < 768;

  const isDesktop = !isMobile;
  const hasDemo = game.has_demo === true;
  const isMobileAllowed = game.is_mobile === 1;

  // 🔒 CASE 1: Mobile device but game not allowed on mobile
  if (isMobile && !isMobileAllowed) return true;

  // 🔒 CASE 2: Desktop but NO demo available
  if (isDesktop && !hasDemo) return true;

  return false;
};
