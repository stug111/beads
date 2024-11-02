import { globalStyle, style } from "@vanilla-extract/css";

export const root = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: 8,
  cursor: "pointer",

  ":hover": {
    backgroundColor: "rgba(0, 99, 255, 0.4)",
  },
});

globalStyle(`${root}[data-checked]`, {
  backgroundColor: "rgba(0, 99, 255, 0.161)",
});
