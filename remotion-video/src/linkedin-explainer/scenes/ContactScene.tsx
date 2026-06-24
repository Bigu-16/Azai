import React from "react";
import { Mail, Phone } from "lucide-react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ContactRow } from "../components/ContactRow";
import { LinkedinGlyph } from "../components/LinkedinGlyph";
import { colors, fonts } from "../theme";

export const CONTACT_SCENE_DURATION = 220;

// LinkedIn URL and phone number are placeholders (no real values exist yet,
// per user decision) — swap these two before publishing the rendered video.
const LINKEDIN_PLACEHOLDER = "linkedin.com/company/azyab";
const PHONE_PLACEHOLDER = "+251 9XX XXX XXX";

export const ContactScene: React.FC = () => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headingOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headingY = interpolate(frame, [10, 30], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const domainOpacity = interpolate(frame, [120, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const domainY = interpolate(frame, [120, 145], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
      }}
    >
      <Img
        src={staticFile("logo.png")}
        style={{ width: 110, height: "auto", objectFit: "contain", opacity: logoOpacity }}
      />

      <h2
        style={{
          fontFamily: fonts.family,
          fontSize: 48,
          fontWeight: 700,
          color: colors.ink,
          margin: 0,
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
        }}
      >
        Let&apos;s build together
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 6, alignItems: "flex-start" }}>
        <ContactRow icon={LinkedinGlyph} label="LinkedIn" value={LINKEDIN_PLACEHOLDER} delay={40} />
        <ContactRow icon={Mail} label="Email" value="contact@azyab.com" delay={60} />
        <ContactRow icon={Phone} label="Phone" value={PHONE_PLACEHOLDER} delay={80} />
      </div>

      <p
        style={{
          fontFamily: fonts.family,
          fontSize: 34,
          fontWeight: 300,
          letterSpacing: 10,
          color: colors.primary,
          textTransform: "uppercase",
          margin: 0,
          marginTop: 16,
          opacity: domainOpacity,
          transform: `translateY(${domainY}px)`,
        }}
      >
        azyab.com
      </p>
    </div>
  );
};
