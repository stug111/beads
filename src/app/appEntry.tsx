import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MainPage } from "@/pages/main";
import { appStore, persistedStore } from "./appStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <MainPage />
      </PersistGate>
    </Provider>
  </StrictMode>
);
