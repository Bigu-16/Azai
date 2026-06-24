import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

export type IconComponent = React.ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;

type FeatureCardProps = {
  icon: IconComponent;
  title: string;
  description: string;
  index: number;
  total: number;
  accent: string;
  durationInFrames: number;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
  total,
  accent,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120, mass: 0.6 } });
  const exitStart = durationInFrames - 18;
  const exitProgress = interpolate(frame, [exitStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const opacity = Math.min(enter, 1) * (1 - exitProgress);
  const slideY = interpolate(Math.min(enter, 1), [0, 1], [40, 0]) + exitProgress * -30;
  const badgeScale = interpolate(Math.min(enter, 1), [0, 1], [0.6, 1]);

  const tagOpacity =
    interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) *
    (1 - exitProgress);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 540,
        transform: `translate(-50%, -50%) translateY(${slideY}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 64,
      }}
    >
      <div
        style={{
          width: 160,
          height: 160,
          flexShrink: 0,
          borderRadius: 36,
          background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
          border: `2px solid ${accent}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${badgeScale})`,
        }}
      >
        <Icon size={76} color={accent} strokeWidth={1.6} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
        <span
          style={{
            fontFamily: fonts.family,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 6,
            color: accent,
            textTransform: "uppercase",
            opacity: tagOpacity,
            marginBottom: 12,
          }}
        >
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h2
          style={{
            fontFamily: fonts.family,
            fontSize: 64,
            fontWeight: 700,
            color: colors.ink,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: fonts.family,
            fontSize: 30,
            fontWeight: 400,
            color: colors.inkMuted,
            marginTop: 18,
            lineHeight: 1.4,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
