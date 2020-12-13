import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginPayload } from '../epics/types'

interface User {
  email: string
  id: number
  username: string
}

type TaskState = {
  user: User
}

let initialState: TaskState = {
  user: {
    email: '',
    id: -1,
    username: '',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(_, __: PayloadAction<LoginPayload>) {},
    loginSucceed(_, action: PayloadAction<string>) {
      console.log(action)
    },
  },
})

export const { login, loginSucceed } = userSlice.actions

export default userSlice.reducer
