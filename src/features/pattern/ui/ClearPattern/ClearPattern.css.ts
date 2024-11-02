import { style } from "@vanilla-extract/css";

export const root = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 36,
  height: 36,
  borderRadius: 8,
  borderWidth: 0,
  backgroundColor: "white",
  color: "#f44336",
  boxShadow:
    "0px 0px .9310142993927002px 0px rgba(0, 0, 0, .17), 0px 0px 3.1270833015441895px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05)",
  cursor: "pointer",
  transition: "background-color .2s ease-in-out",

  ":hover": {
    backgroundColor: "rgba(0, 99, 255, 0.4)",
  },
});
