import { style, styleVariants } from "@vanilla-extract/css";

export const root = style({
  backgroundColor: "rgba(0, 99, 255, 0.161)",
  borderRadius: 6,
  borderColor: "rgba(0, 99, 255, 0.161)",
  cursor: "pointer",
});

export const size = styleVariants({
  s: {
    fontSize: 12,
    padding: 4,
    height: 28,
  },
  m: {
    fontSize: 14,
    padding: 6,
    height: 32,
  },
  l: {
    fontSize: 16,
    padding: 8,
    height: 44,
  },
});
