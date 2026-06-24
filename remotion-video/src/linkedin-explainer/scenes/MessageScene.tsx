import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";

export const MESSAGE_SCENE_DURATION = 180;

const LINES = [
  "Worried about your digital infrastructure?",
  "Tell us what's slowing you down —",
  "we'll consult, and build the fix together.",
];

const LINE_START = [0, 25, 50];
const LINE_DURATION = 20;

export const MessageScene: React.FC = () => {
  const frame = useCurrentFrame();

  const ctaOpacity = interpolate(frame, [95, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [95, 115], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const lineWidth = interpolate(frame, [85, 110], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 540,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        maxWidth: 1700,
      }}
    >
      {LINES.map((line, i) => {
        const start = LINE_START[i];
        const opacity = interpolate(frame, [start, start + LINE_DURATION], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [start, start + LINE_DURATION], [26, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <p
            key={line}
            style={{
              fontFamily: fonts.family,
              fontSize: 54,
              fontWeight: i === 2 ? 700 : 600,
              whiteSpace: "nowrap",
              color: i === 2 ? colors.primaryDeep : colors.ink,
              margin: 0,
              textAlign: "center",
              lineHeight: 1.25,
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            {line}
          </p>
        );
      })}

      <div
        style={{
          width: `${lineWidth}%`,
          maxWidth: 240,
          height: 3,
          background: "linear-gradient(90deg, transparent, rgba(26, 111, 181, 0.4), transparent)",
          marginTop: 28,
        }}
      />

      <p
        style={{
          fontFamily: fonts.family,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 6,
          color: colors.primary,
          textTransform: "uppercase",
          margin: 0,
          marginTop: 14,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        Let&apos;s connect
      </p>
    </div>
  );
};
