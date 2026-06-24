import React from "react";
import { BrainCircuit, Globe, Palette, RefreshCw } from "lucide-react";
import { interpolate, Sequence, useCurrentFrame } from "remotion";
import { FeatureCard, type IconComponent } from "../components/FeatureCard";
import { colors } from "../theme";

const CARD_DURATION = 105;

const FEATURES: { icon: IconComponent; title: string; description: string; accent: string }[] = [
  {
    icon: RefreshCw,
    title: "Improve what you have",
    description: "Upgrading an existing website or app — faster, cleaner, more reliable.",
    accent: colors.primaryDeep,
  },
  {
    icon: Globe,
    title: "Build something new",
    description: "A brand-new website or app, designed and built from the ground up.",
    accent: colors.primary,
  },
  {
    icon: BrainCircuit,
    title: "Automate the busywork",
    description: "Replacing manual, error-prone tasks with smart, automated workflows.",
    accent: colors.primaryBright,
  },
  {
    icon: Palette,
    title: "Design that feels right",
    description: "UI/UX design that's clear, modern, and a pleasure to use.",
    accent: colors.primaryMid,
  },
];

export const FEATURES_SCENE_DURATION = FEATURES.length * CARD_DURATION;

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const activeIndex = Math.min(Math.floor(frame / CARD_DURATION), FEATURES.length - 1);
  const localProgress = (frame - activeIndex * CARD_DURATION) / CARD_DURATION;

  return (
    <>
      {FEATURES.map((f, i) => (
        <Sequence key={f.title} from={i * CARD_DURATION} durationInFrames={CARD_DURATION} layout="none">
          <FeatureCard
            icon={f.icon}
            title={f.title}
            description={f.description}
            index={i + 1}
            total={FEATURES.length}
            accent={f.accent}
            durationInFrames={CARD_DURATION}
          />
        </Sequence>
      ))}

      {/* Progress segments: shows which of the 4 features is currently playing */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 14,
        }}
      >
        {FEATURES.map((_, i) => {
          const width =
            i < activeIndex
              ? 64
              : i === activeIndex
                ? interpolate(localProgress, [0, 1], [36, 64])
                : 36;
          const opacity = i <= activeIndex ? 1 : 0.35;
          return (
            <div
              key={i}
              style={{
                width,
                height: 6,
                borderRadius: 3,
                background: colors.primary,
                opacity,
              }}
            />
          );
        })}
      </div>
    </>
  );
};
