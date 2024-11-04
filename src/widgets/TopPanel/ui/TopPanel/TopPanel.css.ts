import { style } from "@vanilla-extract/css";

export const root = style({
  position: "absolute",
  top: 16,
  left: 16,
  right: 16,
  display: "grid",
  gridTemplateColumns: "1fr 2fr 1fr",
});

export const center = style({
  display: "flex",
  justifyContent: "center",
  flexGrow: "1",
});

export const right = style({
  display: "flex",
  justifyContent: "flex-end",
});
