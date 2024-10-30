import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import storage from "redux-persist-indexeddb-storage";
import { rootReducer } from "./rootReducer";

const persistConfig = {
  key: "beads",
  version: 1,
  storage: storage("beadsDB"),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  const store = configureStore({
    reducer: persistedReducer,
  });

  return store;
}

export const appStore = makeStore();
export const persistedStore = persistStore(appStore);

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
