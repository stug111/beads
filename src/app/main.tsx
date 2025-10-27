import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/tokens.css";
import "@radix-ui/themes/components.css";
import "@radix-ui/themes/utilities.css";
import "./styles/index.css";
import { App } from "./app";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="violet" radius="large" scaling="90%">
      <App />
    </Theme>
  </StrictMode>
);
