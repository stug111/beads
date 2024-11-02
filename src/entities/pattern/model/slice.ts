import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getPatternKey } from "@/shared/lib";
import type { Pattern } from "@/shared/types";

interface PatternSliceState {
  pattern: Record<string, Pattern>;
  rows: number;
  columns: number;
}

const initialState: PatternSliceState = {
  pattern: {},
  rows: 9,
  columns: 36,
};

export const patternSlice = createSlice({
  name: "pattern",
  initialState,
  reducers: {
    clearPattern: (state) => {
      state.pattern = {};
    },
    updatePattern: (state, payload: PayloadAction<Pattern>) => {
      const key = getPatternKey(payload.payload.x, payload.payload.y);

      state.pattern[key] = {
        ...payload.payload,
      };
    },
    removeItemFromPattern: (
      state,
      payload: PayloadAction<Pick<Pattern, "x" | "y">>
    ) => {
      const key = getPatternKey(payload.payload.x, payload.payload.y);

      delete state.pattern[key];
    },
    changeSize: (
      state,
      action: PayloadAction<{ type: "rows" | "columns"; value: number }>
    ) => {
      state[action.payload.type] = action.payload.value;
    },
  },
});

const selectPatternState = (state: RootState) => state.pattern;

export const selectPattern = (state: RootState) => state.pattern.pattern;

export const selectSize = createSelector(selectPatternState, (patternState) => {
  return {
    rows: patternState.rows,
    columns: patternState.columns,
  };
});

export const {
  clearPattern,
  updatePattern,
  removeItemFromPattern,
  changeSize,
} = patternSlice.actions;
