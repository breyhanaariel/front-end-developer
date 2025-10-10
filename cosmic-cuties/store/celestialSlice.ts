// store/celestialSlice.ts
// Slice to fetch and store the mocked celestial data.

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Point = {
  timestamp: number;
  moonPhase: number;
  brightness: number;
}

export const fetchCelestial = createAsyncThunk("celestial/fetch", async () => {
  const res = await fetch("/api/celestial");
  if (!res.ok) throw new Error("Failed to fetch");
  const data: Point[] = await res.json();
  return data;
});

type CelestialState = {
  points: Point[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: CelestialState = {
  points: null,
  status: "idle",
  error: null
}

const slice = createSlice({
  name: "celestial",
  initialState,
  reducers: {
    clear: (state) => { state.points = null; state.status = "idle"; state.error = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCelestial.pending, (state) => { state.status = "loading"; })
      .addCase(fetchCelestial.fulfilled, (state, action: PayloadAction<Point[]>) => {
        state.status = "succeeded";
        state.points = action.payload;
      })
      .addCase(fetchCelestial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
  }
});

export const { clear } = slice.actions;
export default slice.reducer;