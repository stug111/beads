import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
});
