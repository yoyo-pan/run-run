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
    addStream() {},
  },
})

export const { addStream } = StreamSlice.actions

export default StreamSlice.reducer
