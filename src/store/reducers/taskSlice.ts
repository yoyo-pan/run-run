import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Task {
  name: string
  description: string
}

export enum ScenarioType {
  Fence = 'fence',
  PPE = 'ppe',
  Construction = 'construction',
}

export type FenceOptions = {
  human: boolean
}

export type PPEOptions = {
  human: boolean
  safetyHelmet: boolean
  safetyBelt: boolean
  safetyVest: boolean
}

export type ConstructionOptions = {
  human: boolean
  manhole: boolean
  tripod: boolean
  ventilationDuct: boolean
  lifeline: boolean
}

type TaskState = {
  list: Task[]
}

let initialState: TaskState = {
  list: [],
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasks() {},
    newTasks() {},
    getTasksSucceed(state, action: PayloadAction<{ results: Task[] }>) {
      state.list = action.payload.results
    },
  },
})

export const { newTasks, getTasks, getTasksSucceed } = taskSlice.actions

export default taskSlice.reducer
