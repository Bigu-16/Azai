import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Easing,
} from "remotion";

// --- Wind streak that sweeps across at the reveal edge ---
const RevealWindLight: React.FC<{
  delay: number;
  yStart: number;
  yEnd: number;
  length: number;
  thickness: number;
  color: string;
  duration: number;
  direction: "left" | "right";
}> = ({ delay, yStart, yEnd, length, thickness, color, duration, direction }) => {
  const frame = useCurrentFrame();
  const adj = Math.max(0, frame - delay);

  const startX = direction === "right" ? -length : 1920 + length;
  const endX = direction === "right" ? 1920 + length : -length;

  const x = interpolate(adj, [0, duration], [startX, endX], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const y = interpolate(adj, [0, duration], [yStart, yEnd], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(
    adj,
    [0, 3, duration * 0.4, duration * 0.8, duration],
    [0, 0.5, 0.35, 0.25, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: length,
        height: thickness,
        borderRadius: thickness,
        background: `linear-gradient(${direction === "right" ? "90deg" : "270deg"}, transparent 0%, ${color} 30%, ${color} 70%, transparent 100%)`,
        opacity,
        filter: "blur(1px)",
        boxShadow: `0 0 ${thickness * 3}px ${color}`,
      }}
    />
  );
};

// --- Dust/particle that trails behind wind ---
const WindDustLight: React.FC<{
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
  driftX: number;
  driftY: number;
  life: number;
}> = ({ x, y, delay, size, color, driftX, driftY, life }) => {
  const frame = useCurrentFrame();
  const adj = Math.max(0, frame - delay);

  const currentX = x + interpolate(adj, [0, life], [0, driftX], { extrapolateRight: "clamp" });
  const currentY = y + interpolate(adj, [0, life], [0, driftY], { extrapolateRight: "clamp" });

  const opacity = interpolate(adj, [0, 3, life * 0.6, life], [0, 0.45, 0.3, 0], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(adj, [0, life * 0.3, life], [0.3, 1, 0.5], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
};

// --- Ambient flowing wind ---
const FlowingWindLight: React.FC<{
  delay: number;
  y: number;
  length: number;
  thickness: number;
  maxOpacity: number;
  color: string;
  speed: number;
}> = ({ delay, y, length, thickness, maxOpacity, color, speed }) => {
  const frame = useCurrentFrame();
  const adj = Math.max(0, frame - delay);

  const x = interpolate(adj, [0, speed], [-length - 100, 2100], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(adj, [0, 4, speed * 0.5, speed], [0, maxOpacity, maxOpacity * 0.7, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: length,
        height: thickness,
        borderRadius: thickness,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity,
      }}
    />
  );
};

// --- Main Light Mode Composition ---
export const AzyabLogoAnimationLight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ============================================================
  // LOGO REVEAL: Same timing as dark version
  // ============================================================

  const revealProgress = interpolate(frame, [5, 65], [0, 110], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const maskBottom = revealProgress;
  const featherSize = 15;

  const logoOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const settleSpring = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.7 },
  });

  // Glow - softer on light background
  const glowBase = interpolate(frame, [15, 65, 85], [0, 20, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowPulse = frame > 65 ? Math.sin((frame - 65) * 0.08) * 3 : 0;
  const glow = glowBase + glowPulse;

  // ============================================================
  // TEXT ANIMATIONS
  // ============================================================
  const textStart = 80;
  const nameOpacity = interpolate(frame, [textStart, textStart + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameY = interpolate(frame, [textStart, textStart + 15], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const mottoStart = 105;
  const mottoOpacity = interpolate(frame, [mottoStart, mottoStart + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mottoY = interpolate(frame, [mottoStart, mottoStart + 15], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineWidth = interpolate(frame, [mottoStart - 3, mottoStart + 20], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // ============================================================
  // WIND PARTICLES DATA - Using deeper blue tones for light bg
  // ============================================================

  // Wind sweeps - heavily expanded for more dramatic wind feel
  const revealWinds: React.ComponentProps<typeof RevealWindLight>[] = [
    // --- Pass 1: Bottom sweep (frames 5-35) ---
    { delay: 5, yStart: 580, yEnd: 460, length: 400, thickness: 3.5, color: "#1A6FB5", duration: 30, direction: "right" },
    { delay: 8, yStart: 600, yEnd: 490, length: 350, thickness: 2.5, color: "#2889D4", duration: 28, direction: "right" },
    { delay: 7, yStart: 560, yEnd: 440, length: 300, thickness: 2, color: "#0D5A9E", duration: 29, direction: "left" },
    { delay: 3, yStart: 620, yEnd: 520, length: 450, thickness: 2, color: "#3A9BE0", duration: 32, direction: "right" },
    { delay: 10, yStart: 550, yEnd: 470, length: 320, thickness: 3, color: "#1578C2", duration: 26, direction: "left" },
    // --- Pass 2: Middle sweep (frames 22-50) ---
    { delay: 22, yStart: 440, yEnd: 350, length: 380, thickness: 3.5, color: "#1578C2", duration: 28, direction: "left" },
    { delay: 25, yStart: 460, yEnd: 370, length: 320, thickness: 2.5, color: "#3A9BE0", duration: 26, direction: "left" },
    { delay: 23, yStart: 420, yEnd: 330, length: 360, thickness: 2, color: "#1D82CC", duration: 28, direction: "right" },
    { delay: 20, yStart: 480, yEnd: 380, length: 440, thickness: 2, color: "#2889D4", duration: 30, direction: "right" },
    { delay: 27, yStart: 400, yEnd: 310, length: 300, thickness: 3, color: "#0F63A8", duration: 24, direction: "left" },
    // --- Pass 3: Top sweep (frames 38-65) ---
    { delay: 38, yStart: 330, yEnd: 230, length: 420, thickness: 3.5, color: "#2889D4", duration: 27, direction: "right" },
    { delay: 40, yStart: 350, yEnd: 250, length: 340, thickness: 2.5, color: "#0F63A8", duration: 25, direction: "right" },
    { delay: 39, yStart: 310, yEnd: 210, length: 380, thickness: 2, color: "#1A6FB5", duration: 28, direction: "left" },
    { delay: 36, yStart: 360, yEnd: 260, length: 460, thickness: 2, color: "#4AADE8", duration: 30, direction: "right" },
    { delay: 42, yStart: 290, yEnd: 190, length: 350, thickness: 3, color: "#0A4F8A", duration: 24, direction: "left" },
    // --- Extra trailing winds ---
    { delay: 50, yStart: 280, yEnd: 200, length: 300, thickness: 2, color: "#4AADE8", duration: 22, direction: "right" },
    { delay: 46, yStart: 500, yEnd: 400, length: 280, thickness: 2, color: "#0A4F8A", duration: 26, direction: "left" },
    { delay: 55, yStart: 250, yEnd: 180, length: 380, thickness: 2.5, color: "#1A6FB5", duration: 20, direction: "right" },
    { delay: 52, yStart: 530, yEnd: 420, length: 320, thickness: 2, color: "#2889D4", duration: 24, direction: "left" },
    // --- Continuous wind during text reveal ---
    { delay: 70, yStart: 700, yEnd: 680, length: 500, thickness: 2, color: "#1A6FB5", duration: 35, direction: "right" },
    { delay: 80, yStart: 200, yEnd: 190, length: 450, thickness: 2, color: "#2889D4", duration: 32, direction: "left" },
    { delay: 90, yStart: 850, yEnd: 840, length: 400, thickness: 1.5, color: "#1578C2", duration: 30, direction: "right" },
  ];

  // Dust particles - increased to 70
  const dustParticles: React.ComponentProps<typeof WindDustLight>[] = [];
  for (let i = 0; i < 70; i++) {
    const pass = Math.floor(i / 24);
    const baseDelay = pass * 16 + 3;
    dustParticles.push({
      x: 200 + Math.random() * 1500,
      y: 580 - pass * 110 + (Math.random() - 0.5) * 100,
      delay: baseDelay + Math.random() * 22,
      size: 2 + Math.random() * 5,
      color: ["#1A6FB5", "#2889D4", "#0D5A9E", "#1578C2", "#3A9BE0", "#4AADE8"][Math.floor(Math.random() * 6)],
      driftX: (Math.random() - 0.5) * 150,
      driftY: -15 - Math.random() * 50,
      life: 18 + Math.random() * 25,
    });
  }

  // Ambient winds - doubled, running throughout the video
  const ambientWinds: React.ComponentProps<typeof FlowingWindLight>[] = [
    // Early ambient winds (during logo build)
    { delay: 10, y: 120, length: 300, thickness: 1.5, maxOpacity: 0.06, color: "#1A6FB5", speed: 100 },
    { delay: 15, y: 750, length: 280, thickness: 1, maxOpacity: 0.05, color: "#2889D4", speed: 95 },
    { delay: 20, y: 950, length: 320, thickness: 1.5, maxOpacity: 0.05, color: "#0D5A9E", speed: 90 },
    // Mid-phase ambient winds
    { delay: 40, y: 200, length: 350, thickness: 1.5, maxOpacity: 0.1, color: "#1A6FB5", speed: 90 },
    { delay: 45, y: 650, length: 300, thickness: 1.5, maxOpacity: 0.08, color: "#2889D4", speed: 85 },
    { delay: 50, y: 380, length: 280, thickness: 1, maxOpacity: 0.06, color: "#0D5A9E", speed: 95 },
    { delay: 55, y: 850, length: 340, thickness: 1.5, maxOpacity: 0.08, color: "#1578C2", speed: 88 },
    // Post-reveal ambient winds
    { delay: 60, y: 150, length: 360, thickness: 1.5, maxOpacity: 0.1, color: "#3A9BE0", speed: 85 },
    { delay: 65, y: 480, length: 300, thickness: 1.5, maxOpacity: 0.08, color: "#0F63A8", speed: 80 },
    { delay: 70, y: 900, length: 280, thickness: 1, maxOpacity: 0.06, color: "#1D82CC", speed: 90 },
    { delay: 75, y: 300, length: 320, thickness: 1.5, maxOpacity: 0.08, color: "#2889D4", speed: 78 },
    { delay: 80, y: 700, length: 260, thickness: 1, maxOpacity: 0.06, color: "#1A6FB5", speed: 82 },
    // Late ambient winds (during text + hold)
    { delay: 90, y: 180, length: 350, thickness: 1.5, maxOpacity: 0.08, color: "#1A6FB5", speed: 75 },
    { delay: 95, y: 550, length: 300, thickness: 1, maxOpacity: 0.06, color: "#2889D4", speed: 80 },
    { delay: 100, y: 820, length: 280, thickness: 1.5, maxOpacity: 0.08, color: "#0D5A9E", speed: 70 },
    { delay: 108, y: 400, length: 320, thickness: 1, maxOpacity: 0.06, color: "#3A9BE0", speed: 75 },
    { delay: 115, y: 100, length: 280, thickness: 1.5, maxOpacity: 0.08, color: "#1578C2", speed: 65 },
    { delay: 120, y: 600, length: 260, thickness: 1, maxOpacity: 0.06, color: "#4AADE8", speed: 72 },
  ];

  const bgShift = interpolate(frame, [0, 150], [0, 12]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% ${42 + bgShift * 0.3}%, #FFFFFF 0%, #F0F5FA 40%, #E6EEF6 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Subtle grid - light version */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(26, 111, 181, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 111, 181, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />

      {/* Radial glow behind logo - soft blue on white */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(26, 111, 181, ${interpolate(frame, [8, 60, 85], [0, 0.08, 0.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}) 0%, transparent 65%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Reveal Wind Streaks */}
      {revealWinds.map((w, i) => (
        <RevealWindLight key={`rw-${i}`} {...w} />
      ))}

      {/* Wind Dust Particles */}
      {dustParticles.map((d, i) => (
        <WindDustLight key={`dust-${i}`} {...d} />
      ))}

      {/* Ambient Winds */}
      {ambientWinds.map((w, i) => (
        <FlowingWindLight key={`fw-${i}`} {...w} />
      ))}

      {/* ====== COMBINED LOGO + TEXT ====== */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            maskImage: `linear-gradient(to top, black 0%, black ${Math.max(0, maskBottom - featherSize)}%, transparent ${maskBottom}%, transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to top, black 0%, black ${Math.max(0, maskBottom - featherSize)}%, transparent ${maskBottom}%, transparent 100%)`,
            filter: `drop-shadow(0 0 ${glow}px rgba(26, 111, 181, 0.35)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))`,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 750,
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Company Name */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: -10,
          }}
        >
          <h1
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              fontSize: 130,
              fontWeight: 700,
              letterSpacing: 32,
              color: "transparent",
              background: "linear-gradient(135deg, #0D5A9E 0%, #1A6FB5 25%, #2889D4 50%, #1578C2 75%, #0A4F8A 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              margin: 0,
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            AZYAB
          </h1>
          <span
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              fontSize: 52,
              fontWeight: 300,
              letterSpacing: 40,
              color: "#0D5A9E",
              marginTop: 4,
              textTransform: "uppercase",
              marginLeft: 40,
            }}
          >
            TECH
          </span>
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: `${lineWidth}%`,
            maxWidth: 450,
            height: 3,
            background: "linear-gradient(90deg, transparent, rgba(26, 111, 181, 0.3), transparent)",
            marginTop: 20,
            opacity: mottoOpacity,
          }}
        />

        {/* Motto */}
        <p
          style={{
            opacity: mottoOpacity,
            transform: `translateY(${mottoY}px)`,
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fontSize: 32,
            fontWeight: 300,
            letterSpacing: 16,
            color: "rgba(26, 111, 181, 0.75)",
            marginTop: 18,
            textTransform: "lowercase",
          }}
        >
          unified tech solutions
        </p>
      </div>

      {/* Soft vignette - very subtle on light */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 45%, transparent 50%, rgba(200, 215, 230, 0.4) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
