import { createSlice } from '@reduxjs/toolkit'

export const areasSlice = createSlice({
  name: 'areas',
  initialState: {
    currentAreaNumber: 1,
    areas: {
      1: [
        {
          x: 0.66,
          y: -0.74,
        },
        {
          x: 0.66,
          y: -39.038,
        },
        {
          x: 39.264,
          y: -39.038,
        },
        {
          x: 39.264,
          y: -49.438,
        },
        {
          x: 61.464,
          y: -49.438,
        },
        {
          x: 61.464,
          y: -29.138,
        },
        {
          x: 51.464,
          y: -29.138,
        },
        {
          x: 51.464,
          y: -0.74,
        },
        {
          x: 0.66,
          y: -0.74,
        },
      ],

      // 1: [
      //   { x: -10, y: 5.3 },
      //   { x: -10, y: -33.7 },
      //   { x: 28.5, y: -33.7 },
      //   { x: 28.5, y: -43.9 },
      //   { x: 52.145, y: -43.9 },
      //   { x: 52.145, y: -23.225 },
      //   { x: 43.093, y: -23.225 },
      //   { x: 43.093, y: 5.514 },
      //   { x: -10, y: 5.3 },
      // ],

      // 1: [
      //   { x: -11.1, y: -11 },
      //   { x: 11.2, y: -11.408 },
      //   { x: 11.5, y: -1.9 },
      //   { x: 13.5, y: -1.9 },
      //   { x: 13.5, y: -11 },
      //   { x: 19.3, y: -11 },
      //   { x: 19.3, y: 3.8 },
      //   { x: 11.5, y: 3.8 },
      //   { x: 11.5, y: 9.4 },
      //   { x: -11.1, y: 9.4 },
      //   { x: -11.1, y: -11.2 },
      // ],
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
