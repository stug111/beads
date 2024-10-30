import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getPatternKey } from "@/shared/lib";
import type { Pattern } from "@/shared/types";

interface PatternSliceState {
  pattern: Record<string, Pattern>;
}

const initialState: PatternSliceState = {
  pattern: {},
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
  },
});

export const selectPattern = (state: RootState) => state.pattern.pattern;

export const { clearPattern, updatePattern } = patternSlice.actions;
