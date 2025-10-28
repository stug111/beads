import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import { App } from "./app";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="crimson" radius="large" scaling="90%">
      <App />
    </Theme>
  </StrictMode>
);
