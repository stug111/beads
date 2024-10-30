import { style } from "@vanilla-extract/css";

export const root = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
});

export const item = style({
  width: 30,
  height: 30,
  border: "1px solid black",
  cursor: "pointer",
  padding: 0,
});
