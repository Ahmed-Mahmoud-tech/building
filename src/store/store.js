import { configureStore } from '@reduxjs/toolkit'

import infoReducer from './slices/info'
import areasReducer from './slices/areas'

export default configureStore({
  reducer: {
    info: infoReducer,
    areas: areasReducer,
  },
})
