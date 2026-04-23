---
name: Event Horizon
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#c1c6dc'
  on-secondary: '#2a3041'
  secondary-container: '#414659'
  on-secondary-container: '#afb4ca'
  tertiary: '#fcf5ff'
  on-tertiary: '#3c0090'
  tertiary-container: '#e3d4ff'
  on-tertiary-container: '#7318ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#dde2f9'
  secondary-fixed-dim: '#c1c6dc'
  on-secondary-fixed: '#151b2c'
  on-secondary-fixed-variant: '#414659'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d1bcff'
  on-tertiary-fixed: '#23005b'
  on-tertiary-fixed-variant: '#5700c9'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 80px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0em
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.15em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The visual identity of this design system is built upon the concept of "Cinematic Exploration." It aims to evoke the wonder of a high-end planetarium experience combined with the precision of a futuristic flight interface. The target audience includes lifelong learners and science enthusiasts who value both deep academic immersion and modern, polished aesthetics.

The design style is a hybrid of **Futuristic Glassmorphism** and **High-Contrast Minimalism**. It utilizes deep, infinite backgrounds to provide a sense of scale, while UI elements appear as illuminated glass HUD (Heads-Up Display) layers floating in space. Light is used as a functional tool—guiding the eye through glowing accents and subtle radiation-like gradients.

## Colors

The palette is anchored by "Abyssal Navy," a near-black base that allows for maximum contrast with glowing elements. The primary accent is an "Electric Cyan," used sparingly for interactive elements, progress indicators, and focal points to simulate the glow of a star or a digital display. 

A "Nebula Purple" serves as a tertiary accent for secondary data visualizations or subtle depth gradients. Neutral tones are kept cool, ranging from pure white for high-priority text to desaturated "Stardust" grays for metadata and decorative lines.

## Typography

This design system employs a sophisticated typographic hierarchy that balances classical education with technical precision. 

Headlines utilize **Newsreader**, a refined serif that provides a literary and authoritative tone to celestial bodies and major topics. In contrast, all functional text, navigation, and technical data are set in **Space Grotesk**. This sans-serif’s geometric terminals and idiosyncratic "monospaced-feel" characters reinforce the futuristic, scientific narrative. Use wide letter-spacing for uppercase labels to mimic the look of radar readouts and navigational charts.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model with generous safe areas, creating a "viewscreen" effect. Content is centered within a 1280px container to ensure readability and focus, even on ultrawide monitors.

A rhythmic 8px base unit governs all dimensions. Vertical rhythm is intentionally airy, using large "xl" gaps between major sections to mimic the vastness of space. Information density should remain low to moderate to prevent the UI from feeling cluttered, allowing the high-quality imagery of planets and stars to serve as the primary visual driver.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows. 

1.  **Background Layer:** The deepest navy/black, often containing a subtle parallax starfield or nebula gradient.
2.  **Container Layer:** Semi-transparent navy surfaces (`rgba(11, 17, 33, 0.7)`) with a high-intensity backdrop blur (20px+) to create the "frosted glass" effect.
3.  **Accent Layer:** Elements that require focus utilize "Cyan Glow"—an outer glow effect created with a `box-shadow` that has a large spread and low opacity (`0px 0px 20px rgba(0, 242, 255, 0.4)`).
4.  **Border Layer:** Extremely thin (1px) borders with low-opacity white or cyan define the boundaries of the glass panels without adding visual weight.

## Shapes

The shape language is dominated by **Pill-shaped** interactive elements and soft-edged containers. This organic roundedness provides a friendly counterpoint to the coldness of the deep space theme.

Large content cards should use `rounded-xl` (1.5rem) to maintain a soft, premium feel, while buttons and chips always use a full pill-radius to signify touchability and fluid motion. Decorative dividers use a single horizontal line with a glowing cyan terminal (a 2px high rounded bar) to anchor sections.

## Components

### Buttons
Primary buttons are pill-shaped with a solid white or cyan fill. They feature a distinct "glow-hover" state where the outer glow increases in intensity. Secondary buttons use a "Ghost" style with a 1px cyan border and a subtle glass background.

### Cards
Cards are the primary container for educational modules. They feature a 1px border at 20% opacity and a backdrop blur. Imagery within cards should occupy the top half, fading into the dark background via a linear gradient.

### Navigation
The navigation bar is a floating glass element at the top of the screen. Active states are indicated by a cyan bar beneath the label or a subtle glow pulse. Labels use the `label-sm` typographic style with wide tracking.

### Inputs & Selects
Input fields are minimalist, utilizing a single bottom border that glows cyan when focused. Labels float above the field in a smaller, uppercase `Space Grotesk` font.

### Progress Indicators
Linear progress bars use a dark track with a glowing cyan fill. For data visualization, use thin, precise lines and avoid heavy fills to maintain the "HUD" aesthetic.