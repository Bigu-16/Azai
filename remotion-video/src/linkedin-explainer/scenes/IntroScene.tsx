import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import {
  BADGE_LOGO_CENTER,
  BADGE_SCALE,
  colors,
  fonts,
  gradients,
  HERO_LOGO_CENTER,
  HERO_LOGO_WIDTH,
} from "../theme";

// Continuation of AzyabLogoAnimationLight: opens already fully revealed/settled
// (the wind-build reveal already happened in the prior video), holds briefly,
// then the logo detaches from the wordmark and docks into the corner where
// LogoBadge picks it up — see theme.ts for the shared handoff coordinates.
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const dockProgress = interpolate(frame, [55, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const logoCenterX = interpolate(dockProgress, [0, 1], [HERO_LOGO_CENTER.x, BADGE_LOGO_CENTER.x]);
  const logoCenterY = interpolate(dockProgress, [0, 1], [HERO_LOGO_CENTER.y, BADGE_LOGO_CENTER.y]);
  const logoScale = interpolate(dockProgress, [0, 1], [1, BADGE_SCALE]);

  const breathe = Math.sin(frame * 0.08) * 0.015 * (1 - dockProgress);

  const textOpacity = interpolate(frame, [45, 65], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [45, 65], [0, -16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowOpacity = interpolate(frame, [0, 20, 55, 70], [0, 0.08, 0.08, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      {/* Soft halo behind the hero lockup, fades out before the dock move */}
      <div
        style={{
          position: "absolute",
          left: HERO_LOGO_CENTER.x,
          top: HERO_LOGO_CENTER.y,
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(26, 111, 181, ${glowOpacity}) 0%, transparent 65%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Logo: holds centered, then docks to the corner */}
      <div
        style={{
          position: "absolute",
          left: logoCenterX,
          top: logoCenterY,
          transform: `translate(-50%, -50%) scale(${logoScale + breathe})`,
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))",
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{ width: HERO_LOGO_WIDTH, height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Wordmark + tagline: stay put, dissolve away as the logo detaches */}
      <div
        style={{
          position: "absolute",
          left: HERO_LOGO_CENTER.x,
          top: HERO_LOGO_CENTER.y + 270,
          transform: `translate(-50%, ${textY}px)`,
          opacity: textOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontFamily: fonts.family,
            fontSize: 130,
            fontWeight: 700,
            letterSpacing: 32,
            color: "transparent",
            background: gradients.wordmark,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            margin: 0,
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          AZYAB
        </h1>
        <span
          style={{
            fontFamily: fonts.family,
            fontSize: 52,
            fontWeight: 300,
            letterSpacing: 40,
            color: colors.primaryDeep,
            marginTop: 4,
            textTransform: "uppercase",
            marginLeft: 40,
          }}
        >
          TECH
        </span>
        <div
          style={{
            width: 300,
            height: 3,
            background: "linear-gradient(90deg, transparent, rgba(26, 111, 181, 0.3), transparent)",
            marginTop: 20,
          }}
        />
        <p
          style={{
            fontFamily: fonts.family,
            fontSize: 32,
            fontWeight: 300,
            letterSpacing: 16,
            color: "rgba(26, 111, 181, 0.75)",
            marginTop: 18,
            textTransform: "lowercase",
          }}
        >
          unified tech solutions
        </p>
      </div>
    </>
  );
};
