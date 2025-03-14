import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultTypeEnum } from "@/definitions/omdb.types";

type UiState = {
  title: string;
  page: number;
  type: ResultTypeEnum;
  year?: number;
};

const initialState: UiState = {
  title: "pokemon",
  page: 1,
  type: ResultTypeEnum.Movie,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setType: (state, action: PayloadAction<ResultTypeEnum>) => {
      state.type = action.payload;
      state.page = 1;
    },
    setYear: (state, action: PayloadAction<number | undefined>) => {
      state.year = action.payload;
      state.page = 1;
    },
  },
});

export const { setTitle, setPage, setType, setYear } = uiSlice.actions;

export default uiSlice.reducer;
