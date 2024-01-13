import { configureStore } from '@reduxjs/toolkit'

import infoReducer from './slices/info'
import areasReducer from './slices/areas'
import controlsReducer from './slices/controls'

export default configureStore({
  reducer: {
    info: infoReducer,
    areas: areasReducer,
    controls: controlsReducer,
  },
})
