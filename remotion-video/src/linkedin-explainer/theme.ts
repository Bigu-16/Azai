import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily: interFontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

// Pulled from AzyabLogoLight.tsx so this video reads as a continuation of the
// existing light-mode logo stinger rather than a new palette.
export const colors = {
  bgFrom: "#FFFFFF",
  bgMid: "#F0F5FA",
  bgTo: "#E6EEF6",
  ink: "#0A2540",
  inkMuted: "rgba(13, 36, 64, 0.6)",
  primary: "#1A6FB5",
  primaryDeep: "#0D5A9E",
  primaryBright: "#2889D4",
  primaryMid: "#1578C2",
  primaryDark: "#0A4F8A",
  primaryPale: "#4AADE8",
  white: "#FFFFFF",
};

export const gradients = {
  wordmark: `linear-gradient(135deg, ${colors.primaryDeep} 0%, ${colors.primary} 25%, ${colors.primaryBright} 50%, ${colors.primaryMid} 75%, ${colors.primaryDark} 100%)`,
  background: (shift: number) =>
    `radial-gradient(ellipse at 50% ${42 + shift * 0.3}%, ${colors.bgFrom} 0%, ${colors.bgMid} 40%, ${colors.bgTo} 100%)`,
};

export const fonts = {
  family: interFontFamily,
};

// Shared handoff points between IntroScene's docking animation and LogoBadge's
// static resting state — they must match exactly for the dock motion to read
// as one continuous move rather than a cut.
export const HERO_LOGO_WIDTH = 750;
export const HERO_LOGO_CENTER = { x: 960, y: 420 };
export const BADGE_LOGO_WIDTH = 72;
export const BADGE_LOGO_CENTER = { x: 110, y: 84 };
export const BADGE_SCALE = BADGE_LOGO_WIDTH / HERO_LOGO_WIDTH;
