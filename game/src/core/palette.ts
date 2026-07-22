/**
 * COREBREAKER core palette. A single source of truth for the game's colors,
 * so the visual identity stays consistent and swappable (skins map onto these
 * roles). Values are the committed neon/space palette from the Art Direction.
 */
export const PALETTE = {
  space: 0x0b0e1a,
  space2: 0x05060d,
  cyan: 0x2de2e6,
  teal: 0x12d9b0,
  violet: 0x8a5cff,
  orange: 0xff8a3d,
  red: 0xff4d4d,
  ink: 0xcfe9ff,
} as const;

/** Same colors as CSS hex strings for DOM/HUD usage. */
export const CSS = {
  space: "#0b0e1a",
  cyan: "#2de2e6",
  teal: "#12d9b0",
  violet: "#8a5cff",
  orange: "#ff8a3d",
  red: "#ff4d4d",
} as const;
