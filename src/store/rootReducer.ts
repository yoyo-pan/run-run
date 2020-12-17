import { combineReducers } from '@reduxjs/toolkit'
import streamReducer from './reducers/streamSlice'
const rootReducer = combineReducers({
  stream: streamReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
