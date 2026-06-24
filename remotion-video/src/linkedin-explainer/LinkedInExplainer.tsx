import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { gradients } from "./theme";
import { AmbientWind } from "./AmbientWind";
import { LogoBadge } from "./LogoBadge";
import { IntroScene } from "./scenes/IntroScene";
import { FEATURES_SCENE_DURATION, FeaturesScene } from "./scenes/FeaturesScene";
import { WEBSITE_GLANCE_SCENE_DURATION, WebsiteGlanceScene } from "./scenes/WebsiteGlanceScene";
import { MESSAGE_SCENE_DURATION, MessageScene } from "./scenes/MessageScene";
import { CONTACT_SCENE_DURATION, ContactScene } from "./scenes/ContactScene";

// 105 + 420 + 240 + 180 + 220 raw frames, minus 4 fade transitions @ 18 frames
// each = 1093 total frames (~36.4s @ 30fps). Keep in sync with Root.tsx.
export const TOTAL_DURATION = 1093;
const SCENE_TRANSITION_FRAMES = 18;

// Full composition: Intro -> Features -> WebsiteGlance -> Message -> Contact.
export const LinkedInExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const bgShift = interpolate(frame, [0, TOTAL_DURATION], [0, 12]);

  return (
    <AbsoluteFill style={{ background: gradients.background(bgShift), overflow: "hidden" }}>
      <AmbientWind />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={105}>
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: SCENE_TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={FEATURES_SCENE_DURATION}>
          <FeaturesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: SCENE_TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={WEBSITE_GLANCE_SCENE_DURATION}>
          <WebsiteGlanceScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: SCENE_TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={MESSAGE_SCENE_DURATION}>
          <MessageScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: SCENE_TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={CONTACT_SCENE_DURATION}>
          <ContactScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <LogoBadge />
    </AbsoluteFill>
  );
};
