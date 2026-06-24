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
const RevealWind: React.FC<{
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
    [0, 0.7, 0.5, 0.4, 0],
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
        boxShadow: `0 0 ${thickness * 4}px ${color}`,
      }}
    />
  );
};

// --- Dust/particle that trails behind wind ---
const WindDust: React.FC<{
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

  const opacity = interpolate(adj, [0, 3, life * 0.6, life], [0, 0.6, 0.4, 0], {
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
const FlowingWind: React.FC<{
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

// --- Main Composition ---
export const AzyabLogoAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ============================================================
  // LOGO REVEAL: Built up by wind, bottom to top, in 3 passes
  // Now spread across 5 seconds (150 frames) for a slower feel
  // ============================================================

  // Pass 1: Bottom third (frames 5-30)
  // Pass 2: Middle third (frames 20-45)
  // Pass 3: Top third (frames 35-60)
  // Each pass is a wind sweep that "deposits" part of the logo

  // Overall reveal progress (0 = fully hidden, 100 = fully revealed)
  const revealProgress = interpolate(frame, [5, 65], [0, 110], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // The mask uses a feathered edge to make the reveal soft
  const maskBottom = revealProgress;
  const featherSize = 15;

  // Logo opacity builds with reveal
  const logoOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle scale settle
  const settleSpring = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.7 },
  });

  // Glow intensifies as logo builds
  const glowBase = interpolate(frame, [15, 65, 85], [0, 30, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowPulse = frame > 65 ? Math.sin((frame - 65) * 0.08) * 4 : 0;
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
  // WIND PARTICLES DATA
  // ============================================================

  // Wind sweeps - heavily expanded for more dramatic wind feel
  const revealWinds: React.ComponentProps<typeof RevealWind>[] = [
    // --- Pass 1: Bottom sweep (frames 5-35) ---
    { delay: 5, yStart: 580, yEnd: 460, length: 400, thickness: 3.5, color: "#4A9BD9", duration: 30, direction: "right" },
    { delay: 8, yStart: 600, yEnd: 490, length: 350, thickness: 2.5, color: "#5BB5E8", duration: 28, direction: "right" },
    { delay: 7, yStart: 560, yEnd: 440, length: 300, thickness: 2, color: "#2D7AB8", duration: 29, direction: "left" },
    { delay: 3, yStart: 620, yEnd: 520, length: 450, thickness: 2, color: "#6AC0F0", duration: 32, direction: "right" },
    { delay: 10, yStart: 550, yEnd: 470, length: 320, thickness: 3, color: "#3E8CC7", duration: 26, direction: "left" },
    // --- Pass 2: Middle sweep (frames 22-50) ---
    { delay: 22, yStart: 440, yEnd: 350, length: 380, thickness: 3.5, color: "#3E8CC7", duration: 28, direction: "left" },
    { delay: 25, yStart: 460, yEnd: 370, length: 320, thickness: 2.5, color: "#6AC0F0", duration: 26, direction: "left" },
    { delay: 23, yStart: 420, yEnd: 330, length: 360, thickness: 2, color: "#4FA8D8", duration: 28, direction: "right" },
    { delay: 20, yStart: 480, yEnd: 380, length: 440, thickness: 2, color: "#5BB5E8", duration: 30, direction: "right" },
    { delay: 27, yStart: 400, yEnd: 310, length: 300, thickness: 3, color: "#2979A9", duration: 24, direction: "left" },
    // --- Pass 3: Top sweep (frames 38-65) ---
    { delay: 38, yStart: 330, yEnd: 230, length: 420, thickness: 3.5, color: "#5BB5E8", duration: 27, direction: "right" },
    { delay: 40, yStart: 350, yEnd: 250, length: 340, thickness: 2.5, color: "#2979A9", duration: 25, direction: "right" },
    { delay: 39, yStart: 310, yEnd: 210, length: 380, thickness: 2, color: "#4A9BD9", duration: 28, direction: "left" },
    { delay: 36, yStart: 360, yEnd: 260, length: 460, thickness: 2, color: "#70C8F5", duration: 30, direction: "right" },
    { delay: 42, yStart: 290, yEnd: 190, length: 350, thickness: 3, color: "#1A5F8B", duration: 24, direction: "left" },
    // --- Extra trailing winds ---
    { delay: 50, yStart: 280, yEnd: 200, length: 300, thickness: 2, color: "#70C8F5", duration: 22, direction: "right" },
    { delay: 46, yStart: 500, yEnd: 400, length: 280, thickness: 2, color: "#1A5F8B", duration: 26, direction: "left" },
    { delay: 55, yStart: 250, yEnd: 180, length: 380, thickness: 2.5, color: "#4A9BD9", duration: 20, direction: "right" },
    { delay: 52, yStart: 530, yEnd: 420, length: 320, thickness: 2, color: "#5AADE2", duration: 24, direction: "left" },
    // --- Continuous wind during text reveal ---
    { delay: 70, yStart: 700, yEnd: 680, length: 500, thickness: 2, color: "#4A9BD9", duration: 35, direction: "right" },
    { delay: 80, yStart: 200, yEnd: 190, length: 450, thickness: 2, color: "#5BB5E8", duration: 32, direction: "left" },
    { delay: 90, yStart: 850, yEnd: 840, length: 400, thickness: 1.5, color: "#3E8CC7", duration: 30, direction: "right" },
  ];

  // Dust particles - increased to 70
  const dustParticles: React.ComponentProps<typeof WindDust>[] = [];
  for (let i = 0; i < 70; i++) {
    const pass = Math.floor(i / 24);
    const baseDelay = pass * 16 + 3;
    dustParticles.push({
      x: 200 + Math.random() * 1500,
      y: 580 - pass * 110 + (Math.random() - 0.5) * 100,
      delay: baseDelay + Math.random() * 22,
      size: 2 + Math.random() * 5,
      color: ["#4A9BD9", "#5BB5E8", "#2D7AB8", "#3E8CC7", "#6AC0F0", "#70C8F5"][Math.floor(Math.random() * 6)],
      driftX: (Math.random() - 0.5) * 150,
      driftY: -15 - Math.random() * 50,
      life: 18 + Math.random() * 25,
    });
  }

  // Ambient winds - doubled, running throughout the video
  const ambientWinds: React.ComponentProps<typeof FlowingWind>[] = [
    // Early ambient winds (during logo build)
    { delay: 10, y: 120, length: 300, thickness: 1.5, maxOpacity: 0.08, color: "#4A9BD9", speed: 100 },
    { delay: 15, y: 750, length: 280, thickness: 1, maxOpacity: 0.06, color: "#5BB5E8", speed: 95 },
    { delay: 20, y: 950, length: 320, thickness: 1.5, maxOpacity: 0.07, color: "#2D7AB8", speed: 90 },
    // Mid-phase ambient winds
    { delay: 40, y: 200, length: 350, thickness: 1.5, maxOpacity: 0.12, color: "#4A9BD9", speed: 90 },
    { delay: 45, y: 650, length: 300, thickness: 1.5, maxOpacity: 0.1, color: "#5BB5E8", speed: 85 },
    { delay: 50, y: 380, length: 280, thickness: 1, maxOpacity: 0.08, color: "#2D7AB8", speed: 95 },
    { delay: 55, y: 850, length: 340, thickness: 1.5, maxOpacity: 0.1, color: "#3E8CC7", speed: 88 },
    // Post-reveal ambient winds
    { delay: 60, y: 150, length: 360, thickness: 1.5, maxOpacity: 0.12, color: "#6AC0F0", speed: 85 },
    { delay: 65, y: 480, length: 300, thickness: 1.5, maxOpacity: 0.1, color: "#2979A9", speed: 80 },
    { delay: 70, y: 900, length: 280, thickness: 1, maxOpacity: 0.08, color: "#4FA8D8", speed: 90 },
    { delay: 75, y: 300, length: 320, thickness: 1.5, maxOpacity: 0.1, color: "#5AADE2", speed: 78 },
    { delay: 80, y: 700, length: 260, thickness: 1, maxOpacity: 0.08, color: "#3B8BC5", speed: 82 },
    // Late ambient winds (during text + hold)
    { delay: 90, y: 180, length: 350, thickness: 1.5, maxOpacity: 0.1, color: "#4A9BD9", speed: 75 },
    { delay: 95, y: 550, length: 300, thickness: 1, maxOpacity: 0.08, color: "#5BB5E8", speed: 80 },
    { delay: 100, y: 820, length: 280, thickness: 1.5, maxOpacity: 0.1, color: "#2D7AB8", speed: 70 },
    { delay: 108, y: 400, length: 320, thickness: 1, maxOpacity: 0.08, color: "#6AC0F0", speed: 75 },
    { delay: 115, y: 100, length: 280, thickness: 1.5, maxOpacity: 0.1, color: "#3E8CC7", speed: 65 },
    { delay: 120, y: 600, length: 260, thickness: 1, maxOpacity: 0.08, color: "#70C8F5", speed: 72 },
  ];

  const bgShift = interpolate(frame, [0, 150], [0, 12]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% ${42 + bgShift * 0.3}%, #0B1929 0%, #060F1C 45%, #030912 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(74, 155, 217, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 155, 217, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />

      {/* Radial glow behind logo */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(74, 155, 217, ${interpolate(frame, [8, 60, 85], [0, 0.15, 0.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}) 0%, transparent 65%)`,
          filter: "blur(50px)",
        }}
      />

      {/* Reveal Wind Streaks */}
      {revealWinds.map((w, i) => (
        <RevealWind key={`rw-${i}`} {...w} />
      ))}

      {/* Wind Dust Particles */}
      {dustParticles.map((d, i) => (
        <WindDust key={`dust-${i}`} {...d} />
      ))}

      {/* Ambient Winds */}
      {ambientWinds.map((w, i) => (
        <FlowingWind key={`fw-${i}`} {...w} />
      ))}

      {/* ====== COMBINED LOGO + TEXT in one centered column ====== */}
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
            filter: `drop-shadow(0 0 ${glow}px rgba(74, 155, 217, 0.55)) drop-shadow(0 0 ${glow * 1.5}px rgba(45, 122, 184, 0.25))`,
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

        {/* Company Name - tight below logo */}
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
              background: "linear-gradient(135deg, #5BB5E8 0%, #FFFFFF 35%, #E8F4FD 50%, #4A9BD9 75%, #2D7AB8 100%)",
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
              color: "rgba(91, 181, 232, 0.75)",
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
            background: "linear-gradient(90deg, transparent, rgba(74, 155, 217, 0.5), transparent)",
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
            color: "rgba(180, 210, 240, 0.6)",
            marginTop: 18,
            textTransform: "lowercase",
          }}
        >
          unified tech solutions
        </p>
      </div>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(3, 9, 18, 0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
