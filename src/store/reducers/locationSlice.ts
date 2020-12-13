import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Location {
  id: number
  name: string
}

type LocationState = {
  list: Location[]
}

let initialState: LocationState = {
  list: [],
}

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    getLocations() {},
    getLocationsSucceed(state, action: PayloadAction<Location[]>) {
      state.list = action.payload
    },
  },
})

export const { getLocations, getLocationsSucceed } = locationSlice.actions

export default locationSlice.reducer
