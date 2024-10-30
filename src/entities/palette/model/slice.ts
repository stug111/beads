import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PaletteSliceState {
  savedList: string[];
  selectedColor: string;
  eraser: boolean;
}

const initialState: PaletteSliceState = {
  savedList: [],
  selectedColor: "#000000",
  eraser: false,
};

export const paletteSlice = createSlice({
  name: "palette",
  initialState,
  reducers: {
    saveColor: (state, action: PayloadAction<string>) => {
      state.savedList.push(action.payload);
    },
    updateSelectedColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
    },
  },
});

export const selectSavedList = (state: RootState) => state.palette.savedList;
export const selectSelectedColor = (state: RootState) =>
  state.palette.selectedColor;

export const { saveColor, updateSelectedColor } = paletteSlice.actions;
