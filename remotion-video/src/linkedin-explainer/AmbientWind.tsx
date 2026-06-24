import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "./theme";

// Continuous, loop-safe wind streak: position is derived from frame via modulo
// instead of a one-shot delay/duration window, so it reads correctly no matter
// where in a long composition it's placed (no restart pop, no dead air).
const Streak: React.FC<{
  laneY: number;
  length: number;
  thickness: number;
  color: string;
  period: number;
  phase: number;
  maxOpacity: number;
  direction: "left" | "right";
}> = ({ laneY, length, thickness, color, period, phase, maxOpacity, direction }) => {
  const frame = useCurrentFrame();
  const travel = 1920 + length * 2;

  const t = ((frame + phase) % period) / period;
  const x =
    direction === "right"
      ? -length + t * travel
      : 1920 + length - t * travel;

  // fade in/out at the very start/end of each pass so it never appears to clip
  const fadeWindow = 0.12;
  const opacity =
    interpolate(t, [0, fadeWindow, 1 - fadeWindow, 1], [0, maxOpacity, maxOpacity, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: laneY,
        width: length,
        height: thickness,
        borderRadius: thickness,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity,
      }}
    />
  );
};

// Gently pulsing dust mote, fixed in place — gives the background texture
// without the cost/complexity of tracking drifting particles over ~1000 frames.
const Mote: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  freq: number;
  phase: number;
  maxOpacity: number;
}> = ({ x, y, size, color, freq, phase, maxOpacity }) => {
  const frame = useCurrentFrame();
  const pulse = (Math.sin((frame + phase) * freq) + 1) / 2;
  const opacity = 0.15 * maxOpacity + pulse * maxOpacity;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + Math.sin((frame + phase) * freq * 0.5) * 6,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
};

const streakColors = [
  colors.primary,
  colors.primaryBright,
  colors.primaryDeep,
  colors.primaryMid,
  colors.primaryPale,
];

const streaks: React.ComponentProps<typeof Streak>[] = Array.from({ length: 9 }, (_, i) => ({
  laneY: 80 + i * 115 + (Math.sin(i * 7) * 30),
  length: 280 + (i % 3) * 60,
  thickness: 1.5 + (i % 2),
  color: streakColors[i % streakColors.length],
  period: 220 + i * 17,
  phase: i * 41,
  maxOpacity: 0.07 + (i % 3) * 0.02,
  direction: i % 2 === 0 ? "right" : "left",
}));

const motes: React.ComponentProps<typeof Mote>[] = Array.from({ length: 36 }, (_, i) => {
  // deterministic pseudo-spread instead of Math.random() so the field is stable
  // across preview/render without needing a seeded RNG for a purely decorative layer
  const x = (i * 167) % 1880 + 20;
  const y = (i * 91 + i * i * 3) % 1040 + 20;
  return {
    x,
    y,
    size: 2 + (i % 4),
    color: streakColors[i % streakColors.length],
    freq: 0.02 + (i % 5) * 0.004,
    phase: i * 23,
    maxOpacity: 0.18 + (i % 3) * 0.06,
  };
});

export const AmbientWind: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {streaks.map((s, i) => (
        <Streak key={`streak-${i}`} {...s} />
      ))}
      {motes.map((m, i) => (
        <Mote key={`mote-${i}`} {...m} />
      ))}
    </AbsoluteFill>
  );
};
