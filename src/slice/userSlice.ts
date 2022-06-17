import { UserDataType } from './../pages/Admin/User/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { Subject } from '../models/subject'

export interface SubjectState {
  userList: UserDataType[]
}
const initialState: SubjectState = {
    userList: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loaduserList: (state, action: PayloadAction<UserDataType[]>) => {
      state.userList = action.payload
    },
    createSubject: (state, action: PayloadAction<UserDataType>) => {
      state.userList.push(action.payload)
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const index = state.userList.findIndex(
        (item) => item.id == action.payload
      )
      if (index > -1) {
        state.userList.splice(index, 1)
      }
    },
  },
})

export const { createSubject, deleteUser, loaduserList } =
  userSlice.actions

export default userSlice.reducer
