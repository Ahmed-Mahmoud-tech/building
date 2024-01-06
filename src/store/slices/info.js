import { createSlice } from '@reduxjs/toolkit'

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    popStatus: false,
    infoTitle: '',
    infoDesc: '',
  },
  reducers: {
    setPopStatus: (state, action) => {
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
export const { setPopStatus, setInfoTitle, setInfoDesc } = infoSlice.actions

export default infoSlice.reducer
