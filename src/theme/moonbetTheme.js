// theme/moonbetTheme.js
/**
 * MOONBET CASINO - Universal Theme System
 * This theme file contains all colors, gradients, and design tokens
 * for the entire Moonbet project
 */

const moonbetTheme = {
  // ============================================
  // PRIMARY BRAND COLORS
  // ============================================
  colors: {
    brand: {
      primary: "#F07730", // Moonbet Orange (from logo)
      secondary: "#EFD28E", // Gold/Champagne
      accent: "#00D4FF", // Cyan Blue (from cards)
      highlight: "#FF006E", // Hot Pink (for CTAs)
    },

    // ============================================
    // BACKGROUND COLORS (Dark Space Theme)
    // ============================================
    background: {
      primary: "#000000", // Pure black (main bg)
      secondary: "#0A0B0D", // Near black
      tertiary: "#13151A", // Dark gray
      card: "#1A1D24", // Card background
      elevated: "#242831", // Elevated surfaces
      overlay: "rgba(0, 0, 0, 0.85)", // Modal overlays
    },

    // ============================================
    // GLASS MORPHISM
    // ============================================
    glass: {
      white: {
        5: "rgba(255, 255, 255, 0.05)",
        10: "rgba(255, 255, 255, 0.10)",
        15: "rgba(255, 255, 255, 0.15)",
        20: "rgba(255, 255, 255, 0.20)",
        30: "rgba(255, 255, 255, 0.30)",
      },
      black: {
        30: "rgba(0, 0, 0, 0.30)",
        50: "rgba(0, 0, 0, 0.50)",
        70: "rgba(0, 0, 0, 0.70)",
        85: "rgba(0, 0, 0, 0.85)",
      },
      blur: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "40px",
      },
    },

    // ============================================
    // TEXT COLORS
    // ============================================
    text: {
      primary: "#FFFFFF", // Pure white
      secondary: "#B8BCC8", // Light gray
      tertiary: "#6B7280", // Medium gray
      muted: "#4B5563", // Muted gray
      inverse: "#000000", // Black (for light backgrounds)
    },

    // ============================================
    // GAME CATEGORY COLORS (from game cards)
    // ============================================
    games: {
      slots: "#F07730", // Orange
      casino: "#B24BF3", // Purple
      liveCasino: "#00C896", // Green
      dice: "#00A6FB", // Blue
      hilo: "#4B7BF5", // Royal Blue
      wheel: "#8B5CF6", // Violet
      blackjack: "#EC4899", // Pink
      roulette: "#FF6B6B", // Red
    },

    // ============================================
    // STATUS COLORS
    // ============================================
    status: {
      success: "#10B981", // Green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
      info: "#3B82F6", // Blue
    },

    // ============================================
    // BORDER COLORS
    // ============================================
    border: {
      default: "rgba(255, 255, 255, 0.08)",
      light: "rgba(255, 255, 255, 0.12)",
      medium: "rgba(255, 255, 255, 0.20)",
      strong: "rgba(255, 255, 255, 0.30)",
      brand: "rgba(240, 119, 48, 0.50)",
    },
  },

  // ============================================
  // GRADIENTS
  // ============================================
  gradients: {
    // Brand gradients
    brand: {
      primary: "linear-gradient(135deg, #F07730 0%, #EFD28E 100%)",
      secondary: "linear-gradient(135deg, #00D4FF 0%, #00A6FB 100%)",
      accent: "linear-gradient(135deg, #B24BF3 0%, #EC4899 100%)",
    },

    // Background gradients
    background: {
      main: "linear-gradient(180deg, #000000 0%, #0A0B0D 50%, #13151A 100%)",
      radial: "radial-gradient(circle at top, #13151A 0%, #000000 100%)",
      mesh: "radial-gradient(at 40% 20%, #1A1D24 0px, transparent 50%), radial-gradient(at 80% 0%, #242831 0px, transparent 50%), radial-gradient(at 10% 50%, #13151A 0px, transparent 50%)",
    },

    // Neon glow gradients
    neon: {
      orange: "linear-gradient(135deg, #F07730, #FF9A00, #EFD28E)",
      cyan: "linear-gradient(135deg, #00D4FF, #00A6FB, #0077CC)",
      purple: "linear-gradient(135deg, #B24BF3, #8B5CF6, #EC4899)",
      rainbow: "linear-gradient(135deg, #F07730, #B24BF3, #00D4FF, #00C896)",
    },

    // Card overlays
    overlay: {
      top: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
      bottom: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
      left: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
    },
  },

  // ============================================
  // SHADOWS & EFFECTS
  // ============================================
  shadows: {
    // Elevation shadows
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.5)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.75)",

    // Neon glow shadows
    neon: {
      orange: "0 0 30px rgba(240, 119, 48, 0.5)",
      orangeLg: "0 0 50px rgba(240, 119, 48, 0.7)",
      cyan: "0 0 30px rgba(0, 212, 255, 0.5)",
      cyanLg: "0 0 50px rgba(0, 212, 255, 0.7)",
      purple: "0 0 30px rgba(178, 75, 243, 0.5)",
      purpleLg: "0 0 50px rgba(178, 75, 243, 0.7)",
    },

    // Inner shadows
    inner: {
      sm: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.5)",
      md: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)",
      lg: "inset 0 4px 8px 0 rgba(0, 0, 0, 0.5)",
    },
  },

  // ============================================
  // ANIMATIONS
  // ============================================
  animations: {
    // Transitions
    transition: {
      fast: "150ms ease-in-out",
      base: "250ms ease-in-out",
      slow: "350ms ease-in-out",
      slower: "500ms ease-in-out",
    },

    // Keyframes names (define in CSS)
    keyframes: [
      "pulse-neon",
      "glow",
      "float",
      "shimmer",
      "gradient-shift",
      "spin-slow",
      "bounce-soft",
      "fade-in",
      "slide-up",
      "scale-in",
    ],
  },

  // ============================================
  // SPACING & LAYOUT
  // ============================================
  spacing: {
    xs: "0.5rem", // 8px
    sm: "1rem", // 16px
    md: "1.5rem", // 24px
    lg: "2rem", // 32px
    xl: "3rem", // 48px
    "2xl": "4rem", // 64px
    "3xl": "6rem", // 96px
  },

  // ============================================
  // BORDER RADIUS
  // ============================================
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
    full: "9999px", // Pills
  },

  // ============================================
  // Z-INDEX SCALE
  // ============================================
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    backdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

