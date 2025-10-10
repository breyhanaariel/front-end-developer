// store/index.ts
// Redux Toolkit store wiring.

import { configureStore } from "@reduxjs/toolkit";
import celestialReducer from "./celestialSlice";

export const store = configureStore({
  reducer: {
    celestial: celestialReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;