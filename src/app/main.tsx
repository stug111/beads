import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { Theme } from "@radix-ui/themes";

import { App } from "./app";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="crimson" radius="large" scaling="90%">
      <App />
      <Toaster />
    </Theme>
  </StrictMode>
);
