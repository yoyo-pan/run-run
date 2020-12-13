import { combineReducers } from '@reduxjs/toolkit'
import taskReducer from './reducers/taskSlice'
import cameraReducer from './reducers/cameraSlice'
import locationReducer from './reducers/locationSlice'

const rootReducer = combineReducers({
  tasks: taskReducer,
  cameras: cameraReducer,
  locations: locationReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
