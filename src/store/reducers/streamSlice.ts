import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { localStream } from '../../client'

type StreamState = {
  mainStream: AgoraRTC.Stream
}

let initialState: StreamState = {
  mainStream: localStream,
}

const StreamSlice = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      // Some reducer stuff
      console.log(state, action)
    },
    loginSucceed(state, action: PayloadAction<any>) {
      // Some reducer stuff
      console.log(state, action)
    },
  },
})

export const { login, loginSucceed } = StreamSlice.actions

export default StreamSlice.reducer
