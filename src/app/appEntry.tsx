import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MainPage } from "@/pages/main";
import { CanvasProvider } from "@/entities/canvas";
import { appStore, persistedStore } from "./appStore.ts";
import "./global.css.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <CanvasProvider>
          <MainPage />
        </CanvasProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
