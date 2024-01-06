import { createSlice } from '@reduxjs/toolkit'

export const areasSlice = createSlice({
  name: 'areas',
  initialState: {
    currentAreaNumber: 1,
    areas: {
      1: [
        { x: -11.1, y: -11 },
        { x: 11.2, y: -11.408 },
        { x: 11.5, y: -1.9 },
        { x: 13.5, y: -1.9 },
        { x: 13.5, y: -11 },
        { x: 19.3, y: -11 },
        { x: 19.3, y: 3.8 },
        { x: 11.5, y: 3.8 },
        { x: 11.5, y: 9.4 },
        { x: -11.1, y: 9.4 },
        { x: -11.1, y: -11.2 },
      ],
    },
  },
  reducers: {
    setPopStatus: (state, action) => {
      state.popStatus = action.payload
    },
    setInfoTitle: (state, action) => {
      state.areasTitle = action.payload
    },
    setInfoDesc: (state, action) => {
      state.areasDesc = action.payload
    },
    setCurrentAreaNumber: (state, action) => {
      state.currentAreaNumber = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPopStatus, setInfoTitle, setInfoDesc, setCurrentAreaNumber } =
  areasSlice.actions

export default areasSlice.reducer
