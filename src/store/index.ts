import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui";
import { api } from "./slices/api";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    api: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
