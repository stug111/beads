import { style } from "@vanilla-extract/css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const label = style({
  fontSize: 14,
  fontWeight: 500,
  color: "#000",
});

export const input = style({
  padding: 4,
  borderRadius: 4,
  border: "1px solid rgb(194 194 194)",
  fontSize: 14,
  fontWeight: 500,
  color: "#000",
  outline: "none",
});
