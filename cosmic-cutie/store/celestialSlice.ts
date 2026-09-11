import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AstronomyPayload } from '../types'

type FetchArgs = {
  location: string
  days: 7 | 14
}

export const fetchAstronomy = createAsyncThunk<AstronomyPayload, FetchArgs>(
  'celestial/fetchAstronomy',
  async ({ location, days }) => {
    const response = await fetch(
      '/api/astronomy?location=' + encodeURIComponent(location) + '&days=' + days
    )
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch astronomy data.')
    }
    return data as AstronomyPayload
  }
)

type CelestialState = {
  data: AstronomyPayload | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CelestialState = {
  data: null,
  status: 'idle',
  error: null
}

const slice = createSlice({
  name: 'celestial',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAstronomy.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAstronomy.fulfilled, (state, action: PayloadAction<AstronomyPayload>) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchAstronomy.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Unable to load astronomy data.'
      })
  }
})

export default slice.reducer
