import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: {},
  },
  reducers: {
    logOut: (state) => {
      state.userInfo = {}
      Cookies.remove('token')
      redirect('/')
    },
    addUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { logOut, addUserInfo } = authSlice.actions

export default authSlice.reducer
