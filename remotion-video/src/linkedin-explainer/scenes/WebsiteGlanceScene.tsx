import React from "react";
import { Activity, ArrowRight, Bot, Dumbbell, HeartPulse } from "lucide-react";
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserChrome } from "../components/BrowserChrome";
import { colors, fonts, gradients } from "../theme";
import type { IconComponent } from "../components/FeatureCard";

export const WEBSITE_GLANCE_SCENE_DURATION = 240;

const TAB_SWITCH_START = 110;
const TAB_SWITCH_END = 130;

const PROJECTS: { icon: IconComponent; title: string; tag: string }[] = [
  { icon: Activity, title: "EcoSync Enterprise", tag: "WEB / SAAS" },
  { icon: HeartPulse, title: "Patient Tracker", tag: "WEB / HEALTHCARE" },
  { icon: Dumbbell, title: "Gym Membership Management", tag: "WEB / SAAS" },
  { icon: Bot, title: "Real Estate AI Automation", tag: "AI / AUTOMATION" },
];

export const WebsiteGlanceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tabProgress = interpolate(frame, [TAB_SWITCH_START, TAB_SWITCH_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const homeOpacity = interpolate(frame, [TAB_SWITCH_START - 10, TAB_SWITCH_START + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const projectsOpacity = interpolate(frame, [TAB_SWITCH_START + 8, TAB_SWITCH_START + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const frameEnter = Math.min(spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } }), 1);
  const frameY = interpolate(frameEnter, [0, 1], [40, 0]);

  const captionOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 150,
          transform: "translateX(-50%)",
          opacity: captionOpacity,
        }}
      >
        <p
          style={{
            fontFamily: fonts.family,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 4,
            color: colors.primary,
            textTransform: "uppercase",
            textAlign: "center",
            margin: 0,
          }}
        >
          See it live — azyab.com
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 580,
          transform: `translate(-50%, -50%) translateY(${frameY}px)`,
          opacity: frameEnter,
        }}
      >
        <BrowserChrome url="azyab.com" tabs={["Home", "Projects"]} tabProgress={tabProgress}>
          {/* Home tab */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: homeOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
            }}
          >
            <Img src={staticFile("logo.png")} style={{ width: 64, height: "auto", objectFit: "contain" }} />
            <h2
              style={{
                fontFamily: fonts.family,
                fontSize: 44,
                fontWeight: 700,
                color: "transparent",
                background: gradients.wordmark,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                margin: 0,
                textAlign: "center",
              }}
            >
              Crafted Digital Excellence
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: colors.primary,
                color: colors.white,
                borderRadius: 30,
                padding: "14px 28px",
                fontFamily: fonts.family,
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              Explore Projects
              <ArrowRight size={18} />
            </div>
          </div>

          {/* Projects tab */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: projectsOpacity,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 22,
              padding: "44px 56px",
              alignContent: "center",
            }}
          >
            {PROJECTS.map((p, i) => {
              const cardFrame = frame - (TAB_SWITCH_START + 10) - i * 8;
              const cardProgress = Math.min(
                Math.max(spring({ frame: Math.max(0, cardFrame), fps, config: { damping: 14, stiffness: 130 } }), 0),
                1,
              );
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  style={{
                    opacity: cardProgress,
                    transform: `translateY(${interpolate(cardProgress, [0, 1], [20, 0])}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    background: "rgba(26, 111, 181, 0.04)",
                    border: "1px solid rgba(26, 111, 181, 0.1)",
                    borderRadius: 18,
                    padding: "20px 22px",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "rgba(26, 111, 181, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={28} color={colors.primary} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: fonts.family,
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: 2,
                        color: colors.primary,
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      {p.tag}
                    </p>
                    <p
                      style={{
                        fontFamily: fonts.family,
                        fontSize: 20,
                        fontWeight: 700,
                        color: colors.ink,
                        margin: "4px 0 0",
                      }}
                    >
                      {p.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </BrowserChrome>
      </div>
    </>
  );
};
