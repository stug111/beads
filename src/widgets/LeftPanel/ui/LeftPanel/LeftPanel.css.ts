import { style } from "@vanilla-extract/css";

export const root = style({
  position: "absolute",
  left: 16,
  top: 120,
  padding: 12,
  borderRadius: 8,
  boxShadow:
    "0px 0px .9310142993927002px 0px rgba(0, 0, 0, .17), 0px 0px 3.1270833015441895px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05)",
  backgroundColor: "#fff",
  width: 228,
});

export const sizeContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const colorsContainer = style({
  marginTop: 20,
});

export const addColorButton = style({
  marginTop: 20,
});
