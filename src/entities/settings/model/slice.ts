import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsSliceState {
  rows: number;
  columns: number;
}

const initialState: SettingsSliceState = { rows: 9, columns: 36 };

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeSize: (
      state,
      action: PayloadAction<{ type: "rows" | "columns"; value: number }>
    ) => {
      state[action.payload.type] = action.payload.value;
    },
  },
});

export const selectSize = (state: RootState) => state.settings;

export const { changeSize } = settingsSlice.actions;
