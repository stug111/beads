import { globalStyle, style } from "@vanilla-extract/css";

export const root = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
});

export const item = style({
  width: 24,
  height: 24,
  cursor: "pointer",
  padding: 0,
  borderRadius: 6,
  transition: "box-shadow .2s ease-in-out",
});

globalStyle(`${item}[data-checked]`, {
  boxShadow: "0 0 0 2px #fff, 0 0 0 3px #000",
});
