import { combineReducers } from "@reduxjs/toolkit";
import { paletteSlice } from "@/entities/palette";
import { patternSlice } from "@/entities/pattern";
import { toolsSlice } from "@/entities/tools";

export const rootReducer = combineReducers({
  [paletteSlice.name]: paletteSlice.reducer,
  [patternSlice.name]: patternSlice.reducer,
  [toolsSlice.name]: toolsSlice.reducer,
});
