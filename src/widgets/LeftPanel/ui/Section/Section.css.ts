import { globalStyle, style } from "@vanilla-extract/css";

export const root = style({});

globalStyle(`${root}:not(:last-child)`, {
  marginBottom: 24,
  paddingBottom: 24,
  borderBottom: "1px solid #ccc",
});

export const title = style({
  fontSize: 14,
  fontWeight: 500,
  color: "#000",
  marginBottom: 12,
});