// ============================================
// CSS VARIABLES GENERATOR
// Generate CSS custom properties from theme
// ============================================
export const generateCSSVariables = () => {
  const cssVars = [];

  // Colors
  Object.entries(moonbetTheme.colors).forEach(([category, colors]) => {
    if (typeof colors === "object") {
      Object.entries(colors).forEach(([key, value]) => {
        if (typeof value === "string") {
          cssVars.push(`--color-${category}-${key}: ${value};`);
        } else {
          Object.entries(value).forEach(([subKey, subValue]) => {
            cssVars.push(`--color-${category}-${key}-${subKey}: ${subValue};`);
          });
        }
      });
    }
  });

  // Border radius
  Object.entries(moonbetTheme.borderRadius).forEach(([key, value]) => {
    cssVars.push(`--radius-${key}: ${value};`);
  });

  // Spacing
  Object.entries(moonbetTheme.spacing).forEach(([key, value]) => {
    cssVars.push(`--spacing-${key}: ${value};`);
  });

  return cssVars.join("\n  ");
};

// ============================================
// TAILWIND CONFIG EXTENSION
// Use this in tailwind.config.js
// ============================================
export const tailwindExtend = {
  colors: {
    brand: moonbetTheme.colors.brand,
    games: moonbetTheme.colors.games,
    "bg-primary": moonbetTheme.colors.background.primary,
    "bg-secondary": moonbetTheme.colors.background.secondary,
    "bg-tertiary": moonbetTheme.colors.background.tertiary,
    "bg-card": moonbetTheme.colors.background.card,
    "bg-elevated": moonbetTheme.colors.background.elevated,
  },
  backgroundImage: {
    ...moonbetTheme.gradients.brand,
    ...moonbetTheme.gradients.background,
    ...moonbetTheme.gradients.neon,
  },
  boxShadow: {
    ...moonbetTheme.shadows,
    ...moonbetTheme.shadows.neon,
  },
};

export default moonbetTheme;
