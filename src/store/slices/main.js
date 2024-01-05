import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    currentMode: Cookies.get('CurrentMode') || 'light',
    interface: Cookies.get('interface') ? Cookies.get('interface') : 'Comfy',
    direction: Cookies.get('NEXT_LOCALE') || 'en',
    preloader: true,
    helpStatus: false,
    borderRound: true,
    sidebar: 'closed',
    drawer: {
      status: 'false',
      currentComponent: '',
    },
    drawerAi: {
      status: false,
      currentComponent: 'chatBot',
    },
    zoomSlider: 50,
  },
  reducers: {
    directionFun: (state, action) => {
      state.direction = action.payload
    },
    changeMode: (state, action) => {
      state.currentMode = action.payload
      Cookies.set('CurrentMode', action.payload)
    },
    changePreloader: (state, action) => {
      state.preloader = action.payload
    },
    changeBorderRound: (state, action) => {
      state.borderRound = action.payload
    },
    changeHelpStatus: (state, action) => {
      state.helpStatus = action.payload
    },

    changeCurrentComponent: (state, action) => {
      state.drawer.currentComponent = action.payload
    },
    ChangeDrawerStatus: (state, action) => {
      state.drawer.status = action.payload
    },
    ChangeDrawerAiStatus: (state, action) => {
      state.drawerAi.status = action.payload
    },
    ChangeZoomSlider: (state, action) => {
      state.zoomSlider = action.payload
    },
    ChangeSideBar: (state, action) => {
      state.sidebar = action.payload
    },
    ChangeInterface: (state, action) => {
      state.interface = action.payload
      Cookies.set('interface', action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  directionFun,
  changePreloader,
  changeMode,
  addToHistory,
  changeCurrentComponent,
  ChangeDrawerStatus,
  ChangeZoomSlider,
  ChangeSideBar,
  ChangeInterface,
  changeHelpStatus,
  ChangeDrawerAiStatus,
} = mainSlice.actions
export default mainSlice.reducer
