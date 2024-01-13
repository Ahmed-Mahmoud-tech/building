import { createSlice } from '@reduxjs/toolkit'

export const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    keyboardWalking: true,
    rotationNavigation: true,
    walkingButton: true,
  },
  reducers: {
    setKeyboardWalking: (state, action) => {
      state.keyboardWalking = action.payload
    },

    setRotationNavigation: (state, action) => {
      state.rotationNavigation = action.payload
    },
    setWalkingButton: (state, action) => {
      state.walkingButton = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setKeyboardWalking,
  setRotationNavigation,
  setWalkingButton,
  setModelRotation,
} = controlsSlice.actions

export default controlsSlice.reducer
