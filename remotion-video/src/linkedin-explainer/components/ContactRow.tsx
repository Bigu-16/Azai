import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import type { IconComponent } from "./FeatureCard";

type ContactRowProps = {
  icon: IconComponent;
  label: string;
  value: string;
  delay: number;
};

export const ContactRow: React.FC<ContactRowProps> = ({ icon: Icon, label, value, delay }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(progress, [0, 1], [-30, 0]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, opacity: progress, transform: `translateX(${x}px)` }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(26, 111, 181, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={28} color={colors.primary} strokeWidth={1.8} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: fonts.family,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 3,
            color: colors.inkMuted,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span style={{ fontFamily: fonts.family, fontSize: 26, fontWeight: 600, color: colors.ink, marginTop: 2 }}>
          {value}
        </span>
      </div>
    </div>
  );
};
