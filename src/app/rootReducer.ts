import { combineReducers } from "@reduxjs/toolkit";
import { paletteSlice } from "@/entities/palette";
import { patternSlice } from "@/entities/pattern";
import { settingsSlice } from "@/entities/settings";

export const rootReducer = combineReducers({
  [paletteSlice.name]: paletteSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
  [patternSlice.name]: patternSlice.reducer,
});
