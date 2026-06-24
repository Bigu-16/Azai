import React from "react";
import { Lock } from "lucide-react";
import { colors, fonts } from "../theme";

const FRAME_WIDTH = 1320;
const FRAME_HEIGHT = 740;
const TOPBAR_HEIGHT = 52;
const TABBAR_HEIGHT = 50;

// Hardcoded underline rects for the two known, static tab labels — avoids
// needing DOM text-measurement for what's purely a decorative indicator.
const TAB_UNDERLINES = [
  { left: 32, width: 52 },
  { left: 32 + 52 + 36, width: 80 },
];

type BrowserChromeProps = {
  url: string;
  tabs: string[];
  tabProgress: number; // 0..tabs.length-1, fractional during the switch
  children: React.ReactNode;
};

export const BrowserChrome: React.FC<BrowserChromeProps> = ({ url, tabs, tabProgress, children }) => {
  const fromIndex = Math.floor(tabProgress);
  const toIndex = Math.min(fromIndex + 1, TAB_UNDERLINES.length - 1);
  const t = tabProgress - fromIndex;

  const underlineLeft =
    TAB_UNDERLINES[fromIndex].left + (TAB_UNDERLINES[toIndex].left - TAB_UNDERLINES[fromIndex].left) * t;
  const underlineWidth =
    TAB_UNDERLINES[fromIndex].width + (TAB_UNDERLINES[toIndex].width - TAB_UNDERLINES[fromIndex].width) * t;

  return (
    <div
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        borderRadius: 24,
        background: colors.white,
        boxShadow: "0 30px 80px rgba(13, 36, 64, 0.18), 0 4px 16px rgba(13, 36, 64, 0.08)",
        border: "1px solid rgba(13, 36, 64, 0.06)",
        overflow: "hidden",
      }}
    >
      {/* Top bar: traffic-light dots + centered url pill */}
      <div
        style={{
          height: TOPBAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          borderBottom: "1px solid rgba(13, 36, 64, 0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 8, width: 52 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(13, 36, 64, 0.04)",
              borderRadius: 20,
              padding: "6px 22px",
            }}
          >
            <Lock size={13} color={colors.inkMuted} strokeWidth={2} />
            <span style={{ fontFamily: fonts.family, fontSize: 15, color: colors.inkMuted, letterSpacing: 0.5 }}>
              {url}
            </span>
          </div>
        </div>
        <div style={{ width: 52 }} />
      </div>

      {/* Tab bar */}
      <div
        style={{
          height: TABBAR_HEIGHT,
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 36,
          padding: "0 32px",
          borderBottom: "1px solid rgba(13, 36, 64, 0.06)",
        }}
      >
        {tabs.map((label, i) => (
          <span
            key={label}
            style={{
              fontFamily: fonts.family,
              fontSize: 16,
              fontWeight: 600,
              color: Math.round(tabProgress) === i ? colors.primary : colors.inkMuted,
              letterSpacing: 0.5,
            }}
          >
            {label}
          </span>
        ))}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: underlineLeft,
            width: underlineWidth,
            height: 2,
            background: colors.primary,
            borderRadius: 1,
          }}
        />
      </div>

      <div style={{ position: "relative", width: "100%", height: FRAME_HEIGHT - TOPBAR_HEIGHT - TABBAR_HEIGHT }}>
        {children}
      </div>
    </div>
  );
};
