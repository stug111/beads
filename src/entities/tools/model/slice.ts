import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Tool } from "../config/tool";

interface ToolsSliceState {
  tool: Tool;
}

const initialState: ToolsSliceState = {
  tool: Tool.drag,
};

export const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Tool>) => {
      state.tool = action.payload;
    },
  },
});

export const selectTool = (state: RootState) => state.tools.tool;

export const { setTool } = toolsSlice.actions;
