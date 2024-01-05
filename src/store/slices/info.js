import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    popStatus: false,
    infoTitle: '',
    infoDesc: '',
  },
  reducers: {
    setPopStatus:  (state, action) => {
   state.popStatus = action.payload
    },
    setInfoTitle: (state, action) => {
      state.infoTitle = action.payload
    },
    setInfoDesc: (state, action) => {
      state.infoDesc = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPopStatus, setInfoTitle, setInfoDesc } = authSlice.actions

export default authSlice.reducer
