import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Camera {
  id: number
  name: string
}

type CameraState = {
  list: Camera[]
}

let initialState: CameraState = {
  list: [],
}

const cameraSlice = createSlice({
  name: 'cameras',
  initialState,
  reducers: {
    getCameras() {},
    getCamerasSucceed(state, action: PayloadAction<Camera[]>) {
      state.list = action.payload
    },
  },
})

export const { getCameras, getCamerasSucceed } = cameraSlice.actions

export default cameraSlice.reducer
