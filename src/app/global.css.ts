import { globalStyle } from "@vanilla-extract/css";
import { assistantFont } from "@/shared/styles";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("*::before", {
  boxSizing: "border-box",
});

globalStyle("*::after", {
  boxSizing: "border-box",
});

globalStyle("body", {
  margin: 0,
  fontFamily: `${assistantFont}, sans-serif`,
});
