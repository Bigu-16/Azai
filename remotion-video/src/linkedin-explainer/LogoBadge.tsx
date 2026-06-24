import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BADGE_LOGO_CENTER, BADGE_SCALE, HERO_LOGO_WIDTH } from "./theme";

// Persistent brand mark. Lives outside the TransitionSeries so it survives
// scene crossfades untouched. Fades in exactly where IntroScene's dock
// animation leaves the logo, so the handoff between the two reads as one
// continuous move rather than a cut — see theme.ts for the shared coordinates.
export const LogoBadge: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [85, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (opacity <= 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: BADGE_LOGO_CENTER.x,
        top: BADGE_LOGO_CENTER.y,
        transform: `translate(-50%, -50%) scale(${BADGE_SCALE})`,
        opacity,
      }}
    >
      <Img
        src={staticFile("logo.png")}
        style={{
          width: HERO_LOGO_WIDTH,
          height: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.1))",
        }}
      />
    </div>
  );
};
