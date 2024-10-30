import { combineReducers } from "@reduxjs/toolkit";
import { paletteSlice } from "@/entities/palette";
import { settingsSlice } from "@/entities/settings";

export const rootReducer = combineReducers({
  [paletteSlice.name]: paletteSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
});
